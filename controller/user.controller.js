const db = require('../models')
const bcrypt = require('bcrypt')
const { Op, json } = require('sequelize')
const result = require('./controller')
const jwt = require('jsonwebtoken')
const ip = require('ip')

exports.login = async (req,res) => {
    const { emailOrUsername, password } = req.body
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let user = null
    if (!emailOrUsername || !password) {
        return result.message(res, 'Invalid form', 400)
    }

    if (re.test(String(emailOrUsername).toLowerCase())) {
        user = await db.users.findOne({
            where: {
                email: emailOrUsername
            },
            attributes: ['username','email','password','verification','id']
        })   
    } else {
        user = await db.users.findOne({
            where: {
                username: emailOrUsername
            },
            attributes: ['username','email','password','verification','id']
        })
    }

    if (!user) {
        result.logger(req, false, "Email / Username Not Found, check again", '1') 
        return result.message(res, "Email / Username Not Found, check again", 403)
    }
 
    const checkingPassword = await bcrypt.compare(password, user.password)
    
    if (!checkingPassword) {  
        result.logger(req, false, "Email / Username Not Found, check again", '1')  
        return result.message(res, "Email / Password is wrong, check again", 403)
    }
    
    let payload = { uid: user.id }
    let accessToken = jwt.sign(payload, '#MBzh4ma9@dL(92n', {expiresIn: '1d'}); 
    const showUser = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'verification': user.verification,
        'token': accessToken
    }

    result.logger(req, true, "Login success", user.id)  
    return result.res(res, showUser, 'success login, iam can make you happy') 
}

exports.registUser = async (req,res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return result.message(res, 'Invalid Form', 400)
    }

    const validationEmail = await db.users.findOne({
        where:{ 
            email: email 
        },
    })

    const validationUsername = await db.users.findOne({
        where:{ 
            username: username 
        },
    })

    await db.users.findOne({
        where:{ 
            username: 'admin' 
        },
    })

    if (validationEmail) {
        result.logger(req, false, 'create new user')
        return result.message(res, 'email has been used, please use another email', 400) 
    }

    if (validationUsername) {
        result.logger(req, false, 'create new user')
        return result.message(res,'username has been used, please use another username', 400)   
    }

    await db.users.create({
        'email': email,
        'password': await bcrypt.hash(password, 15),
        'name': username,
        'username': username,
    })

    // result.logger(req, true, 'create new user')
    return result.message(res,'You are done make new users')
}