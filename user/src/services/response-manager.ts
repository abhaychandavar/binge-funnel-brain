import { Response } from 'express';
import AppError from '../utils/app-error';
import { ERRORS } from '../utils/errors';

class ResponseManager {
  sendErrorResponse(res: Response, error: AppError | Error) {
    if (error instanceof AppError) {
      const err: AppError = error;
      res.status(err.responseCode);
      return res.json({
        code: err.code,
        message: err.message,
        data: err.data || {},
      });
    }
    console.log('ERROR: ', error);
    const errorResponse = ERRORS.E_INT_SERVER_ERR;
    res.status(errorResponse.responseCode);
    return res.json(errorResponse.body);
  }
  sendSuccessResponse(res: Response, data: {}, message: string) {
    res.status(200);
    return res.json({
      code: 'OK',
      message,
      data,
    });
  }
}

const responseManager = new ResponseManager();
export default responseManager;
