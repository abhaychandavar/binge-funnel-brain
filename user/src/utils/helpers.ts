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
  generateStringCombinations = (
    text: string,
    maximumStringSize: number = 50
  ) => {
    let substringArray: string[] = [];
    let characterCounter = 1;
    let textLowercased = text.toLowerCase();
    let characterCount = text.length;
    for (let i = 0; i <= characterCount; i++) {
      for (let x = 0; x <= characterCount; x++) {
        let lastCharacter = x + characterCounter;
        if (lastCharacter <= characterCount) {
          let substring = textLowercased.substring(x, lastCharacter);
          substringArray.push(substring);
        }
      }
      characterCounter++;
      if (maximumStringSize && characterCounter > maximumStringSize) {
        break;
      }
    }
    return substringArray;
  };
}

const helpers = new Helpers();
export default helpers;
