'use strict'

angular
    .module('ecadastro', ['firebase', 'ngRoute', 'ngMaterial', 'ui.utils.masks'])
    .config(function($routeProvider) {

		$routeProvider.otherwise('/');

        $routeProvider

            .when('/', {
                templateUrl: 'views/inscricao-incluir-view.html',
                controller: 'InscricaoIncluirController'
            })
            .when('/login', {
                templateUrl : 'views/login-view.html',
                controller: 'LoginController'
            })
            .when('/login/incluir', {
                templateUrl : 'views/login-incluir-view.html',
                controller: 'LoginIncluirController'
            })
            .when('/inscricao/listar', {
                templateUrl : 'views/inscricao-listar-view.html',
                controller: 'InscricaoListarController'
            });
	})
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
    .factory('LoginService', LoginService)
    .controller('InscricaoIncluirController', function($scope, $filter, $mdDialog, $firebaseArray, $firebaseObject, $firebaseRef) {
        var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes'));

        $scope.Limpar = limpar
        $scope.Cadastrar = cadastrar;
        $scope.DesabilitaSalvar = desabilitaSalvar;

        // -------------------------------------------------------------------

        function alerta(titulo, mensagem) {
            var alert = $mdDialog.alert({
                title: titulo,
                textContent: mensagem,
                ok: 'Ok'
            });

            $mdDialog.show(alert);
        }

        function desabilitaSalvar(inscricaoForm) {
            return !inscricaoForm.$valid;
        };
        function limpar(inscricaoForm) {
            $scope.inscricao = null;
            $scope.inscricao = angular.copy({});
            $scope.inscricaoForm.$setPristine();
        };
        function cadastrar(inscricao) {
            $firebaseObject($firebaseRef.default.child('inscricoes'))
                .$ref()
                .orderByChild('CPF').equalTo(inscricao.CPF)
                .once('value', function(snap) {
                    if (snap.val() === null) {
                        inscricao.DataDeNascimento = $filter('date')(inscricao.DataDeNascimento, "dd/MM/yyyy");
                        inscricoes.$add(inscricao).then(function(result) {
                            alerta('Confirmação de cadastro', 'Cadastro foi efetuado com sucesso!');
                            $scope.inscricao = null;
                            // console.log('Usuário cadastrado com sucesso.');
                        });
                    } else {
                        alerta('Cadastro não efetuado', 'CPF já cadastrado.');
                        $scope.inscricao = null;
                    };
                });
        };

    })
    .controller('InscricaoListarController', function($scope, $firebaseArray, $firebaseRef) {
        var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes').orderByChild('Nome'));

        $scope.Inscricoes = inscricoes;

        // -------------------------------------------------------------------
    });

    function LoginService($firebaseRef, $firebaseAuth) {
        return $firebaseAuth($firebaseRef.default);
    };
