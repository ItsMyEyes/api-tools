const express = require('express')
const router = express.Router();
const medsosCr = require('../controller/medsos.controller')
const middleware = require('../middleware/checkDebug')

router.get('/ig', middleware, medsosCr.IGuser)
router.get('/ig/:param', middleware, medsosCr.IGuser)
router.get('/ig/media/get', middleware, medsosCr.IGmedia)
router.get('/ig/story/get', middleware, medsosCr.IGstory)

router.get('/tiktok', middleware, medsosCr.tiktok)

module.exports = router