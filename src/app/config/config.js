const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {},
  production: {}
};

const defaultConfig = {
  facebookAppId: process.env.FACEBOOK_APP_ID
};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
