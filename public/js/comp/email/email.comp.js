angular.module('emailApp').component('emailSend', {
    templateUrl: '/js/comp/email/email.comp.html',
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
    em.success = '';
    em.errors = [];
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
            console.log(data);
            em.reset();
        }, function(err) {
            console.log(err)
            em.errors = err.data.err;
            em.notSent = true;

        });
    }

};




emailSendCtrl.$inject = ['$scope', 'emailService'];