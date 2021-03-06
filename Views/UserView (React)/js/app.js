//Init the app 
var app = angular.module("userOrder",[]);

console.log("The app is initializing ... ");
//add a Controller to app

app.controller("orderController", //nombre del controller declarado en ng-controller
               [ '$scope' ,  // Pide los objetos que necesita como parametros en la funcion contigua
                 function($scope){
                     
                     //-------- init items --------
                     addQuantityField(fromServerItems);
                     
                     $scope.order      = orderModel  ;
                     $scope.sendOrder  = submitOrder ;
                     $scope.items      = fromServerItems     ;
                     $scope.increment  = incrementItemCounter;
                     $scope.decrement  = decrementItemCounter;
                     $scope.addItem    = putItem     ;
                     $scope.removeItem = removeItem  ;
                 }
               ]
);

                     
var submitOrder = function(order){
    //send AJAX to server with the order
    console.log("The order will send with data : ");
    console.dir(order);
};

var incrementItemCounter = function(item){
    item.quantity += 1;
};
                     
var decrementItemCounter = function(item){
    if(item.quantity <= 0) { item.quantity = 0; }
    else{ item.quantity -= 1; }
};

var putItem = function(item , order){
    
    var result = findByName(item.name , order);
    var itemBag;
    
    if( result === undefined){
        
        itemBag = {
            "name"     : item.name,
            "quantity" : 1
        };
        
        order.items.push(itemBag);
        
    }else{
        
        var index = order.items.indexOf(result);
        itemBag = order.items[index];
        itemBag.quantity += 1;
    
    }
    
    item.quantity = itemBag.quantity;
    
    console.log("The order now : ");
    console.dir(order);

};

var removeItem = function(item , order){
    
    var result = findByName(item.name , order);
    var itemBag;
    
    if( result !== undefined){
        var index = order.items.indexOf(result);
        itemBag = order.items[index];
        
        if(result.quantity <= 1){
            order.items.splice( index , 1 );
            itemBag.quantity = 0;
        }else{
            itemBag.quantity -= 1;
        }
        
        item.quantity = itemBag.quantity;
        
    }else{
        console.error("El resultado de la busqueda es indefinido !");
    }
    
    console.log("The order now : ");
    console.dir(order);
};

var findByName = function(name , order){
    return order.items.find(function(itemObject){
        return itemObject.name === name;
    });
};
                     
                     
var orderModel =  
    { 
        name      : "", 
        address   : "",
        celNumber : "",
        items : [],
        additionalFields : {
            additionalNote : ""
        }
    };
                     

//------------------------------------------ init ---------------------------------------

function addQuantityField(items){
    items.forEach(function(item){
        item.quantity = 0;
    });
};

