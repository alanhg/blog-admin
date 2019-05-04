/**
 * 测试环境配置
 * @type {{server: {port: number}}}
 */
const config = {
    server: {
        port: 3100,
        secret: "blog-admin"
    },
    rootDir: "/var/www/alanhg.github.io",
    postDir: "/source/_posts"
};
export default config;
