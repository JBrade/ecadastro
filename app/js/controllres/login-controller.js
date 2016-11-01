(function() {

    'use strict'

    angular.module('ecadastro')
        .controller('LoginController', LoginController);

        var LoginController = function($scope, $firebaseRef, $firebaseAuth) {

            var authObj = $firebaseAuth($firebaseRef.default.$ref);

            $scope.Login = login;

            // -------------------------------------------------------------------

            function login(usuario) {
                authObj.$signInWithEmailAndPassword(usuario.Email, usuario.Senha).then(function(userData) {
                    console.log("User " + userData.uid + " created successfully!");
                });
		    };
    };

})(angular);