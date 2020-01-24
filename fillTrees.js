var mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/smartflore"
mongoose.connect(mongoURL)
const csv = require('csv-parser')
const fs = require('fs')
let TreeDescription=require('./models/treeDescription')
let KeyProp = require('./models/keyProp')
let treeDescriptions=[]
let KeyValue = require('./models/keyValue')
parseResult=async function(){
let keyPropList=await KeyProp.find({})
let keyValueList=await KeyValue.find({})
for(let tree of treeDescriptions){
    let taxon=tree['TBId']
    let t=new TreeDescription()
    t.telaBotanicaTaxon=taxon
    for(let key of keyPropList)
        {
            let possibleValues=keyValueList.filter(v=>{
                return key._id.toString()==v.keyProperty.toString()
            })
            for(let value of possibleValues){
                if(tree[key.normalizedForm].indexOf(value.normalizedForm)!=-1){
                    t.treeValues.push(value)
                }
            }
        }
      t.save()  
}    
}
let currentIndex = 0
    fs.createReadStream('treeDescription.csv')
        .pipe(csv())
        .on('data', (data) => {
            treeDescriptions.push(data)
        })
        .on('end',parseResult)

