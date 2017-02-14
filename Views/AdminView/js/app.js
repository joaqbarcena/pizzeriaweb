//Init the app 
var app = angular.module("adminView",[]);

console.log("The app is initializing ... ");


app.factory('OrderService',['$http' , function($http){
    var orders = [];
    var source = new EventSource('/admin/event');
    var getNotConfirmeds = [];
     
    var sendToConfirm = function(order){
        //$http.post('/admin/:id', order.id);
    };
    
    return{
        
        NotConfirmeds : function(callbacka){
                $http.get('/admin/getNotConfirmed').then(
                    callbacka,
                    function(err){
                        console.log("Was an error !!!");
                    }
                );
        },
        
        getOrders : function(callback){
                source.addEventListener('message', callback , false);
        },
        
        confirm   : sendToConfirm
    };
    
}]);

app.controller("adminController", //nombre del controller declarado en ng-controller
               [ '$scope' , 'OrderService', // Pide los objetos que necesita como parametros en la funcion contigua
                 function($scope ,OrderService){
                    $scope.orders        = [];
                    $scope.notconfirmeds = [];
                    $scope.notconfirmeds = OrderService.NotConfirmeds(function(response){
                                                    $scope.notconfirmeds = response.data;
                                            }); 
                     
                    $scope.incoming      = OrderService.getOrders(
                                                function(msg){
                                                    row = JSON.parse(msg.data);
                                                    $scope.$apply(function () {
                                                        $scope.notconfirmeds.push(row);
                                                    });
                                                    console.log('Algo llego !');
                                                    console.dir(msg.data);
                                                }
                                            );
                     
                    $scope.fireConfirmer = showConfirmator;
                     
                    $scope.confirm       =  function(order){
                                                    $('#confirmator').modal('close');
                                                    Toast("El pedido esta siendo confirmado ...");
                                                    OrderService.confirm(order);
                                            };
                 }
               ]
);

var showConfirmator = function(order){
    $('#confirmator').modal('open');
};


//--------------------------------------- Models --------------------------------------------
                     
var orderModel =  { 
        name      : "", 
        address   : "",
        celNumber : "",
        payWith   : null,
        total     : 0,
        items : [],
        additionalFields : {
            additionalNote : ""
        }
};

var itemBag = {
        "name"     : "",
        "quantity" : 0
};

                     
//------------------------------------------ Toast ----------------------------------------

function Toast(msg){
    Materialize.toast(msg, 3000);    
}


$(document).ready(function(){
    $('.modal').modal();
});