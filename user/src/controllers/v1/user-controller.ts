import { Response } from 'express';
import UserModel from '../../models/user';
import responseManager from '../../services/response-manager';
import userManager from '../../services/user-manager';
import { APP_REQUEST } from '../../types/app-types';
import AppError from '../../utils/app-error';

class UserController {
  getUsers(req: APP_REQUEST, res: Response) {
    userManager
      .getUsers(req.query)
      .then((result: any) =>
        responseManager.sendSuccessResponse(
          res,
          result,
          'Users fetch successful'
        )
      )
      .catch((err: AppError | Error) =>
        responseManager.sendErrorResponse(res, err)
      );
  }
}

const userController = new UserController();
export default userController;
