import { scryptSync } from 'crypto';
import CONFIG from '../config/config';

const PERMISSIONS = {
  CREATE_USER: 'CREATE_USER',
  READ_USER: 'READ_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
};
const CONSTANTS = {
  USER: {
    USER_STATUS: {
      PENDING: 0,
      ACTIVE: 1,
      INACTIVE: 2,
      DISABLED: 3,
    },
  },
  APP: {
    ENVIRONMENT: {
      dev: 'dev',
      prod: 'prod',
    },
  },
  PERMISSIONS,
  ROLES: {
    ROLE_LABEL: {
      ADMIN: 'ADMIN',
      PARTNER: 'PARTNER',
    },
    ROLE_PERMISSIONS: {
      ADMIN: [
        PERMISSIONS.CREATE_USER,
        PERMISSIONS.READ_USER,
        PERMISSIONS.UPDATE_USER,
        PERMISSIONS.DELETE_USER,
      ],
    },
  },
  USER_PERMISSIONS: {
    CREATE_USER: 'CREATE_USER',
    READ_USER: 'READ_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
  },
};
export default CONSTANTS;
