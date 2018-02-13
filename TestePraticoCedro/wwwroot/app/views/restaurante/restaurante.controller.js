'use strict';

angular.module('TesteCedro')
    .controller('restauranteController', ['$scope', 'restauranteService', '$state', '$timeout', function ($scope, restauranteService, $state, $timeout) {
        var vm = this;
        vm.dadosCarregados = false;
        vm.lista = [];
        vm.filtro = {};
        vm.titulo = "Restaurantes";

        //Pesquisar
        vm.pesquisar = function () {
            restauranteService.query({NomeRestaurante: vm.filtro.nomeRestaurante}, function (data) {
                vm.lista = data;
                vm.dadosCarregados = true;
            });
        };

        //Incluir
        vm.incluir = function () {
            $state.go('views.editarRestaurante', { codigo: 0 });
        };

        //Editar
        vm.editar = function (item) {
            $state.go('views.editarRestaurante', { codigo: item.idRestaurante });
        };

        //Excluir
        vm.excluir = function (item) {
            swal({
                title: "Deseja excluir este registro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, continuar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            },
                function () {
                    item.$delete({ id: item.idRestaurante }, function (data) {
                        if (data.erro)
                            return swal({ title: data.mensagemErro, type: "error" });

                        vm.lista = _(vm.lista).filter(function (i) { return i.idRestaurante != item.idRestaurante });

                        swal.close();
                    });
                });
        };

        //Obter dados
        vm.obter = function (codigo) {
            if (codigo > 0) {
                restauranteService.get({ codigo: codigo }, function (data) {
                    vm.entidade = data;
                });
            }
            else {
                vm.entidade = {
                    nomeRestaurante: ''
                };
            }
        };

        //Carregar
        vm.carregar = function () {
            if ($state.params.codigo)
                vm.obter($state.params.codigo);
            else
                vm.pesquisar();
        };      

        //Salvar
        vm.salvar = function () {
            var dados = {};

            dados.idRestaurante = vm.entidade.idRestaurante;
            dados.nomeRestaurante = vm.entidade.nomeRestaurante;

            restauranteService.save(dados, function (data) {
                if (data.erro)
                    return swal({ title: data.mensagemErro, type: "error" });

                swal({ title: 'Restaurante salvo com sucesso!', type: "success" }, function () {
                    $state.go('views.listaRestaurante');
                });
            });
        };

        //Cancelar
        vm.cancelar = function () {
            $state.go('views.listaRestaurante');
        };
        vm.carregar();
    }]);