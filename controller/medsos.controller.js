const { insta, tiktok } = require('../module')
const re = require('./controller')

exports.IGuser = async (req,res) => {
    const username = req.query.url ? req.query.url : req.params.param;
    if (typeof(username) == 'undefined' || username == '') return res.status(404).json({ code: 404, result: "Username not found" })
    const result = await insta.scrapeUser(username).then(res => { return res })
    console.log(result)
    re.logger(req, result.status, "find user instagram", req.user.id)
    return re.res(res, result, 'success fetching data')
}

exports.IGmedia = async (req,res) => {
    const url = req.query.url;
    if (typeof(url) == 'undefined' || url == '') return res.status(404).json({ code: 404, result: "Media not found" })

    const result = await insta.scappingPosting(url).then(res => { return res })
    re.logger(req, result.status, "get media instagram", req.user.id)
    return re.res(res, result, 'success fetching data')
}

exports.IGstory = async (req,res) => {
    const url = req.query.url;
    const uid = req.query.uid;
    if (typeof(url) == 'undefined' || url == '' || typeof(uid) == 'undefined' || uid == '') return res.status(404).json({ code: 404, message: "Media not found" })

    const result = await insta.getStory(url, uid).then(res => { return res })
    re.logger(req, result.status, "get story user instagram", req.user.id)
    return re.res(res, result, 'success fetching data')
}

exports.IGstoryUser = async (req,res) => {
    const url = req.query.url;
    if (typeof(url) == 'undefined' || url == '' ) return res.status(404).json({ code: 404, message: "Media not found" })

    const result = await insta.getStoryUser(url).then(res => { return res })
    return re.res(res, result, 'success fetching data')
}

exports.tiktok = async (req,res) => {
    const url = req.query.url;
    if (typeof(url) == 'undefined' || url == '') return res.status(404).json({ code: 404, result: "Media not found" })

    const result = await tiktok(url).then(res => { return res }).catch(err => { return err })
    return re.res(res, result, 'success fetching data')
}