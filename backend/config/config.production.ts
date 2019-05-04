/**
 * 生产环境配置
 * @type {{server: {port: number}}}
 */
const config = {
    server: {
        port: 3100,
        secret: 'blog-admin'
    },
    rootDir: "/var/www/alanhg.github.io/",
    postDir: "source/_posts/",
    redis: {
        host: "localhost",
        port: 6379,
        db: 0,
        expire: 60 * 60 //1h
    }
};
export default config;
