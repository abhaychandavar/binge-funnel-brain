import { APP_TYPE_ERROR } from '../types/app-types';

class AppError extends Error {
  responseCode: number;
  code: string;
  data?: {};
  constructor(err: APP_TYPE_ERROR) {
    super(err.body.message);
    this.code = err.body.code;
    this.message = err.body.message;
    this.responseCode = err.responseCode;
    this.data = err.body.data;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
