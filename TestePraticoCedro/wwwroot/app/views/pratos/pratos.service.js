(function(){
    angular.module('TesteCedro')
    .factory('pratosService', ['$resource', function($resource) 
    {
        var resource = $resource('/api/pratos/:codigo', { codigo: "@codigo", NomePrato: "@NomePrato" },
            {
                query: { isArray: true }
            }
        );
        return resource;
    }]);
})();