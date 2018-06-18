const express = require('express');
const app = express();
const conf = require('./config');
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const isDeveloping = (process.env.NODE_ENV || 'development') == 'development';
const session = require("express-session");

app.enable('trust proxy'); // trust first proxy
app.use(bodyParser.json()); // for parsing application/json
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true
}));
// mount the router on the app
app.use('/', routes);

//配置静态资源
app.use('/', express.static(path.join(__dirname, '/static')));

if (!isDeveloping) {
    app.use('/', express.static(path.join(__dirname, 'dist')));
    app.get('*', function (req, res) {
        res.sendfile('./dist/index.html');
    });
}

app.listen(conf.server.port, "127.0.0.1", function () {
        console.log(`campus-server app listening on port ${conf.server.port}!`);
    }
);