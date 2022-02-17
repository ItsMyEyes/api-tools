const { default: Axios } = require('axios')
const qs = require('qs')
const cheerio = require('cheerio')
const moment = require('moment')
const TikTokScraper = require('tiktok-scraper');
const { resolve } = require('bluebird');

// module.exports = url => {
//     return new Promise(function (resolve, reject) {
//         Axios.get('https://ttdownloader.com/')
//         .then((data) => {
//             const $ = cheerio.load(data.data)
//             const cookie = data.headers['set-cookie'].join('')
//             const dataPost = {
//                 url: url,
//                 format: '', 
//                 token: $('#token').attr('value')
//             }
//             // return console.log(cookie);
//             Axios({
//                 method: 'POST',
//                 url: 'https://ttdownloader.com/req/',
//                 headers: {
//                     'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//                     origin: 'https://ttdownloader.com',
//                     referer: 'https://ttdownloader.com/',
//                     cookie: cookie,
//                 },
//                 data: qs.stringify(dataPost)
//             }).then(async ({ data }) => {
//                 const $ = cheerio.load(data)
//                 const videoMeta = await TikTokScraper.getVideoMeta(url);
//                 const meta = videoMeta.collector[0]
//                 const result = {
//                     success: true,
//                     status: 200,
//                     video_download_hd: $('#results-list > div:nth-child(2) > div.download > a').attr('href'),
//                     wm: $('#results-list > div:nth-child(3) > div.download > a').attr('href'),
//                     audio: $('#results-list > div:nth-child(4) > div.download > a').attr('href'),
//                     data: {
//                         author_id: meta.authorMeta.nickName,
//                         author_name: meta.authorMeta.nickName,
//                         like_count: meta.diggCount,
//                         create_time: moment(meta.createTime).calendar(),
//                         share_count: meta.shareCount,
//                         text: meta.text
//                     }
//                 }
//                 resolve(result);
//             })
//             .catch(e => {
//                 // const $ = cheerio.load(data)
//                 // const result = {
//                 //     success: true,
//                 //     status: 200,
//                 //     video_download_hd: $('#results-list > div:nth-child(2) > div.download > a').attr('href'),
//                 //     wm: $('#results-list > div:nth-child(3) > div.download > a').attr('href'),
//                 //     audio: $('#results-list > div:nth-child(4) > div.download > a').attr('href'),
//                 //     data: {
//                 //         author_id: "-",
//                 //         author_name: "-",
//                 //         like_count: "-",
//                 //         create_time: "-",
//                 //         share_count: "-",
//                 //         text: "-"
//                 //     }
//                 // }
//                 resolve(e);
//             })
//         })
//         .catch(e => {
//             resolve({ status: false, message: 'error fetch data', e: e })
//         })
//     })
// }

module.exports = async url => {
    return new Promise(function (resolve, reject) {
        Axios.post(`https://api.tikmate.app/api/lookup?url=${url}`).then(data => {
            const u = data.data
            const result = {
                success: true,
                status: 200,
                video_download_hd: `https://tikmate.app/download/${u.token}/${u.id}.mp4?hd=1`,
                data: u,
            }
            resolve(result)
        }).catch(err => {
            resolve(err)
        })
    })
}