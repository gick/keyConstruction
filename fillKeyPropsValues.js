var mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/smartflore"
mongoose.connect(mongoURL)
const csv = require('csv-parser')
const fs = require('fs')
let KeyProp = require('./models/keyProp')
let keyValues=[]
let KeyValue = require('./models/keyValue')
parseResult=async function(){
    let keyProp=new KeyProp()
    let normalForm=Object.keys(keyValues[0])[0]
    keyProp.normalizedForm=normalForm
    keyProp.frTitle=normalForm
    keyProp.frSubtitle=keyValues[0][normalForm]
    console.log(keyProp)
    try{
    keyProp=await keyProp.save()
    }
    catch(error){
        console.log(error)
    }
    for(let i=1;i<keyValues.length;i++){
        let keyValue=new KeyValue()
        keyValue.normalizedForm=keyValues[i][normalForm]
        keyValue.keyProperty=keyProp._id
        keyValue.save()
    }
    
}
let currentIndex = 0
    fs.createReadStream('petiole.csv')
        .pipe(csv())
        .on('data', (data) => {
            keyValues.push(data)
        })
        .on('end',parseResult)

