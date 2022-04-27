const express = require('express')
const router = express.Router();
const medsosCr = require('../controller/medsos.controller')
const middleware = require('../middleware/checkAuth')
const white = require('../middleware/checkWhiteList')

router.get('/ig', [middleware, white], medsosCr.IGuser)
router.get('/ig/:param', [middleware, white], medsosCr.IGuser)
router.get('/ig/media/get', [middleware, white], medsosCr.IGmedia)
router.get('/ig/story/get', [middleware, white], medsosCr.IGstory)
router.get('/ig/story/get/user', [middleware, white], medsosCr.IGstoryUser)
router.get('/tiktok', [middleware, white], medsosCr.tiktok)

module.exports = router