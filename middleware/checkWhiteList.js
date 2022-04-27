const db = require('../models')
const re = require('../controller/controller')

module.exports = async (req, res, next) => {
    const path = req.route.path
    const check = await db.whitelist_path.findOne({
        where: {
            where_url: path,
            status: 'true'
        },
        attributes: ['id']
    })
    if (check) {
        const checkUser = await db.whitelist_user.findOne({
            where: {
                where_url: path,
                id_user: req.user.id,
                status: 'true'
            },
            attributes: ['id']
        })
        if (checkUser || req.user.role == 'admin') {
            next()
        } else {
            re.logger(req, false, 'checking whitelist user but failure', req.user.id)
            return res.status(403).json({'message': 'You are not whitelist user','statusCode': 403})
        }
    } else {
        next()
    }
}