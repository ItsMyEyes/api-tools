const axios = require('axios')

module.exports = url => {
    return new Promise(function (resolve, reject) {
        axios.post(`https://api.tikmate.app/api/lookup?url=${url}`).then(data => {
            const u = data.data
            const result = {
                success: true,
                status: 200,
                video_download_hd: `https://tikmate.app/download/${u.token}/${u.id}.mp4?hd=1`,
                data: u,
            }
            resolve(result)
        }).catch(err => {
            reject(err.response.data)
        })
    })
}