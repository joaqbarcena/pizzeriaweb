//Init the app 
var app = angular.module("userOrder",[]);

console.log("The app is initializing ... ");
//add a Controller to app

app.controller("orderController", //nombre del controller declarado en ng-controller
               [ '$scope', '$http' ,  // Pide los objetos que necesita como parametros en la funcion contigua
                 function($scope , $http){
                     
                     //-------- init items --------
                     setQuantityField(fromServerItems);
                     
                     $scope.order      = orderModel  ;
                     $scope.products   = fromServerItems ;
                     
                     //--------- functions ---------
                     $scope.addItem    = putItem     ;
                     $scope.removeItem = removeItem  ;
                     
                     $scope.sendOrder  = function(){
                         console.log("The order will send with data : ");
                         Toast('Su orden esta siendo enviada');
                         $http.post( '/sendOrder', $scope.order )
                                    .then(responseCallback,errorCallback)
                                    .then(function(res){
                                            if(res.data.isOk === true) clear($scope);
                         });                         
                     }
                 }
               ]
);

                     
var responseCallback = function(res){
    
    if(res.data.isOk === false){
        errorCallback(res);
        return;
    }
    
    Toast('Listo ! espere la confirmacion');
    console.dir(res);
    
    return res;
};

var errorCallback    = function(res){
    Toast('Hubo un error al tratar de enviar :(');
    console.log("Was an error !!!!!");
    console.dir(res);
    
    return res;
}


//---------------------------------------- Chart functions -------------------------------------

var putItem = function(product , order){
    
    var result = findByName(product.name , order);
    
    if( result === undefined){
        
        itemBag = {
            "name"     : product.name,
            "quantity" : 1
        };
        
        order.items.push(itemBag);
        
    }else{
        
        var index = order.items.indexOf(result);
        itemBag = order.items[index];
        itemBag.quantity += 1;
    
    }
    
    product.quantity = itemBag.quantity;
    product.displayable = (product.quantity > 0)? "displayable" : "";
    
    order.total += product.price;
    
    
    console.log("The order now : ");
    console.dir(order);

};

var removeItem = function(product , order){
    
    var result = findByName(product.name , order);
    
    if( result !== undefined){
        
        var index = order.items.indexOf(result);
        itemBag = order.items[index];
        
        if(result.quantity <= 1){
            
            if(result.quantity == 1){ 
                order.total -= product.price; 
            } 
            order.items.splice( index , 1 );
            itemBag.quantity = 0;
        
        } else {
            
            itemBag.quantity -= 1;
            order.total -= product.price;
        
        }
        
        product.quantity    = itemBag.quantity;
        product.displayable = (product.quantity > 0)? "displayable" : ""
        
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

                     

//------------------------------------------ init ---------------------------------------

function setQuantityField(items){
    items.forEach(function(item){
        item.displayable = "";
        item.quantity = 0;
    });
};


//------------------------------------------ Toast ----------------------------------------

function Toast(msg){
    Materialize.toast(msg, 3000);    
}

//------------------------------------------ Clear -----------------------------------------

function clear(scope){
    setQuantityField(scope.products);  
    scope.order = { 
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
}

//------------------------------------------ Copy -------------------------------------------

function makeCopy(cop){
    return $.extend( {}, cop );
}