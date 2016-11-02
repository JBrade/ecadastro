(function() {

    'use strict'

    angular.module('ecadastro')
        .controller('InscricaoListarController', InscricaoListarController);

        InscricaoListarController.$inject = ['$scope', '$firebaseArray', '$firebaseRef', '$location', 'LoginService'];
        function InscricaoListarController($scope, $firebaseArray, $firebaseRef, $location, LoginService) {
            var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes').orderByChild('Nome'));

            $scope.Inscricoes = inscricoes;
            $scope.Sair = sair;
            $scope.Email = LoginService.UsuarioAutenticado() ? LoginService.GetUsuario().email : 'Usuário não autenticado';

            // -------------------------------------------------------------------

            function sair() {
                LoginService.LogOut().then(function() {
                    console.log('deslogado!');
                    $location.path('/');
                });
            };
        };

})(angular);
