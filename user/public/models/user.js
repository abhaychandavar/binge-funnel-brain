"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = __importDefault(require("../utils/constants"));
const lodash_1 = __importDefault(require("lodash"));
const cypher_manager_1 = __importDefault(require("../services/cypher-manager"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        set: cypher_manager_1.default.encrypt,
        get: cypher_manager_1.default.decrypt,
    },
    lastName: {
        type: String,
        required: true,
        set: cypher_manager_1.default.encrypt,
        get: cypher_manager_1.default.decrypt,
    },
    email: {
        type: String,
        required: true,
        set: cypher_manager_1.default.encrypt,
        get: cypher_manager_1.default.decrypt,
    },
    password: {
        type: String,
        required: true,
        set: cypher_manager_1.default.encrypt,
        get: cypher_manager_1.default.decrypt,
    },
    status: {
        type: Number,
        enum: Object.values(constants_1.default.USER.USER_STATUS),
        required: true,
        default: constants_1.default.USER.USER_STATUS.PENDING,
    },
    role: {
        ref: 'roles',
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    id: true,
    toJSON: {
        getters: true,
        virtuals: true,
    },
    toObject: {
        getters: true,
        virtuals: true,
    },
});
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    userObject.name = `${userObject.firstName} ${userObject.lastName}`.trim();
    return lodash_1.default.omit(userObject, ['password']);
};
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map