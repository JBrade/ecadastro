'use strict'

angular
    .module('ecadastro', ['firebase', 'ngRoute'])
    .config(function($routeProvider) {

		// If a route other than status is requested,
		// go to the auth route
		$routeProvider.otherwise('/cadastro');

        $routeProvider

            .when('/', {
                templateUrl: 'views/cadastro.html',
                controller: 'cadastroController'
            })
            .when('/login', {
                templateUrl : 'views/cadastro.html',
                controller: 'cadastroController'
            })
            .when('/registro', {
                templateUrl : 'views/cadastro.html',
                controller: 'cadastroController'
            })
            .when('/cadastros', {
                templateUrl : 'views/cadastro.html',
                controller: 'cadastroController'
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
            $firebaseObject($firebaseRef.default.child('inscricoes'))
                .$ref()
                .orderByChild('CPF').equalTo(inscricao.CPF)
                .once('value', function(snap) {
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
