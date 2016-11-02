(function(angular) {

    'use strict'

    angular.module('ecadastro')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'LoginService'];
    function LoginController($scope, $location, LoginService) {
        $scope.Login = login;

        // -------------------------------------------------------------------

        function login(usuario) {
            LoginService.LogIn(usuario).then(function() {
                console.log("Usuario logado com sucesso.");
                $location.path('/inscricao/listar');
            });
	    };
    };

})(angular);
