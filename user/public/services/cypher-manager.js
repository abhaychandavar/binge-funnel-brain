"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("../config/config"));
console.log('CONFIG: ', config_1.default.APP);
class CipherManager {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.secret = config_1.default.AUTH.CIPHER_SECRET;
    }
    encrypt(str) {
        const cipher = (0, crypto_1.createCipheriv)(this.algorithm, this.secret, null);
        let cryptedStr = cipher.update(str, 'utf8', 'hex');
        cryptedStr += cipher.final('hex');
        return cryptedStr;
    }
    decrypt(str) {
        const cipher = (0, crypto_1.createDecipheriv)(this.algorithm, this.secret, null);
        let decryptedStr = cipher.update(str, 'utf8', 'hex');
        decryptedStr += cipher.final('utf8');
        return decryptedStr;
    }
}
const cipherManager = new CipherManager();
exports.default = cipherManager;
//# sourceMappingURL=cypher-manager.js.map