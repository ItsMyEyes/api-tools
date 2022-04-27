const axios = require('axios')
const moment = require('moment')

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
        cookie: `sessionid=52085861546:trq97msg4EBdl7:28; ds_user_id=52085861546`
    })
}

const isSlider = (el) => {
    return typeof(el.carousel_media) !== 'undefined';
}

const isVideo = (el) => {
    return typeof(el.video_versions) !== 'undefined';
}

const userFetch = user => {
    return {
        id: user.id,
        username: `@${user.username}`,
        name: user.full_name == '' ? "No name" : user.full_name,
        bio: user.biography ? user.biography : null, 
        url_external: user.external_url ? user.external_url : null,
        private: user.is_private,
        profile_pic: user.profile_pic_url_hd ? user.profile_pic_url_hd : user.profile_pic_url,
        followers: user.edge_followed_by ? user.edge_followed_by.count : "cant detect followers :)",
        following: user.edge_follow ? user.edge_follow.count : "cant detect following :)",
        post: user.edge_owner_to_timeline_media ? user.edge_owner_to_timeline_media.count : "cant detect post :)"
    }
}

exports.getStory = async (url, uid) => {
    return new Promise(async (resolve, reject) => {
        if (url.indexOf("stories") === -1 && !uid) return resolve({ message: "Not valid url story", status: false })
        const valid = url.indexOf('www.instagram.com')
        const re =  valid ? 'https://www.instagram.com' : 'https://instgram.com'
        const sp = url.split(re)[1].split('/')
        let stid = sp[3]
        axios.get(`https://i.instagram.com/api/v1/feed/user/${uid}/story/`, {
            headers: getHeaders(defaultHeaders)
        })
        .then(async data => {
            const reel = data.data.reel;
            const item = reel.items
            item.forEach(el => {
                if (el.pk == stid) {
                    resolve({
                        status: true,
                        who: el.user,
                        source: typeof(el.video_versions) == 'undefined' ? el.image_versions2.candidates[0] : el.video_versions[0]
                    })
                    return;
                }
            });
        }).catch(err => {
            resolve(err)
            resolve({ message: "Instagram / Story cant to get, like iam get him", status: false })
        })
    })
}

exports.getStoryUser = async (uid) => {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://i.instagram.com/api/v1/feed/user/${uid}/story/`, {
            headers: getHeaders(defaultHeaders)
        })
        .then(async data => {
            const reel = data.data.reel;
            const item = reel.items
            let sr = Array();
            item.forEach(el => {
                sr.push({ url: typeof(el.video_versions) == 'undefined' ? el.image_versions2.candidates[0] : el.video_versions[0]})
            });
            resolve({
                status: true,
                who: reel.items[0].user,
                source: sr
            })
        }).catch(err => {
            resolve({ message: "Instagram Story cant to get, like iam get him", status: false })
        })
    })
}

/**
*
 * @param  {Object} username  something like `https://instagram.comm/{username}` or just username
 * @return {Object}
 *
 */
exports.scrapeUser = username => {
    let code = username;
    const validUrl = username.indexOf('instagram.com') !== -1;
    if (validUrl) {
        const re =  username.indexOf('www.instagram.com') !== -1 ? 'https://www.instagram.com' : 'https://instagram.com'
        code = username.split(re)[1].split('/')[1]
    }
    
    return new Promise(function (resolve, reject) {
        axios.get(`https://www.instagram.com/${code}/?__a=1`, {
            headers: getHeaders(defaultHeaders)
        }).then(data => {
            const d = data.data
            const user = d.graphql.user
            resolve({
                status: true,
                result: userFetch(user)
            })
        }).catch(err => {
            console.log(err)
            resolve({
                status: false,
                message: "username Cant Find",
            })
        })
    })
}



/**
*
 * @param  {Object} url something like `https://instagram.comm/p/{url_post}` or just code post
 * @return {Object}
 *
 */
exports.scappingPosting = url => {
    const valid = url.indexOf('instagram.com') !== -1

    return new Promise(function (resolve, reject) {
        if (!valid) return resolve({status: false,message: "not valid url"})
        const re =  url.indexOf('www.instagram.com') !== -1 ? 'https://www.instagram.com' : 'https://instgram.com'
        const code = url.split(re)[1].split('/')[2];
        axios.get(`https://www.instagram.com/p/${code}/?__a=1`, {
            headers: getHeaders(defaultHeaders)
        })
        .then(async data => {
            let s = Array();
            const content = data.data.items[0];
            if (isSlider(content)) {
                content.carousel_media.forEach(el => {
                    s.push({
                        url: el.image_versions2.candidates[0].url
                    })
                });
            } else if (isVideo(content)) {
                s.push({
                    url: content.video_versions[0].url
                })
            } else {
                s.push({
                    url: content.image_versions2.candidates[0].url
                })
            }
            const like = content.like_count
            const code = content.code
            const caption = content.caption ? content.caption.text : "no caption"
            const owner = userFetch(content.user)
            const upload_at = moment(content.taken_at * 1000).format('LLLL')
            const human_read = moment(content.taken_at * 1000).calendar()
            const result = {
                code_post: code,
                user: owner,
                caption: caption,
                source: s,
                likes: like,
                at: upload_at,
                read_time: human_read
            }
            resolve({
                status: true,
                ...result
            })
        })
    })
}

