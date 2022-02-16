const axios = require('axios').default

const url = "https://www.tiktok.com/@spaccer/video/7058349604969991429?is_copy_url=1&is_from_webapp=v1&q=fakegun%20valorant&t=1644655470911"
axios.post(`https://api.tikmate.app/api/lookup?url=${url}`).then(data => {
    const u = data.data
    const result = {
        success: true,
        status: 200,
        video_download_hd: `https://tikmate.app/download/${u.token}/${u.id}.mp4?hd=1`,
        data: u,
    }
    console.log(result)
}).catch(err => {
    console.log(err.response.data)
})