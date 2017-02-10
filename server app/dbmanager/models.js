var mongo = require('mongoose');

var itemBag = {
        "name"     : String,
        "quantity" : Number  
};

var rawRequestSchema = {
        name      : String, 
        address   : String,
        celNumber : Number,
        payWith   : Number, //TODO check that for future because can contains anothers chars and can be bad
        total     : Number,
        items     : [itemBag],
        additionalFields : {
            additionalNote : String
        }
};

var requestSchema = new mongo.Schema({
    request     : rawRequestSchema,
    isConfirmed : { type: Boolean, default: false },
    ts          : { type: Date, default: Date.now }
});


exports.requestModel = mongo.model('Requests' , requestSchema);