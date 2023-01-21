import { Request, Response } from 'express';
import UserModel, { USER } from '../models/user';
import AppError from '../utils/app-error';
import { ERRORS } from '../utils/errors';
import helpers from '../utils/helpers';
import jwt from 'jsonwebtoken';
import CONFIG from '../config/config';
import cipherManager from './cypher-manager';
type signin = {
  email: string;
  password: string;
};
type jwtAuthTokenPayload = {
  time: string;
  userId: string;
  iat: number;
  exp: number;
};
class AuthManager {
  async validateUserData(data: USER) {
    if (!helpers.validateEmail(data.email)) {
      const error = ERRORS.E_INVALID_REQ_DATA;
      error.body.message = 'Please provide a valid email ID';
      throw new AppError(error);
    }
    if (!helpers.validatePassword(data.password)) {
      const error = ERRORS.E_INVALID_REQ_DATA;
      error.body.message = 'Please provide a valid password';
      error.body.data =
        'Passwords should be composed of numbers, special characters and alphabets';
      throw new AppError(error);
    }
    if (!data.firstName) {
      const error = ERRORS.E_INVALID_REQ_DATA;
      error.body.message = 'Please provide first name';
      throw new AppError(error);
    }
    if (!data.lastName) {
      const error = ERRORS.E_INVALID_REQ_DATA;
      error.body.message = 'Please provide last name';
      throw new AppError(error);
    }
    data.firstName = data.firstName.toLowerCase().trim();
    data.lastName = data.lastName.toLowerCase().trim();
    data.email = data.email.toLowerCase().trim();
    const user = await UserModel.findOne({ email: data.email }).exec();
    if (user) {
      const error = ERRORS.E_DUPLICATE_RECORD;
      error.body.message =
        'A user with this email address already exists! Please consider logging in';
      throw new AppError(error);
    }
    return data;
  }
  async validateSigninPayload(data: signin) {
    if (!data.password) {
      const error = ERRORS.E_INVALID_REQ_DATA;
      error.body.message = 'Password required';
      throw new AppError(error);
    }
    const user = await UserModel.findOne({
      email: data.email,
    }).populate('role');
    if (!user) {
      const error = ERRORS.E_INVALID_REQ_DATA;
      error.body.message =
        'Please check if email or password you entered is correct';
      throw new AppError(error);
    }
    return user;
  }
  async signin(body: signin) {
    try {
      const data = body;
      const userData: USER = await this.validateSigninPayload(data);
      if (userData.password !== data.password) {
        const error = ERRORS.E_INVALID_REQ_DATA;
        error.body.message =
          'Please check if email or password you entered is correct';
        throw new AppError(error);
      }
      const token = this.generateAuthToken(String(userData._id));
      return { userData, token };
    } catch (err: any) {
      helpers.handleError(err);
    }
  }
  async signup(body: any) {
    try {
      const data = body;
      const userData: USER = await this.validateUserData(data);

      userData.hashes = [
        ...cipherManager.generateHashes(
          `${userData.firstName} ${userData.lastName}`
        ),
        ...cipherManager.generateHashes(userData.email),
      ];
      const user = await UserModel.create(userData);
      return { user };
    } catch (err: any) {
      helpers.handleError(err);
    }
  }
  generateAuthToken(userId: string) {
    let data = {
      time: Date(),
      userId,
    };
    const token = jwt.sign(data, CONFIG.AUTH.JWT_SECRET, {
      expiresIn: '2d',
    });
    return token;
  }
  async validateAuthToken(token: string) {
    const data = jwt.verify(
      token,
      CONFIG.AUTH.JWT_SECRET
    ) as jwtAuthTokenPayload;
    return data as jwtAuthTokenPayload;
  }
}
const authManager = new AuthManager();
export default authManager;
