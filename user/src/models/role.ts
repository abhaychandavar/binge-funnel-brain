import { Schema, model } from 'mongoose';
import _ from 'lodash';
import CONSTANTS from '../utils/constants';

const RoleSchema = new Schema(
  {
    roleLabel: {
      type: String,
      enum: Object.values(CONSTANTS.ROLES.ROLE_LABEL),
      default: CONSTANTS.ROLES.ROLE_LABEL.ADMIN,
      required: true,
      unique: true,
    },
    permissions: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    id: true,
  }
);

export type ROLE = {
  roleLabel: string;
  role: string;
};

const RoleModel = model('Role', RoleSchema);
export default RoleModel;
