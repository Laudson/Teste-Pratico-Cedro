'use strict';

angular.module('TesteCedro')
    .controller('pratosController', ['$scope', 'pratosService', 'restauranteService', '$state', '$timeout', function ($scope, pratosService, restauranteService, $state, $timeout) {
        var vm = this;
        vm.dadosCarregados = false;
        vm.lista = [];
        vm.filtro = {};
        vm.titulo = "Pratos";

        //Pesquisar
        vm.pesquisar = function () {
            pratosService.query({ NomePrato: vm.filtro.NomePrato }, function (data) {
                vm.lista = data;
                vm.dadosCarregados = true;
            });
        };

        //Incluir
        vm.incluir = function () {
            $state.go('views.editarPrato', { codigo: 0 });
        };

        //Editar
        vm.editar = function (item) {
            $state.go('views.editarPrato', { codigo: item.idPratos });
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
                    item.$delete({id: item.idPratos},function (data) {
                        if (data.erro)
                            return swal({ title: data.mensagemErro, type: "error" });

                        vm.lista = _(vm.lista).filter(function (i) { return i.idPratos != item.idPratos });

                        swal.close();
                    });
                });
        };

        //Obter dados
        vm.obter = function (codigo) {
            if (codigo > 0) {
                pratosService.get({ codigo: codigo }, function (data) {
                    vm.entidade = data;
                    vm.carregarDados();
                });
            }
            else {
                vm.entidade = {
                    nomePrato: ''
                };
                vm.carregarDados();
            }
        };


        //Carrega Restaurante

        vm.carregarDados = function () {

            vm.entidade.restaurante = [];

            restauranteService.query({}, function (data) {
                if (data.erro)
                    return swal({ title: data.mensagemErro, type: "error" });
                vm.entidade.restaurante = data;
            });
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

            dados.idPratos = vm.entidade.idPratos;
            dados.idRestaurante = vm.entidade.idRestaurante;
            dados.nomePrato = vm.entidade.nomePrato;

            pratosService.save(dados, function (data) {
                if (data.erro)
                    return swal({ title: data.mensagemErro, type: "error" });

                swal({ title: 'Prato salvo com sucesso!', type: "success" }, function () {
                    $state.go('views.listaPrato');
                });
            });
        };

        //Cancelar
        vm.cancelar = function () {
            $state.go('views.listaPrato');
        };
        vm.carregar();
    }]);