const web = require('./index');

// Setting port
let port = process.env.PORT || 8000

// Webserver
web.listen(port, () => console.log(`app listening on ${port}`));