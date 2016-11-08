(function(angular) {

    'use strict'

    angular.module('ecadastro')
        .controller('InscricaoIncluirController', InscricaoIncluirController);

    InscricaoIncluirController.$inject = ['$scope', '$filter', '$mdDialog', '$firebaseArray', '$firebaseObject', '$firebaseRef'];
    function InscricaoIncluirController($scope, $filter, $mdDialog, $firebaseArray, $firebaseObject, $firebaseRef) {
        var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes'));

        $scope.Cadastrar = cadastrar;
        $scope.DesabilitaSalvar = desabilitaSalvar;
        $scope.Limpar = limpar

        // -------------------------------------------------------------------

        function _alerta(titulo, mensagem) {
            var alert = $mdDialog.alert({
                title: titulo,
                textContent: mensagem,
                ok: 'Ok'
            });

            $mdDialog.show(alert);
        }

        function cadastrar(inscricao) {
            $scope.desabilita = true;
            var dataDeNascimento = $filter('date')(inscricao.DataDeNascimento, "dd/MM/yyyy")
            var idade = $filter('ageFilter')(dataDeNascimento)
            if (idade < 7) {
                _alerta('Data de nascimento inválida.', 'Informe uma data de nascimento válida. Você tem mais de ' +
                idade + ' anos. :)');
                return;
            };
            $firebaseObject($firebaseRef.default.child('inscricoes'))
                .$ref()
                .orderByChild('CPF')
                .equalTo(inscricao.CPF)
                .once('value', function(snap) {
                    if (!snap.exists()) {
                        inscricao.DataDeNascimento = $filter('date')(inscricao.DataDeNascimento, "dd/MM/yyyy");
                        inscricoes.$add(inscricao).then(function(result) {
                            _alerta('Confirmação de cadastro', 'Cadastro foi efetuado com sucesso!');
                            $scope.inscricao = {};
                            $scope.desabilita = false;
                        });
                    } else {
                        _alerta('Cadastro não efetuado', 'CPF já cadastrado.');
                        $scope.desabilita = false;
                    };
                });
        };
        function desabilitaSalvar(inscricaoForm) {
            return !inscricaoForm.$valid;
        };
        function limpar(inscricaoForm) {
            $scope.inscricao = null;
            $scope.inscricao = angular.copy({});
            $scope.inscricaoForm.$setPristine();
        };
    };

})(angular);
