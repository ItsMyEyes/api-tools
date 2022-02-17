const { default: Axios } = require('axios')
const qs = require('qs')
const cheerio = require('cheerio')
const moment = require('moment')
const TikTokScraper = require('tiktok-scraper');
const { resolve } = require('bluebird');

module.exports = url => {
    return new Promise(function (resolve, reject) {
        Axios.get('https://ttdownloader.com/')
        .then((data) => {
            const $ = cheerio.load(data.data)
            const cookie = data.headers['set-cookie'].join('')
            const dataPost = {
                url: url,
                format: '', 
                token: $('#token').attr('value')
            }
            // return console.log(cookie);
            Axios({
                method: 'POST',
                url: 'https://ttdownloader.com/req/',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    origin: 'https://ttdownloader.com',
                    referer: 'https://ttdownloader.com/',
                    cookie: cookie,
                },
                data: qs.stringify(dataPost)
            }).then(async ({ data }) => {
                const $ = cheerio.load(data)
                Axios({
                    method: "GET",
                    url: `https://api.kiyora-dev.xyz/tiktok/?url=${url}`
                }).then(asd => {
                    const result = {
                        success: true,
                        status: 200,
                        video_download_hd: $('#results-list > div:nth-child(2) > div.download > a').attr('href'),
                        wm: $('#results-list > div:nth-child(3) > div.download > a').attr('href'),
                        audio: $('#results-list > div:nth-child(4) > div.download > a').attr('href'),
                        data: asd.data
                    }
                    resolve(result);
                })
            })
            .catch(e => {
                resolve({ status: false, message: 'error fetch data', e: e })
            })
        })
        .catch(e => {
            resolve({ status: false, message: 'error fetch data', e: e })
        })
    })
}

// module.exports = async url => {
//     return new Promise(function (resolve, reject) {
//         Axios.post(`https://api.tikmate.app/api/lookup?url=${url}`).then(data => {
//             const u = data.data
//             const result = {
//                 success: true,
//                 status: 200,
//                 video_download_hd: `https://tikmate.app/download/${u.token}/${u.id}.mp4?hd=1`,
//                 data: u,
//             }
//             resolve(result)
//         }).catch(err => {
//             resolve(err)
//         })
//     })
// }