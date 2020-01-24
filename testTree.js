var mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/smartflore"
mongoose.connect(mongoURL)
let TreeDescription=require('./models/treeDescription')
let KeyProp = require('./models/keyProp')
let KeyValue = require('./models/keyValue')
TreeDescription.find({}).limit(2)
.populate('treeValues')
.exec(function(err,res){
    for(let t of res){
        console.log('        '+t.telaBotanicaTaxon)
        for(let p in t.treeValues){
            console.log(t.treeValues[p].keyProperty.normalizedForm)
            console.log('  '+t.treeValues[p].normalizedForm)
            }

    }
})