var rp = require('request-promise');
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
        to: [],
        cc: [],
        bcc: [],
        subject: data.subject,
        text: data.message
    };

    data.to.forEach(function(email) {
        mailData.to.push(email);
    }, this);

    if (data.cc[0] !== '') {
        data.cc.forEach(function(email) {
            mailData.cc.push(email);
        }, this);
    }
    if (data.bcc[0] !== '') {
        data.bcc.forEach(function(email) {
            mailData.bcc.push(email);
        }, this);
    }
    return mailData
};


module.exports = mailgun;