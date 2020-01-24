var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const treeDescription = Schema({
    telaBotanicaTaxon:String,
    treeValues:[{ type: Schema.Types.ObjectId, ref: 'keyValue'}]

});
  

module.exports = mongoose.model('treeDescription', treeDescription);