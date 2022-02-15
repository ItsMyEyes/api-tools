const cheerio = require('cheerio');
const { default: axios } = require('axios');

module.exports = () => {
    const url = [
        "https://wallpapercave.com/hd-spiderman-no-way-home-wallpapers",
        "https://wallpapercave.com/pink-bunny-aesthetic-wallpapers",
        "https://wallpapercave.com/tokyo-revengers-takemichi-wallpapers",
        "https://wallpapercave.com/lamborghini-countach-lpi-800-4-wallpapers",
        "https://wallpapercave.com/demon-slayer-kimetsu-no-yaiba-4k-wallpapers",
        "https://wallpapercave.com/dark-library-wallpapers",
        "https://wallpapercave.com/dark-city-desktop-wallpapers",
        "https://wallpapercave.com/dark-emoji-wallpapers",
        "https://wallpapercave.com/dark-japan-wallpapers"
    ];
    const choice = Math.floor(Math.random() * url.length);  
    return new Promise(function (resolve, reject) {
        axios.get(url[choice], (res) => {
            const $ = cheerio.load(res.data)
            const panjang = $('a.wpinkw').length
            const choice2 = Math.floor(Math.random() * panjang);
            const url_default = "https://wallpapercave.com"
            const image = `${url_default}${$('a.wpinkw')[choice2].attribs.href}.jpg`
            resolve(image)
        })
    })
}