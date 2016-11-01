(function() {

    'use strict'

    angular.module('ecadastro')
        .controller('LoginIncluirController', LoginIncluirController);

    var LoginIncluirController = function($scope, $firebaseRef, $firebaseAuth) {
        var authObj = $firebaseAuth($firebaseRef.default.$ref);
        $scope.Incluir = incluir

        // -------------------------------------------------------------------

        function incluir(usuario) {
            authObj.$createUserWithEmailAndPassword(usuario.Email, usuario.Senha).then(function(userData) {
                console.log("User " + userData.uid + " created successfully!");
            });
        };

    };

})(angular);