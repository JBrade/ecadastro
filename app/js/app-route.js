(function(angular) {

    'use strict'

    angular
        .module('ecadastro')
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
    	});

})(angular);
