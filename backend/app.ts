import express, {Request, Response} from 'express';
import session, {SessionOptions} from 'express-session';
import connectRedis from 'connect-redis';
import * as bodyParser from 'body-parser';
// @ts-ignore
import conf from './config';
import routes from './routes';
import path from 'path';

const app = express();
const isDeveloping = (process.env.NODE_ENV || 'development') === 'development';

const RedisStore = connectRedis(session);

app.enable('trust proxy'); // trust first proxy
app.use(bodyParser.json()); // for parsing application/json


const sessionConfig: SessionOptions = {
    secret: 'Shh, its a secret!',
    resave: false,
    saveUninitialized: true
};
if (!isDeveloping) {
    // @ts-ignore
    sessionConfig.store = new RedisStore(conf.redis);
}
app.use(session(sessionConfig));
// mount the router on the app
app.use('/', routes);
// 配置静态资源
app.use('/', express.static(path.join(__dirname, '/static')));

if (!isDeveloping) {
    app.use('/', express.static(path.join(__dirname, 'dist')));
    app.get('*', function (req: Request, res: Response) {
        res.sendFile(__dirname + '/dist/index.html');
    });
}

// @ts-ignore
app.listen(conf.server.port, '0.0.0.0', function () {
        // @ts-ignore
        console.log(`blog-admin app listening on port ${conf.server.port}!`);
    }
);
