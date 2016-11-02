(function(angular) {

    'use strict'

    angular
        .module('ecadastro', [
            'ngRoute',
            'ngMaterial',

            'firebase',
            'ui.utils.masks'
        ])
        .config(function($firebaseRefProvider) {
            $firebaseRefProvider.registerUrl('https://ecadastro-b9df0.firebaseio.com');
        })
        .config(function($provide) {
            $provide.decorator('$firebaseArray', function($delegate, $window) {
                var add = $delegate.prototype.$add;
                $delegate.prototype.$add = function(newData) {
                    newData.dataehora = firebase.database.ServerValue.TIMESTAMP;
                    return add.call(this, newData);
                };

                return $delegate;
            });
        });

})(angular);
