import { Request } from 'express';
import { USER } from '../models/user';

type ERROR_BODY = {
  data: {};
  message: string;
  code: string;
};
export type APP_TYPE_ENVIRONMENT = {
  ENVIRONMENT: 'dev' | 'prod';
};
export type APP_TYPE_ERROR = {
  responseCode: number;
  body: ERROR_BODY;
};
export interface APP_REQUEST extends Request {
  user?: USER;
}
