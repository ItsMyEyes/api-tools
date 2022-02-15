const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.urlencoded({ limit: "50mb", extended: false }))
app.use(express.json())
var whitelist = ['http://localhost:8080','https://blog.random.my.id']
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

app.use('/medsos',require('./routes/medsos.route'))
app.use('/tools', require('./routes/tools.route'))

module.exports = app