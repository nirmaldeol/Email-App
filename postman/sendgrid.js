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
    var newdata = '';
    console.log(emailData);
    console.log(emailData.personalizations[0]);


    // return rp.post({
    //     url: sendGridConfig.url,
    //     json: true,
    //     resolveWithFullResponse: true,
    //     headers: sendGridConfig.headers,
    //     body: emailData
    // })
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

    if (data.cc.length > 0) {
        mailData.personalizations[0].cc = [];
        data.cc.forEach(function(email) {
            var emailObj = { email: email };
            mailData.personalizations[0].cc.push(emailObj);
        });
    }


    if (data.bcc.length > 0) {
        mailData.personalizations[0].bcc = [];
        data.bcc.forEach(function(email) {
            var emailObj = { email: email };
            mailData.personalizations[0].bcc.push(emailObj);
        });
    }


    if (data.message == '') {
        mailData.content[0].value = "Empty Message Body";
    }

    return mailData;
};


module.exports = sendgrid;