import { Request, Response } from 'express';
import authController from '../../controllers/v1/auth-controller';
import { APP_REQUEST } from '../../types/app-types';

var express = require('express');
var router = express.Router();

// Health check
router.get('/', (req: APP_REQUEST, res: Response) => {
  res.render('index', { title: 'Express' });
});
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
module.exports = router;
