var rp = require('request-promise');
var mailgun = {};

var MAILGUN_KEY = process.env.MAILGUN_KEY;
var MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
var mailGunConfig = {
    url: 'https://api.mailgun.net/v3/' + MAILGUN_DOMAIN + '/messages',
    headers: {
        "Authorization": "Basic " + new Buffer('api' + ":" + MAILGUN_KEY).toString("base64"),
        'Content-Type': ' application/x-www-form-urlencoded'
    }
};


mailgun.send = function(data) {
    var mailData = MailGunData(data);
    return rp.post({
        url: mailGunConfig.url,
        json: true,
        resolveWithFullResponse: true,
        headers: mailGunConfig.headers,
        form: mailData
    })
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