const express = require('express')
const router = express.Router();
const userCr = require('../controller/user.controller')
const middle = require('../middleware/admin')

router.post('/login', userCr.login)
router.post('/reg', middle, userCr.registUser)

module.exports = router