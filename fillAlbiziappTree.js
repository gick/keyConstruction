var mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/geospatial"
mongoose.connect(mongoURL)
let TreeDescription=require('./models/treeDescription')
let AlbiziappTree = require('./models/albiziappTree')
let KeyValue = require('./models/keyValue')
let KeyProp = require('./models/keyProp')
let populate=async function(){
    let i=0 
    let source= await TreeDescription.find({})
    let dest = await AlbiziappTree.find({})
    for(let treeSource of source){
        let match=dest.filter(v=>v.telaBotanicaTaxon==treeSource.telaBotanicaTaxon)[0]
        if(match){
        match.floreProperties=treeSource.treeValues
        match.save()}
    }
}
populate()