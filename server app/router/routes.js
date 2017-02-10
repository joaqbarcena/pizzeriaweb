//Export helper for DB

module.exports = function ( config , app ){
    
    var index        = config.INDEX_PATH;
    var adminIndex   = config.ADMIN_INDEX_PATH;
    var dbController = config.DATABASE_CONTROLLER;
    var serverPath   = config.SERVER_PATH
    var eventService = config.EVENT_SERVICE;
    
    app.post('/sendOrder' , dbController.insertRequest );
    app.post('/sendOrder' , eventService.emmitUpdate   );
    
    app.get('/admin/event', eventService.addListener   );
    
    app.get('/admin/getNotConfirmed' , dbController.getNotConfirmeds);
    
    app.get('/admin' , function(req,res){
        console.log('Served By : ' + adminIndex);
        res.sendFile(serverPath + adminIndex.substring(1));
    });
    
    app.get('*' , function(req,res){
        console.log('Served By : ' + index);
        res.sendFile(index);
    });
    
};