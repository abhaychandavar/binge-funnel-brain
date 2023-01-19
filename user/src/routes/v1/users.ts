import { NextFunction, Request, Response } from 'express';
import authController from '../../controllers/v1/auth-controller';
import userController from '../../controllers/v1/user-controller';
import authenticator from '../../middlewares/authenticator';
import { APP_REQUEST } from '../../types/app-types';

var express = require('express');
var router = express.Router();

// Health check
router.get(
  '/health',
  function (req: APP_REQUEST, res: Response, next: NextFunction) {
    res.render('index', { title: 'BingeFunnel' });
  }
);
router.get('/', authenticator.authenticateRequest, userController.getUsers);

module.exports = router;
