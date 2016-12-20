var rp = require('request-promise');
var validator = require('validator');
var mailgun = {};





var MAILGUN_KEY = process.env.MAILGUN_KEY;


var mailGunConfig = {
    url: 'https://api.mailgun.net/v3/<your domain >/messages',
    headers: {
        "Authorization": "Basic " + new Buffer('api' + ":" + MAILGUN_KEY).toString("base64"),
        'Content-Type': ' application/x-www-form-urlencoded'
    }
};


mailgun.send = function(data) {
    var mailData = MailGunData(data);
    var newdata = '';
    console.log(mailData);
    // return rp.post({
    //     url: mailGunConfig.url,
    //     json: true,
    //     resolveWithFullResponse: true,
    //     headers: mailGunConfig.headers,
    //     form: mailData
    // })
};


function MailGunData(data) {
    var mailData = {
        from: data.from,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        text: data.message
    };

    return mailData
};


module.exports = mailgun;