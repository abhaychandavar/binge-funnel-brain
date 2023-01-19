"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../../controllers/v1/auth-controller"));
var express = require('express');
var router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
router.get('/signin', auth_controller_1.default.signin);
router.get('/signup', auth_controller_1.default.signup);
module.exports = router;
//# sourceMappingURL=auth.js.map