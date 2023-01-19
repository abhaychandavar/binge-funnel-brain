"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const app_error_1 = __importDefault(require("../utils/app-error"));
const errors_1 = require("../utils/errors");
const helpers_1 = __importDefault(require("../utils/helpers"));
class AuthManager {
    async validateUserData(data) {
        if (!helpers_1.default.validateEmail(data.email)) {
            const error = errors_1.ERRORS.E_INVALID_REQ_DATA;
            error.body.message = 'Please provide a valid email ID';
            throw new app_error_1.default(error);
        }
        if (!helpers_1.default.validatePassword(data.password)) {
            const error = errors_1.ERRORS.E_INVALID_REQ_DATA;
            error.body.message = 'Please provide a valid email ID';
            throw new app_error_1.default(error);
        }
        return data;
    }
    async signin(body) {
        try {
            const data = body;
            const userData = await this.validateUserData(data);
            const user = await user_1.default.create(userData);
            return user;
        }
        catch (err) {
            helpers_1.default.handleError(err);
        }
    }
    async signup(body) {
        try {
            const data = body;
            const userData = await this.validateUserData(data);
            const user = await user_1.default.create(userData);
            return user;
        }
        catch (err) {
            helpers_1.default.handleError(err);
        }
    }
}
const authManager = new AuthManager();
exports.default = authManager;
//# sourceMappingURL=auth-manager.js.map