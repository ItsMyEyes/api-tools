const { kbbi, translate, wallpaper } = require('../module')
const JsonRes = require('./controller')

exports.kbbi = async (req,res) => {
    let url = req.query.q
    if (typeof(url) == 'undefined' || url == '') return res.status(404).json({ code: 404, result: "Kata Tidak Ditemukan" })

    const result = await kbbi(url)
    return JsonRes(res, result, 'success fetching data')
}

exports.translate = async (req, res) => {
    const { from, to, text } = req.query
    if (typeof(text) == 'undefined' || text == '' ) return res.status(404).json({ code: 404, result: "Kata Tidak Ditemukan" })
    const result = await translate(text, {
        source: from,
        target: to
    })
    return JsonRes(res, result, 'success fetching data')
}

exports.wallpaper = async (req, res) => {
    const result = await wallpaper();
    return JsonRes(res, result, 'success fetching data')
}