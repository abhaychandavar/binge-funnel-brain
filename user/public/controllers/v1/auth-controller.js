"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_manager_1 = __importDefault(require("../../services/auth-manager"));
const response_manager_1 = __importDefault(require("../../services/response-manager"));
class AuthController {
    signin(req, res) {
        auth_manager_1.default
            .signin(req.body)
            .then((result) => response_manager_1.default.sendSuccessResponse(res, result, 'Signin successful'))
            .catch((err) => response_manager_1.default.sendErrorResponse(res, err));
    }
    signup(req, res) {
        auth_manager_1.default
            .signup(req.body)
            .then((result) => response_manager_1.default.sendSuccessResponse(res, result, 'Signup successful'))
            .catch((err) => response_manager_1.default.sendErrorResponse(res, err));
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=auth-controller.js.map