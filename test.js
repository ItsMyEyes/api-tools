const request = require('request');
const cheerio = require('cheerio');
const { default: axios } = require('axios');

let url = 'https://www.tokopedia.com/search?st=product&q=laptop&navsource=home';

axios.get(url).then(res => {
    
    let $ = cheerio.load(res.data);
    const data = $('div[data-testid=divSRPContentProducts]').text();
    console.log(data)
})