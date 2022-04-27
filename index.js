const express = require('express')
const app = express()
const cors = require('cors')
const config = process.env.NODE_ENV !== 'dev' ? './.env' : './.env.local'

require('dotenv').config({
  path: config
});

const db = require("./models");
// db.sequelize.sync({ force: true });
db.sequelize.sync();
app.use(express.urlencoded({ limit: "50mb", extended: false }))
app.use(express.json())
var whitelist = ['http://localhost:8080','https://tools.kiyora-dev.xyz']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback("cors not allowed, dont forget to npc bruh")
    }
  }
}
app.use(cors())

app.get('/', (req,res) => {
  return res.send('ok');
})

app.use('/sosmed',require('./routes/medsos.route'))
app.use('/tools', require('./routes/tools.route'))
app.use('/user', require('./routes/user.route'))

module.exports = app
