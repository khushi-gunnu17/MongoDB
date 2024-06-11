const mongoose = require('mongoose')

// for local host 
// const URI = "mongodb://127.0.0.1/company"

//  for connection with atlas 

// 
const URI = 
    "mongodb+srv://khushi:khushicosmos9@thapa-cluster.uvat2bq.mongodb.net/company?retryWrites=true&w=majority&appName=thapa-cluster"

mongoose.connect(URI)

// we need to create a schema 
const salesSchema = new mongoose.Schema({
    quantity : Number,
    price : Number,
    targetprice : Number,
    colors : [String],
    values : [Number]
})


// We need to now create a model
const Sales = new mongoose.model('sale', salesSchema)



// data 
const new_data = {
    "quantity": 12,
    "price": 70,
    "tragetprice": 180,
    "colors": [ "orange", "pink", "aliceblue" ],
    "values": [ 24, 76, 12, 98, 53 ]
}




const main = async() => {
    try {

        // 1 : reading document
        // const data = await Sale.find({price : {$gt : 25}})
        // console.log(data);


        // 2 : inserting documents
        // insertOne cannot be used here.
        // await Sales.insertMany(new_data)
        // const data = await Sales.find({price : {$gt : 20}})
        // console.log(data);


        // 3 : update query
        // could also use updateOne or updateMany here like we used in the actual queries
        // await Sales.findOneAndUpdate({price : 80}, {$set : {price : 70}})
        // const data = await Sales.find({price : {$gt : 20}})
        // console.log(data);


        // 4 : delete query
        // could also use deleteOne or deleteMany
        await Sales.findOneAndDelete({price : 70})
        const data = await Sales.find({price : {$gt : 20}})
        console.log(data);


    } catch(err) {
        console.log(err);
    } finally {
        mongoose.connection.close()
    }
}


main()