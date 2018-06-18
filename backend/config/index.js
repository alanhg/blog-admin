/**
 * Created by He on 14/09/2017.
 * 环境读取入口
 */
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const development = require('./config.development');
const production = require('./config.production');
const test = require('./config.test');
let config = null;
switch (env) {
  case 'development':
    config = development;
    break;
  case 'production':
    config = production;
    break;
  default:
    config = test;
}
module.exports = config;
