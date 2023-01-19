"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = __importDefault(require("./app-error"));
const errors_1 = require("./errors");
class Helpers {
    constructor() {
        this.validateEmail = (email) => {
            return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };
        this.validatePassword = (password) => {
            return password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/);
        };
        this.handleError = (err) => {
            if (err instanceof app_error_1.default) {
                throw err;
            }
            const error = errors_1.ERRORS.E_INT_SERVER_ERR;
            throw new app_error_1.default(error);
        };
    }
}
const helpers = new Helpers();
exports.default = helpers;
//# sourceMappingURL=helpers.js.map