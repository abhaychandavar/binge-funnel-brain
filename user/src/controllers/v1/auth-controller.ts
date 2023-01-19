import { Request, Response } from 'express';
import authManager from '../../services/auth-manager';
import responseManager from '../../services/response-manager';
import { APP_REQUEST } from '../../types/app-types';
import AppError from '../../utils/app-error';

class AuthController {
  signin(req: APP_REQUEST, res: Response) {
    authManager
      .signin(req.body)
      .then((result: any) =>
        responseManager.sendSuccessResponse(res, result, 'Signin successful')
      )
      .catch((err: AppError | Error) =>
        responseManager.sendErrorResponse(res, err)
      );
  }
  signup(req: APP_REQUEST, res: Response) {
    authManager
      .signup(req.body)
      .then((result: any) =>
        responseManager.sendSuccessResponse(res, result, 'Signup successful')
      )
      .catch((err: AppError | Error) =>
        responseManager.sendErrorResponse(res, err)
      );
  }
}
const authController = new AuthController();
export default authController;
