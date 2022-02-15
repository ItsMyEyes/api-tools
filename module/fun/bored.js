const translate = require('../tools/translate')
const axios = require('axios')
const { reject } = require('bluebird')
const countryCode = require('country-data')

module.exports = (custom_bahasa = null) => {
    let opt = {}
    let code = countryCode.countries.all.filter(res => res.alpha2 == custom_bahasa.toUpperCase())
    if (code.length < 1) return reject("Code country not valid")
    if (code.length > 0) {
        opt = {
            target: code[0].alpha2.toLocaleLowerCase()
        }
    }
    return new Promise(function (resolve, reject) {
        axios.get('https://www.boredapi.com/api/activity?participants=1').then(async res => {
            const trans = await translate(res.data.activity, opt)
            const result = {
                error: trans.error,
                original: res.data.activity,
                terjemahan: !trans.error ? trans.translate : null,
                reason: trans.error ? trans.translate : null,
            }
            resolve(result)
        })
    })
}