var express = require('express');
var router = express.Router();

const apiRouter = require('./api');
router.use('/api', apiRouter);

module.exports = router;
