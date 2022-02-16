const { tiktok } = require('./module')
let url = "https://www.tiktok.com/@spaccer/video/7058349604969991429?is_copy_url=1&is_from_webapp=v1&q=fakegun%20valorant&t=1644655470911"
tiktok(url).then(res => console.log(res)).catch(err => console.log(err))