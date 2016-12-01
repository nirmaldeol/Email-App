angular.module('emailApp').service('emailService', emailService);

function emailService($http) {
    this.checkEmails = function checkEmails(emails) {
        var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid;
        if (emails) {
            var array = emails.split(",");
            array.forEach(function(email) {
                if (!regx.test(email.trim())) {
                    valid = true;
                } else {
                    valid = false;
                }
            })
        }
        return valid;
    };

    this.getEmailData = function(mail) {
        var emailData = {};
        emailData.from = mail.from;
        emailData.to = pushMails(mail.to);
        emailData.cc = pushMails(mail.cc);
        emailData.bcc = pushMails(mail.bcc);
        emailData.message = mail.message;
        emailData.subject = mail.subject;
        return emailData;
    }


    function pushMails(emails) {
        var local = [];
        var emailarray = emails.split(",")
        emailarray.forEach(function(email) {
            local.push(email.trim());
        });
        return local;
    }




};

emailService.$inject = ['$http'];