const { kbbi, translate, wallpaper } = require('../module')

exports.kbbi = async (req,res) => {
    let url = req.query.q
    if (typeof(url) == 'undefined' || url == '') return res.status(404).json({ code: 404, result: "Kata Tidak Ditemukan" })

    const ini = await kbbi(url)
    return res.status(200).json({ code: 200, ...ini })
}

exports.translate = async (req, res) => {
    const { from, to, text } = req.query
    if (typeof(text) == 'undefined' || text == '' ) return res.status(404).json({ code: 404, result: "Kata Tidak Ditemukan" })
    const ini = await translate(text, {
        source: from,
        target: to
    })
    return res.status(200).json({ code: 200, ...ini })
}

exports.wallpaper = async (req, res) => {
    const ini = await wallpaper();
    return res.status(200).json({ code: 200, source: ini })
}