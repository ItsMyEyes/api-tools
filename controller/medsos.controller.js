const { insta, tiktok } = require('../module')

exports.IGuser = async (req,res) => {
    const username = req.query.url ? req.query.url : req.params.param;
    if (typeof(username) == 'undefined' || username == '') return res.status(404).json({ code: 404, result: "Username not found" })

    const result = await insta.scrapeUser(username).then(res => { return res })
    return res.status(200).json({
        code: 200,
        ...result
    });
}

exports.IGmedia = async (req,res) => {
    const url = req.query.url;
    if (typeof(url) == 'undefined' || url == '') return res.status(404).json({ code: 404, result: "Media not found" })

    const result = await insta.scappingPosting(url).then(res => { return res })
    return res.status(200).json({
        code: 200,
        ...result
    });
}

exports.IGstory = async (req,res) => {
    const url = req.query.url;
    const uid = req.query.uid;
    if (typeof(url) == 'undefined' || url == '' || typeof(uid) == 'undefined' || uid == '') return res.status(404).json({ code: 404, message: "Media not found" })

    const result = await insta.getStory(url, uid).then(res => { return res })
    return res.status(200).json({
        code: 200,
        ...result
    });
}

exports.tiktok = async (req,res) => {
    const url = req.query.url;
    if (typeof(url) == 'undefined' || url == '') return res.status(404).json({ code: 404, result: "Media not found" })

    const result = await tiktok(url).then(res => { return res })
    return res.status(200).json({
        code: 200,
        ...result
    });
}