(function(angular) {

    'use strict'

    angular.module('ecadastro')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$firebaseRef', '$firebaseAuth'];
    function LoginService($firebaseRef, $firebaseAuth) {
        var auth = $firebaseAuth($firebaseRef.default.$ref);

        var _service = {
           LogIn: logIn,
           LogOut: logOut,
           GetUsuario: getUsuario,
           UsuarioAutenticado: usuarioAutenticado
        };

        return _service;

        // Implementação

        function logIn(usuario) {
            return auth.$signInWithEmailAndPassword(usuario.Email, usuario.Senha);
        };
        function logOut() {
            return auth.$signOut();
        };
        function getUsuario() {
            return auth.$getAuth()
        };
        function usuarioAutenticado() {
            return this.GetUsuario();
        };
    };

})(angular);
