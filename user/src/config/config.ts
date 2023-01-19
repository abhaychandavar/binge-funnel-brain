import CONSTANTS from '../utils/constants';
import devConfig from './config.dev';

const config = () => {
  const env = process.env.ENVIRONMENT || 'dev';
  const ENVIRONMENT = Object.values(CONSTANTS.APP.ENVIRONMENT).includes(env)
    ? env
    : 'dev';
  const config: typeof devConfig = require(`./config.${ENVIRONMENT}`).default;
  return config;
};

const CONFIG = config();
export default CONFIG;
