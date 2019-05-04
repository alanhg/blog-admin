/**
 * Created by He on 14/09/2017.
 * 环境读取入口
 */
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
import development from './config.development';
import production from './config.production';
import test from './config.test';

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
export default config;
