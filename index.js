const app = require('./app');
const  LISTEN_PORT = process.env.LISTEN_PORT || 3003;

function start(){
    try {
        app.listen(LISTEN_PORT)
    }catch (e) {
        console.log(e)
    }
}

start();