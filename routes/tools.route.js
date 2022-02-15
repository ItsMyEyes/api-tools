const express = require('express')
const router = express.Router();
const kbbiCr = require('../controller/tools.controller')

router.get('/kbbi', kbbiCr.kbbi)
router.get('/translate', kbbiCr.translate)
router.get('/wall', kbbiCr.wallpaper)

module.exports = router