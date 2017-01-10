var express = require('express');
var router = express.Router();
var validator = require('../postman/validator');
var sendEmail = require('../postman/index');




router.post('/', function(req, res) {
    console.log(req.body)
    var error = validator(req.body);
    if (error.err) {
        res.status(400).json({ title: 'Bad Request', err: error.des });
    } else {
        sendEmail(req.body).then(res => {
            var message = "Your email was succesfully sent";
            response.status(res.statusCode).send(message);
        }).catch(err => {
            var error = "Email servers are down at this moment, Please try again laters";
            response.status(err.statusCode).send(error);
        })

    }



});

module.exports = router;