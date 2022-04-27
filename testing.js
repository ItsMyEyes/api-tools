const { insta } = require('./module')
const url = 'https://www.instagram.com/stories/rinnmoka/2808522325271456112/'
insta.getStory(url, 4270824994).then(res => { console.log(res) })