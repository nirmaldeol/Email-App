var rp = require('request-promise');
var sendgrid = {};




var SENDGRID_KEY = process.env.SENDGRID_KEY;
var sendGridConfig = {
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
        'Authorization': "Bearer " + SENDGRID_KEY,
        'Content-Type': 'application/json'
    }
};



sendgrid.send = function(data) {
    var emailData = SendGridData(data);
    return rp.post({
        url: sendGridConfig.url,
        json: true,
        resolveWithFullResponse: true,
        headers: sendGridConfig.headers,
        body: emailData
    })
};





function SendGridData(data) {
    var mailData = {
        personalizations: [{ to: [] }],
        from: { email: data.from },
        subject: data.subject,
        content: [{ type: 'text/plain', value: data.message }]
    };

    data.to.forEach(function(email) {
        var emailObj = { email: email }
        mailData.personalizations[0].to.push(emailObj);
    }, this);
    if (data.cc[0] !== '') {
        data.cc.forEach(function(email) {
            var emailObj = { email: email };
            mailData.personalizations[0].cc = [];
            mailData.personalizations[0].cc.push(emailObj);
        }, this);
    } else if (data.bcc[0] !== '') {
        data.bcc.forEach(function(bccemail) {
            var emailObj = { email: email };
            mailData.personalizations[0].bcc = [];
            mailData.personalizations[0].bcc.push(emailObj);
        }, this);
    }
    if (data.message == '') {
        mailData.content[0].value = "Empty Message Body";
    }

    return mailData;
};


module.exports = sendgrid;