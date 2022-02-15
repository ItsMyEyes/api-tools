const axios = require('axios')
const countryCode = require('country-data')

module.exports = (text, opts = {}) => {
    const source = opts.source ? opts.source : 'en';
    const target = opts.target ? opts.target : 'id'; 
    const code = countryCode.countries.all.filter(res => res.alpha2 == target.toUpperCase())
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURI(text)}`
    return new Promise(function (resolve, reject) {
        axios.get(url).then(res => {
            const ini_array = Array()
            res.data[0].forEach(element => ini_array.push(element[0]));
            const result = ini_array.join(' ');
            resolve({
                error: false,
                translate: result
            })
       }).catch(() => {
            resolve({
                error: true,
                translate: `Cant translate to ${code[0].name}`
            })
       })
    })
}