var express = require('express')
var router = express.Router()

const apiRouter = require('./api')
router.use('/api', apiRouter)
const testRouter = require('./test')
router.use('/test', testRouter)

module.exports = router
