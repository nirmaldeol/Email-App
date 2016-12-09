angular.module('emailApp').component('emailSend', {
    templateUrl: '/js/comp/email.html',
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
    em.success = '';
    em.error = '';
    em.sent = false;
    em.notSent = false;


    em.reset = function() {
        em.mail = angular.copy(defaultForm);
        $scope.emailForm.$setPristine();
        em.notSent = false;
        em.sent = false;
    }
    em.onSubmit = function() {
        emailService.submit(em.mail).then(function(data) {
            em.sent = true;
            em.success = data.message;
            em.reset();
        }, function(err) {
            console.log(err.data)
            em.error = err.data;
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




emailSendCtrl.$inject = ['$scope', 'emailService'];