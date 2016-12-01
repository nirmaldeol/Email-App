var express = require('express');
var router = express.Router();
var sendEmail = require('../postman/index');




router.post('/', function(request, response) {
    sendEmail(request.body).then(res => {
        var success = { statusCode: res.statusCode, message: "Your email was succesfully sent" }
        response.status(res.statusCode).send(success);
    }).catch(err => {
        var error = { error: "Email servers are down at this moement, Please try again in some time" }
        response.status(err.statusCode).send(error);
    })
});

module.exports = router;