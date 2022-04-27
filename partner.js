const ce = require('./gen')
const yargs = require('yargs');
const load =  require('loading-cli');
const db = require('./models')
const ip = require('ip')
const bcrypt = require('bcrypt')

let ini = load({
    "text":"Generate!!",
    "color":"yellow",
    "interval":100,
    "stream": process.stdout,
    "frames":["🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "]
})

let options = yargs
 .usage("Usage: -n <name partner>")
 .option("n", { alias: "username", describe: "name partner", type: "string", demandOption: true })
 .option("e", { alias: "email", describe: "email partner", type: "string", demandOption: true })
 .option("p", { alias: "password", describe: "password partner", type: "string", demandOption: true })
 .argv;

gen();

async function gen() {
    ini.start()
    const { email, username, password } = options

    const validationEmail = await db.users.findOne({
        where:{ 
            email: email 
        },
    })

    const validationUsername = await db.users.findOne({
        where:{ 
            username: username 
        },
    })

    const admin = await db.users.findOne({
        where:{ 
            username: 'admin' 
        },
    })

    if (validationEmail) {
        ini.stop()
        return console.log('email has been used, please use another email') 
    }

    if (validationUsername) {
        ini.stop()
        return console.log('username has been used, please use another username')   
    }

    const done = await db.users.create({
        'email': email,
        'password': await bcrypt.hash(password, 15),
        'name': username,
        'username': username,
    })

    if (done) {
        db.logs.create({
            doing: 'make new users',
            ip_client: ip.address(),
            status: 'success',
            id_user: admin.id
        })
        console.log('You are done make new users')
        ini.stop()
    }
}