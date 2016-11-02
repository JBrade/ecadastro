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
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('teal');
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
    .controller('InscricaoListarController', function($scope, $firebaseArray, $firebaseRef) {
        var inscricoes = $firebaseArray($firebaseRef.default.child('inscricoes').orderByChild('Nome'));

        $scope.Inscricoes = inscricoes;

        // -------------------------------------------------------------------
    });


    function LoginService($firebaseRef, $firebaseAuth) {
        return $firebaseAuth($firebaseRef.default);
    };
