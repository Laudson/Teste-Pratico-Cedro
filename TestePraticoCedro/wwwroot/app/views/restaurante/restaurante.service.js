(function(){
    angular.module('TesteCedro')
    .factory('restauranteService', ['$resource', function($resource) 
    {
        var resource = $resource('/api/restaurantes/:codigo', { codigo: "@codigo", NomeRestaurante: "@NomeRestaurante" },
            {
                query: { isArray: true }
            }
        );
        return resource;
    }]);
})();