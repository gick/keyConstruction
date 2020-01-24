var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const keyValue = Schema({
    normalizedForm:String,
    frName:String,   
    enName:String,
    keyProperty:{ type: Schema.Types.ObjectId, ref: 'keyProp',autopopulate: true}

});
keyValue.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model('keyValue', keyValue);