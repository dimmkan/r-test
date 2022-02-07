const router = require('express').Router();
const goodsController = require('../controllers/goods');
const {body, validationResult} = require('express-validator');



module.exports = router