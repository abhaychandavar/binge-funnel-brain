"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../utils/constants"));
const config = () => {
    const env = process.env.ENVIRONMENT || 'dev';
    const ENVIRONMENT = Object.values(constants_1.default.APP.ENVIRONMENT).includes(env)
        ? env
        : 'dev';
    const config = require(`./config.${ENVIRONMENT}`).default;
    return config;
};
const CONFIG = config();
exports.default = CONFIG;
//# sourceMappingURL=config.js.map