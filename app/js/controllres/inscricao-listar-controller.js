(function() {

    'use strict'

    angular.module('ecadastro')
        .controller('InscricaoListarController', InscricaoListarController);

        var InscricaoListarController = function($scope, $firebaseArray, $firebaseRef) {
            var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes').orderByChild('Nome'));
            $scope.Inscricoes = inscricoes;
        };

})(angular);