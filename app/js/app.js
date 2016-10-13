'use strict'

var app = angular.module('ecadastro', ['firebase']);
app.config(function($firebaseRefProvider) {
    $firebaseRefProvider.registerUrl('https://ecadastro-b9df0.firebaseio.com');
});
