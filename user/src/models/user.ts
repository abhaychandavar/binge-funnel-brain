import { Schema, model, Types } from 'mongoose';
import CONSTANTS from '../utils/constants';
import _ from 'lodash';
import cipherManager from '../services/cypher-manager';
export type USER = {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: Number;
  role?: Types.ObjectId;
};

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      set: cipherManager.encrypt,
      get: cipherManager.decrypt,
    },
    lastName: {
      type: String,
      required: true,
      set: cipherManager.encrypt,
      get: cipherManager.decrypt,
    },
    email: {
      type: String,
      required: true,
      set: cipherManager.encrypt,
      get: cipherManager.decrypt,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: cipherManager.encrypt,
      get: cipherManager.decrypt,
    },
    status: {
      type: Number,
      enum: Object.values(CONSTANTS.USER.USER_STATUS),
      required: true,
      default: CONSTANTS.USER.USER_STATUS.PENDING,
    },
    role: {
      ref: 'Role',
      type: Schema.Types.ObjectId,
    },
  },
  {
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
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  userObject.name = `${userObject.firstName} ${userObject.lastName}`.trim();
  return _.omit(userObject, ['password']);
};

const UserModel = model('User', UserSchema);
export default UserModel;
