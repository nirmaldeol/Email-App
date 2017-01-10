angular.module('emailApp').service('emailService', emailService);

function emailService($http) {



    this.submit = function(data) {
        var emailData = getEmailData(data);
        return $http({
            method: 'POST',
            url: '/email',
            data: emailData, //forms user object
            headers: { 'Content-Type': 'application/json' }
        });
    }

    function getEmailData(mail) {
        var emailData = {};
        emailData.from = mail.from;
        emailData.to = pushMails(mail.to);
        emailData.cc = pushMails(mail.cc);
        emailData.bcc = pushMails(mail.bcc);
        emailData.message = mail.message;
        emailData.subject = mail.subject;
        emailData.security = mail.security;
        return emailData;
    }


    function pushMails(emails) {
        var local = [];
        if (emails.length > 0) {
            var emailarray = emails.split(",")
            emailarray.forEach(function(email) {
                local.push(email.trim());
            });
        }

        return local;
    }




};

emailService.$inject = ['$http'];