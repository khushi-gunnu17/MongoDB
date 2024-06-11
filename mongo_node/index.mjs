// CommonJS vs ES Modules
// const { MongoClient } = require("mongodb")

// import doesn't work initially because Node.js treats files as CommonJS by default unless you use .mjs or set the "type": "module" in package.json. Without these changes, Node.js will throw an error when it encounters import.
import { MongoClient } from "mongodb"


// setting up a server
const URI = 'mongodb://127.0.0.1'
const client = new MongoClient(URI)


const about_data = {
    firstName: "Joe",
    lastName: "Jackson",
    gender: "male",
    age: 28,
    address: {
        streetAddress: "101",
        city: "San Diego",
        state: "CA"
    },
    phoneNumbers: [
        { type: "home", number: "7349282382" }
    ]
}


const main = async() => {

    await client.connect()

    // setting up connection wth the database
    const db = client.db('company')

    // setting up connection with the collection
    const collection = db.collection('sales')


    // inserting new data = about_data
    // everytime the file executes, it autmatically updates the data and insert it into the sales colelction.
    await collection.insertOne(about_data)

    const data = await collection.find({age : {$eq : 28} }).toArray();

    console.log(data);

    return 'done'

}


main()
.then(console.log())
.catch((err) => console.log(err))
.finally(() => client.close())