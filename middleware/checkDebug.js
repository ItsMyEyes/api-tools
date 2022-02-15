module.exports = async (req, res, next) => {
    const ch = req.query.love == 'npc'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    const allowedIpDebug = [
        "::1",
        "127.0.0.1",
        "110.138.90.157",
        "104.21.39.91"
    ]
    if (allowedIpDebug.indexOf(ip) !== -1 && ch) {
        return next() 
    } else {
       return res.status(403).json({'message': `Forbiden please go away and promise to dev :) ${ip}`,'code': 403})
    }
}