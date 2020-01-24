var mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/geospatial"
mongoose.connect(mongoURL)
let KeyProp = require('./models/keyProp')
let KeyValue = require('./models/keyValue')
let AlbiziappTree = require('./models/albiziappTree')
let populate=async function(){
    let mat=await KeyValue.findOne({_id:"5d668c8f4f8f3c7811f91de2"})
    let dest = await AlbiziappTree.find({})
    for(let tree of dest){
        tree.floreProperties.push(mat)
        tree.save()
    }
}
populate()