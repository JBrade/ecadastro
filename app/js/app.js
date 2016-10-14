'use strict'

angular
    .module('ecadastro', ['firebase'])
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

        $scope.inscricao = {
            Nome: 'Darlan Damasio',
            Email: 'damasio34@gmail.com',
            CPF: '05829757788',
            Igreja: 'IBOE'
        };

        $scope.Salvar = salvar;

        // -------------------------------------------------------------------

        function CPFJahCadastrado(a) {

            var uid = "CPF: " + a.CPF;
            var todosRef = $firebaseArray($firebaseRef.default.child('inscricoes').child(uid));
            // var privateTodosRef = todosRef.orderByChild("CPF").equalTo(a.CPF);
            var privateTodos;

            todosRef.on("Value", function(response) {
                console.log(response);
              privateTodos = response.val();
            });

            // var inscricao = $firebaseObject($firebaseRef.default.child('inscricoes'))
            //     .startAt(a.CPF)
            //     .once('value', function(snap) {
            //        console.log('accounts matching email address', snap.val())
            //     });
            //
            //
            // inscricoes.once('Value', function(snapshot) {
            //     if (snapshot.hasChild({'CPF': inscricao.CPF })) {
            //         alert('exists');
            //     }
            // });
            // var existe = inscricoes.orderByChild("CPF").equalTo(inscricao.CPF);
            // console.log(existe);
        };

        function salvar(inscricao) {
            if (CPFJahCadastrado(inscricao)) {

            };

            // inscricoes.$add(inscricao).then(function(result) {
            //     console.log(result);
            // });
        };
    });
