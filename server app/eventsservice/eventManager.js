
var connections = [];

exports.emmitUpdate = function(req , res){
    
    console.log('Emmiting Update !!, the array size is : ' + connections.length );
    
    if(req.row !== undefined){
        for(var e = 0; e < connections.length ; e++){
            try{
                connections[e].write('id: ' + getCurrentTime() + ' \n');
                connections[e].write('data: ' + JSON.stringify(req.row) + '\n\n');   
            }catch(err){
                console.log('Hubo un error al tratar de enviar a travez de esta conexion, se eliminara !');
                connections.splice(e,1);
                e--; //Para no saltear, ya que este indice no existe mas
            }
        }
    }
};


exports.addListener = function(req , res){
    
    req.socket.setTimeout(99999999999999999999999999999999999999999999999);
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');
    
    connections.push(res);
    
    console.log('Adding listener  !!, the array size is : ' + connections.length );
    
    req.on("close" , function(){ remove(res) });
};

var remove = function(conn){
    var index = connections.indexOf(conn);
    connections.splice(index,1);
    
    console.log('A connection was deleted , the array size is : ' + connections.length );
};


function getCurrentTime(){
    var da = new Date();
    return da.getMilliseconds();
}