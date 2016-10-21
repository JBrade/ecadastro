'use strict'

angular
    .module('ecadastro', ['firebase', 'ngRoute', 'ngMaterial'])
    .config(function($routeProvider) {

		$routeProvider.otherwise('/');

        $routeProvider

            .when('/', {
                templateUrl: 'views/cadastro-incluir-view.html',
                controller: 'CadastroIncluirController'
            })
            .when('/login', {
                templateUrl : 'views/login-view.html',
                controller: 'LoginController'
            })
            .when('/login/incluir', {
                templateUrl : 'views/login-incluir-view.html',
                controller: 'LoginIncluirController'
            })
            .when('/cadastro/listar', {
                templateUrl : 'views/cadastro-listar-view.html',
                controller: 'CadastroListarController'
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
    .controller('CadastroIncluirController', function($scope, $firebaseArray, $firebaseObject, $firebaseRef) {
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

    })
    .factory('LoginService', LoginService)
    .controller('LoginController', function($scope, LoginService) {
        var vm = this;
        var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes'));

		vm.login = login;

        // -------------------------------------------------------------------

        function login() {
			LoginService.$authWithPassword(vm.Usuario).then(function(data) {
				vm.usuario =  null;
				console.log('logado');
			}).catch(function(error) {
				console.log(error);
			});
		};

    })
    .controller('LoginIncluirController', function($scope, $firebaseArray, $firebaseObject, $firebaseRef) {
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

    })
    .controller('CadastroListarController', function($scope, $firebaseArray, $firebaseObject, $firebaseRef) {
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

    function LoginService($firebaseRef, $firebaseAuth) {
        return $firebaseAuth($firebaseRef.default);
    };
