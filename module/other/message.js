const translate = require('../tools/translate')

module.exports = async (text, where = 'id') => {
    const opt = {
        source: where == 'id' ? 'id' : 'en',
        target: where == 'id' ? 'en' : 'id'
    }
    return new Promise(async (resolve, reject) => {
        console.log(await translate(text, opt))
        resolve()
    })
}