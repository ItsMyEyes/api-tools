const db = require('../models')

exports.res = (res, data = null, message = 'success', code = 200) => {
    return res.status(code).json({
        statusCode: code,
        message: message,
        data: data
    })
}

exports.message = (res, message, code = 200) => {
    return res.status(code).json({
        statusCode: code,
        message: message,
    })
}

exports.logger = (req, params, what, who) => {
    var ipPub = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    const data = isEmpty(req.body) ? req.query : req.body;
    delete data.password
    db.logs.create({
        doing: what,
        ip_client: ipPub,
        request: JSON.stringify(data),
        status: params ? 'success' : 'failure',
        id_user: who ?? req.user.id,
        url: req.originalUrl
    })
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}