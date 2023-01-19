"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = __importDefault(require("../utils/app-error"));
const errors_1 = require("../utils/errors");
class ResponseManager {
    sendErrorResponse(res, error) {
        if (error instanceof app_error_1.default) {
            const err = error;
            res.status(err.responseCode);
            return res.json({
                code: err.code,
                message: err.message,
                data: err.data || {},
            });
        }
        console.log('ERROR: ', error);
        const errorResponse = errors_1.ERRORS.E_INT_SERVER_ERR;
        res.status(errorResponse.responseCode);
        return res.json(errorResponse.body);
    }
    sendSuccessResponse(res, data, message) {
        res.status(200);
        return res.json({
            code: 'OK',
            message,
            data,
        });
    }
}
const responseManager = new ResponseManager();
exports.default = responseManager;
//# sourceMappingURL=response-manager.js.map