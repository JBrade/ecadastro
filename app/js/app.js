'use strict'

angular
    .module('ecadastro', ['firebase'])
    .config(function($firebaseRefProvider) {
        $firebaseRefProvider.registerUrl('https://ecadastro-b9df0.firebaseio.com');
    })
    .config(function($provide) {
        $provide.decorator('$firebaseArray', function($delegate, $window) {
            var add = $delegate.prototype.$add;

            $delegate.prototype.$add = function(newData) {
                newData.datahora = firebase.database.ServerValue.TIMESTAMP;
                return add.call(this, newData);
            };

            return $delegate;
        });
    })
    .controller('CadastroController', function($scope, $firebaseArray, $firebaseObject, $firebaseRef) {
        var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes'));

        $scope.Limpar = limpar
        $scope.Salvar = salvar;
        $scope.DesabilitaSalvar = desabilitaSalvar;

        // -------------------------------------------------------------------

        function desabilitaSalvar(inscricaoForm) {
            return !inscricaoForm.$valid;
        };
        function limpar(inscricaoForm) {
            $scope.inscricao = null;
            $scope.inscricao = angular.copy({});
            $scope.inscricaoForm.$setPristine();
        };
        function salvar(inscricao) {
            var obj = $firebaseObject($firebaseRef.default.child('inscricoes'));
            var ref = obj.$ref().orderByChild('CPF').equalTo(inscricao.CPF).once('value', function(snap) {
                if (snap.val() === null) {
                    inscricoes.$add(inscricao).then(function(result) {
                        console.log('Usuário cadastrado com sucesso.');
                    });
                } else {
                    console.log('CPF já cadastrado.')
                };
            });
        };
    });
