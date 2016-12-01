var mailgun = require('../postman/mailgun');
var sendgrid = require('../postman/sendgrid');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var fs = require("fs");
var request = require("request");

chai.should();
var data = {
    from: 'someone@gmail.com',
    to: ['nirmaldeol@outlook.com'],
    cc: [],
    bcc: [],
    subject: 'subject',
    text: 'body'
};

describe("Emails api tests", function() {
    it("Sendgrid api should send emails ", function() {

        sendgrid.send(data).then(resp => {
            assert.equal(202, response.statusCode);
        });

    });
    it("Mailgrid api should send email ", function() {

        mailgun.send(data).then(resp => {
            assert.equal(200, response.statusCode);
        });



    });

});