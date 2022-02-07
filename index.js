require('dotenv').config();
const express = require('express');
const cors = require('cors');
const categoriesRouter = require('./routes/categories');
const goodsRouter = require('./routes/goods');

const app = express();
const  LISTEN_PORT = 3003;

//app.use(cors);
//app.options('*', cors);
app.use(express.json());
app.use('/api/categories', categoriesRouter);
app.use('/api/goods', goodsRouter);

function start(){
    try {
        app.listen(LISTEN_PORT)
    }catch (e) {
        console.log(e)
    }
}

start()