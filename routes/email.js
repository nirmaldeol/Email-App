var express = require('express');
var router = express.Router();
var validator = require('../postman/validator');
var sendEmail = require('../postman/index');




router.post('/', function(request, response) {
    var error = validator(request.body);
    if (error.err) {
        response.status(400).json({ title: 'Bad Request', err: error.des });
    } else {
        sendEmail(request.body).then(res => {
            var message = "Your email was succesfully sent";
            response.status(res.statusCode).send(message);
        }).catch(err => {
            var error = "Email servers are down at this moment, Please try again laters";
            response.status(err.statusCode).send(error);
        })

    }



});

module.exports = router;