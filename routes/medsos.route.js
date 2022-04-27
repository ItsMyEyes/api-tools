const express = require('express')
const router = express.Router();
const medsosCr = require('../controller/medsos.controller')
const middleware = require('../middleware/checkAuth')
const white = require('../middleware/checkWhiteList')

router.get('/ig', medsosCr.IGuser)
router.get('/ig/:param', medsosCr.IGuser)
router.get('/ig/media/get', medsosCr.IGmedia)
router.get('/ig/story/get', medsosCr.IGstory)
router.get('/ig/story/get/user', medsosCr.IGstoryUser)
router.get('/tiktok', medsosCr.tiktok)

module.exports = router