var express = require('express');
var router = express.Router();
var mailgun = require('../postman/mailgun');
var sendgrid = require('../postman/sendgrid');



router.get('/', function(req, res) {
    res.render('index', { title: "testin api" });
});

module.exports = router;