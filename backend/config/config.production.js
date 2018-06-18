/**
 * 生产环境配置
 * @type {{server: {port: number}}}
 */
const config = {
    server: {
        port: 3100,
        secret: 'kLand-campus'
    }
};
module.exports = config;
