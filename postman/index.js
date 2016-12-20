var mailgun = require('./mailgun');
var sendgrid = require('./sendgrid');





module.exports = function(data) {

    // return new Promise(function(resolve, reject) {
    //     sendgrid.send(data).then(resp => {
    //         resolve(resp);
    //     }).catch(err => {
    //         mailgun.send(data).then(res => {
    //             resolve(res);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // });
};