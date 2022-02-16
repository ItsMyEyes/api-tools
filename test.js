const axios = require('axios').default
const defaultHeaders = {
    'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'x-ig-app-id': '936619743392459',
    'x-ig-www-claim': 'hmac.AR0A6WzcCoXWstKAUuy1gRbCQFUs8FoZCp3ap2UMk_KQNBSH',
}
  
const getHeaders = (headers) => {
    return Object.assign(headers, {
        cookie: `sessionid=52085861546:XXOhMZwjJI3lVP:27; ds_user_id=52085861546`
    })
}
axios.get(`https://i.instagram.com/api/v1/feed/user/360442074/story/`, {
    headers: getHeaders(defaultHeaders)
})
.then(async data => {
    const reel = data.data.reel;
    const item = reel.items
    let sr = Array();
    item.forEach(el => {
        sr.push({ url: typeof(el.video_versions) == 'undefined' ? el.image_versions2.candidates[0] : el.video_versions[0]})
    });
    console.log({
        status: true,
        who: reel.items[0].user,
        source: sr
    })
}).catch(err => {
    console.log(err)
    console.log({ message: "Instagram / Story cant to get, like iam get him", status: false })
})