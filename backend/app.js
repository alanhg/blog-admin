const express = require('express');
const app = express();
const conf = require('./config');
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const isDeveloping = (process.env.NODE_ENV || 'development') == 'development';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.enable('trust proxy'); // trust first proxy
app.use(bodyParser.json()); // for parsing application/json
app.use(passport.initialize());
app.use(passport.session());
// mount the router on the app
app.use('/', routes);
// passport config
passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (password !== user.password) {
            return done(null, false, {message: 'Incorrect password.'});
        }

        return done(null, user);
    }
));
passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});

//配置静态资源
app.use('/', express.static(path.join(__dirname, '/static')));

if (!isDeveloping) {
    app.use('/', express.static(path.join(__dirname, 'dist')));
    // app.get('*', function (req, res) {
    //     res.render('index', {ua: ua});
    // });
}

app.listen(conf.server.port, "127.0.0.1", function () {
        console.log(`campus-server app listening on port ${conf.server.port}!`);
    }
)
;