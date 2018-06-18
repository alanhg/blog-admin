/**
 * 生产环境配置
 * @type {{server: {port: number}}}
 */
const config = {
    server: {
        port: 3100,
        secret: 'kLand-campus'
    },
    postDIR: "/var/www/alanhg.github.io/source/_posts/"
};
module.exports = config;
