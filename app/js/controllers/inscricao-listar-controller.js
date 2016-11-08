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

            _agrupaInscricoes();

            // -------------------------------------------------------------------

            function _agrupaInscricoes() {
                inscricoes.$loaded().then(function(snap){
                    $scope.InscricoesAlmoco = snap.filter(function(item) {
                        return item.Almoco === true;
                    });

                    $scope.InscricoesPlenaria1 = snap.filter(function(item) {
                        return item.Plenaria1 === true;
                    });

                    $scope.InscricoesPlenaria2 = snap.filter(function(item) {
                        return item.Plenaria2 === true;
                    });
                });
            }

            function sair() {
                LoginService.LogOut().then(function() {
                    console.log('deslogado!');
                    $location.path('/login');
                });
            };
        };

})(angular);
