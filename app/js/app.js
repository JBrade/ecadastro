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
        .filter('ageFilter', function() {
             function calculateAge(birthday) { // birthday is a date
                 if (!birthday) return 'Não informado';
                 var day = moment(birthday, 'DD/MM/YYYY');
                 return moment().diff(day, 'years');
             }

             return function(birthdate) {
                   return calculateAge(birthdate);
             };
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
