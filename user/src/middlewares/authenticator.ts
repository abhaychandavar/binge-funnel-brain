import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import RoleModel from '../models/role';
import UserModel from '../models/user';
import authManager from '../services/auth-manager';
import responseManager from '../services/response-manager';
import { APP_REQUEST } from '../types/app-types';
import AppError from '../utils/app-error';
import { ERRORS } from '../utils/errors';
import permissions from '../utils/permissions';

class Authenticator {
  async authenticateRequest(
    req: APP_REQUEST,
    res: Response,
    _next: NextFunction
  ) {
    try {
      const requiredPermissions = _.get(
        permissions,
        `${req.method}::${req.baseUrl}`,
        []
      );
      const token: string =
        typeof req.headers.authorization === 'string'
          ? req.headers.authorization.split(' ')[1]
          : '';
      const tokenData = await authManager.validateAuthToken(token);
      const user = await UserModel.findById(tokenData.userId);
      if (!user) {
        const error = ERRORS.E_UNAUTHORIZED;
        throw new AppError(error);
      }
      const role = await RoleModel.findById(user.role);
      if (!role) {
        console.error('Could not find the role');
        const error = ERRORS.E_UNAUTHORIZED;
        throw new AppError(error);
      }
      requiredPermissions.forEach((permission) => {
        if (!role.permissions.includes(permission)) {
          const error = ERRORS.E_UNAUTHORIZED;
          error.body.message =
            'You do not have permission to perform this action';
          throw new AppError(error);
        }
      });
      req.user = user;
      _next();
    } catch (err: any) {
      const error = ERRORS.E_UNAUTHORIZED;
      const appError = new AppError(error);
      responseManager.sendErrorResponse(res, appError);
    }
  }
}
const authenticator = new Authenticator();
export default authenticator;
