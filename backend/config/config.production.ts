/**
 * 生产环境配置
 * @type {{server: {port: number}}}
 */
const config = {
    server: {
        port: 3100,
        secret: 'blog-admin'
    },
    rootDir: '/var/www/blog/alanhg.github.io/',
    postDir: 'source/_posts/',
    redis: {
        host: '0.0.0.0',
        port: 6379,
        db: 0,
        expire: 60 * 60 // 1h
    },
    login: {
        email: process.env.BLOG_ADMIN_EMAIL,
        password: process.env.BLOG_ADMIN_PASSWORD,
        name: process.env.BLOG_ADMIN_NAME
    }
};
export default config;
