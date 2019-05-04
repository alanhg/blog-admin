import session, {SessionOptions} from "express-session";
import connectRedis from 'connect-redis';
import express, {Request, Response} from 'express';
// @ts-ignore
import conf from './config';

const app = express();
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const isDeveloping = (process.env.NODE_ENV || 'development') == 'development';

let RedisStore = connectRedis(session);

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
//配置静态资源
app.use('/', express.static(path.join(__dirname, '/static')));

if (!isDeveloping) {
    app.use('/', express.static(path.join(__dirname, 'dist')));
    app.get('*', function (req: Request, res: Response) {
        res.sendFile(__dirname + '/dist/index.html');
    });
}
// @ts-ignore
console.log(conf);

// @ts-ignore
app.listen(conf.server.port, "127.0.0.1", function () {
        // @ts-ignore
        console.log(`blog-admin app listening on port ${conf.server.port}!`);
    }
);
