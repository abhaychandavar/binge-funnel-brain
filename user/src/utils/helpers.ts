import AppError from './app-error';
import { ERRORS } from './errors';

class Helpers {
  validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  validatePassword = (password: string) => {
    return password.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/
    );
  };
  handleError = (err: AppError | Error) => {
    console.error(err);
    if (err instanceof AppError) {
      throw err;
    }
    const error = ERRORS.E_INT_SERVER_ERR;
    throw new AppError(error);
  };
}

const helpers = new Helpers();
export default helpers;
