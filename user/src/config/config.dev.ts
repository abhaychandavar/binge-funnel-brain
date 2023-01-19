import CONSTANTS from '../utils/constants';

const devConfig = {
  APP: {
    ENVIRONMENT: CONSTANTS.APP.ENVIRONMENT.dev,
    CORS_OPTIONS: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  },
  AUTH: {
    CIPHER_SECRET:
      process.env.CIPHER_SECRET || 'trF{asd}fr462t57*&^&&*^**asdABVBFP**',
    JWT_SECRET: process.env.JWT_SECRET || 'asdasd^&*6rujtv67r656',
  },
};

export default devConfig;
