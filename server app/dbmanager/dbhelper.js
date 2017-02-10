var models       = require('./models.js');
var requestModel = models.requestModel;

exports.insertRequest = function( req , res , next){
    requestModel.create(
        { request : req.body } ,
                        function(err,row){
                            if(err){
                                console.log("Hubo un error : " + err);  
                                res.json({ isOk : false});
                            }else{
                                res.json({ isOk : true });
                                req.row = row;
                                next();
                            } 
    });
    
};

exports.getNotConfirmeds = function( req , res ){
    requestModel.find({ isConfirmed : false } , function(err,rows){
        if(err){
            console.log("Hubo un error : " + err);  
            res.json({ isOk : false});
        }else{
            res.json(rows);
        } 
    });
};
