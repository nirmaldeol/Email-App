var mailgun = require('./mailgun');
var sendgrid = require('./sendgrid');
var fs = require('fs');




module.exports = function(data) {
    return new Promise(function(resolve, reject) {
        sendgrid.send(data).then(resp => {
            fs.writeFile('./data.json', JSON.stringify(resp, null, 2), 'utf-8');
            resolve(resp);
        }).catch(err => {
            fs.appendFile('./data.json', JSON.stringify(err, null, 2), 'utf-8');
            mailgun.send(data).then(res => {
                fs.appendFile('./data.json', JSON.stringify(res, null, 2), 'utf-8');
                resolve(res);
            }).catch(err => {
                reject(err);
                fs.appendFile('./data.json', JSON.stringify(err, null, 2), 'utf-8');

            });
        });



    });
};