'use strict';

// Declare app level module which depends on views, and components
angular.module('emailApp', []);
angular.module('emailApp').controller('emailAppCtrl', emailAppCtrl);
angular.module('emailApp').component('emailSend', {
    templateUrl: '/js/email.html',
    controller: emailSendCtrl,
    controllerAs: 'em',
    bindings: {

    }
});

function emailAppCtrl() {

}

function emailSendCtrl($scope, $http, emailService) {
    var em = this;
    em.mail = {
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        message: ''
    };
    var checkEmails = emailService.checkEmails;
    var getData = emailService.getEmailData;
    em.toInvalid = false;
    em.bccInvalid = false;
    em.ccInvalid = false;
    em.success = 'Your email was successfully sent';
    em.error = 'Your message was not sent. Please try again in sometime';
    em.sent = false;
    em.notSent = false;

    em.onSubmit = function() {
        var emailData = getData(em.mail);
        $http({
                method: 'POST',
                url: '/email',
                data: emailData, //forms user object
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function(data) {
                if (data.error) {
                    em.notSent = true;

                } else {
                    em.sent = true;
                    $scope.emailForm.$setPristine();

                }
            });


        console.log();

    }



    $scope.$watch('em.mail.to', function(newValue, oldValue) {
        em.toInvalid = checkEmails(em.mail.to);
    });
    $scope.$watch('em.mail.cc', function(newValue, oldValue) {
        em.ccInvalid = checkEmails(em.mail.cc);
    });
    $scope.$watch('em.mail.bcc', function(newValue, oldValue) {
        em.bccInvalid = checkEmails(em.mail.bcc);
    });


};




emailSendCtrl.$inject = ['$scope', '$http', 'emailService'];