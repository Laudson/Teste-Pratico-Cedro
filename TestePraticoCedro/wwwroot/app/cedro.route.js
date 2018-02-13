(function () {
    'use strict';

    angular.module('TesteCedro').config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/views/home');

        $stateProvider
            .state('views', {
                //abstract: true,
                url: "/views",
                templateUrl: "app/inicio.html?t=" + $.timestamp
            })
            .state('views.Home', {
                url: "/home",
                templateUrl: "app/views/home/home.html?t=" + $.timestamp,
                data: { pageTitle: 'Home' }
            })
            .state('views.listaRestaurante', {
                url: "/listaRestaurante",
                templateUrl: "app/views/restaurante/listaRestaurante.html?t=" + $.timestamp,
                data: { pageTitle: 'Restaurante' }
            })
            .state('views.editarRestaurante', {
                url: "/editarRestaurante/:codigo",
                templateUrl: "app/views/restaurante/editarRestaurante.html?t=" + $.timestamp,
                data: { pageTitle: 'Restaurante' }
            })
            .state('views.listaPrato', {
                url: "/listaPrato",
                templateUrl: "app/views/pratos/listaPratos.html?t=" + $.timestamp,
                data: { pageTitle: 'Prato' }
            })
            .state('views.editarPrato', {
                url: "/editarPrato/:codigo",
                templateUrl: "app/views/pratos/editarPratos.html?t=" + $.timestamp,
                data: { pageTitle: 'Prato' }
            });
    }
})();
  