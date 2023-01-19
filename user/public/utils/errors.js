"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = void 0;
exports.ERRORS = {
    E_INT_SERVER_ERR: {
        body: {
            code: 'E_INT_SERVER_ERR',
            message: 'Something went wrong! We will look into it.',
            data: {},
        },
        responseCode: 500,
    },
    E_UNAUTHORIZED: {
        body: {
            code: 'E_UNAUTHORIZED',
            message: 'You are unauthorized to access this area',
            data: {},
        },
        responseCode: 401,
    },
    E_INVALID_REQ_DATA: {
        body: {
            code: 'E_INVALID_REQ_DATA',
            message: 'Data you sent is invalid',
            data: {},
        },
        responseCode: 400,
    },
};
//# sourceMappingURL=errors.js.map