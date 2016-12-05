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



function emailSendCtrl($scope, emailService) {
    var em = this;
    em.mail = {
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        message: ''
    };
    var defaultForm = angular.copy(em.mail);
    var checkEmails = emailService.checkEmails;
    em.toInvalid = false;
    em.bccInvalid = false;
    em.ccInvalid = false;
    em.success = 'Your email was successfully sent';
    em.error = 'Your message was not sent. Please try again in sometime';
    em.sent = false;
    em.notSent = false;

    em.onSubmit = function() {
        emailService.submit(em.mail).then(function(data) {
            em.sent = true;
            em.mail = angular.copy(defaultForm);
            $scope.emailForm.$setPristine();
        }, function(err) {
            console.log(err)
            em.notSent = true;
        });
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

function emailAppCtrl() {

}



emailSendCtrl.$inject = ['$scope', 'emailService'];