# MongoDB
## Basics 
- Introduction to Mongodb
- Nosql vs sql
- JSON vs BSON
- Managing Db and collections
- Advanced CRUD operations
- comparison operators
- cursors in mongoDB
- logical operators
- $expr and Elements operator
- Projection and Relationship
- embedded documents


## Advanced 
- Introduction to indexes
- Creating and managing Indexes
- Understanding the Aggregation Framework  
-- Introdction to aggregation  
-- basic aggregation operations  
-- combining aggregation stages  
-- aggregation operators and expressions  
- Pipeline stages  
($match, $project, $group, $sort, $limit, $unwind, $filter, $skip, etc.)


## Projects
- working with mongoDB
- Node.js Driver
- workimg with MongoDB and Node.js


## SQL 
- SQL databases are relational databases.
- They use structured tables to store data in rows and columns.
- Suitable for applications with well-defined schemas and fixed data structures.
- E-Commerce platform, HR Management, etc.
- Examples : MySQl, PostgreSQL, Oracle.


## NoSQL
- Nosql databases are non-relational databases.
- They provide flexibility in data storage, allowing varied data types and structures.
- Ideal for applications with dynamic or evolving data models.
- CMS (Content Management System) , Social Media Platforms, Gaming
- Examples : Redis, Cassandra, MongoDb


## Terminologies
- Database
- Collection (in a database, multiple collection are there.)
- Documents (in json format, in a collection, multiple documents are there.)
- Schemaless (no particular schema for storing data in the database.)


## Key features
- Flexible schema design
- Scalabilty and Performance
- Document-oriented storage
- Dynamic queries
- Aggregation Framework
- Open source and community


## Storage engine 
- mongoDb server has storage engine
WiredTiger or MMAP1
- Read and write data files from the database.
- this is the engine where json to bson conversion takes place or vice-versa.


-- Mongo Shell (Playground)


## Managing databases in MongoDb
- Creating/Deleting Databases
- Creating/Deleting Collections


## Commands
- mongosh   (to connect to the server)
- show dbs (displays all the databases)
- use (database-name)  (to create a new database or use an existing database)
- db.dropDatabase()

- show collections
- db.createCollection('(collection-name)')
- db.collection-name.drop()   -   (to delete the collection)
- db.data.find()


## Insert operations

### Inserting documents in mongodb

> db.(collection-name).insertOne({  
    field1 : value1,  
    field2 : value2,  
    ...  
});

> db.(collection-name).insertMany([  
    {field1 : value1,  field2 : value2, ...},  
    {field1 : value1,  field2 : value2, ...},  
    // ...  
]);





### When to use quotes and when not to ?

- Special Characters  
If a field name contains special characters or spaces, or starts with a numeric digit, using quotes is necessary.  


- Reserved words  
If a field name is a reserved keyword in MongoDb , use quotes to distinguish it from the reserved keyword.





### Ordered Inserts and Unordered Inserts

When executing bulk write operations, 'ordered' and 'unordered' determine the batch behaviour.

- Ordered Inserts  
Default bheaviour is ordered, where MongoDb stops on the first error.  
db.(collection-name).insertMany([ doc1, doc2, ...]);

- Unordered Inserts  
When executing bulk write operations with unordered flag, Mongodb processing after encountering an error.   
db.(collection-name).insertMany([ doc1, doc2, ...], {ordered : false});






### Case sensitivity in MongoDb

- Collection names are case-sensitive.  
-  Field names within documents are also case-sensitive.






## Read operations
### Reading documents

- finding documents in mongodb :  
> find()  
db.collection-name.find({key:value})

> findOne()  
db.collection-name.findOne({key:value})
<!-- gives the first result only -->




- Importing JSON in mongodb  
> mongoimport jsonfile.json -d database_name -c collection-name  
mongoimport products.json -d shop -c products  
mongoimport products.json -d shop -c products --jsonArray   {if array of json}  

Here, --jsonArray accepts the import of data expressed with multiple mongodb documents within a single JSON Array.


- Limited to imports of 16MB or smaller.


<!-- this Not working -->

- exporting json in mongodb  
> mongoexport -d database_name -c collection_name -o  C:\Users\vs\OneDrive\Desktop\test.json










### Comparison Operators

-- $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin  
(equal to, not equal to, greater than, greater than or equal to, less than, less tah or equal to, in and not in operators)

> db.collection_name.find({'fieldname' : {$operator : value} })
> db.collection_name.find({'fieldname' : {$operator : value} }).count()












### Logical Operators 

$and, $or, $not , $nor

> {$and : [{condition1, condition2, }, ...]}  

> {field : {$not : {operator : value}}}

example :  
db.data.find({$and : [{'age' : {$gt:19}}, {'name' : 'Prachi desai'}]})

db.data.find({'age' : {$gt:18}, 'name' : 'Prachi desai'})       // mongodb implicitly takes it as  AND








### Cursors in MongoDB

- Cursors in mongoDb are used to efficiently retrieve large result sets from queries, providing control over the data retrieval process.

-- MongoDB retrieves query results in batches using cursors.

-- Cursors are a pointer to the result set on the server.

-- Cursors are used to iterate through query results.

- Automatic Batching

-- MongoDB retrieves query results in batches not all set at once.

-- Default batch size is 101 documents.

-- This improves memory efficiency and 

- cursor methods := count(), limit(), skip(), sort()

> db.collection_name.find({'fieldname' : {$operator : value} }).count()  

> db.collection_name.find({'fieldname' : {$operator : value} }).limit(3)  

> db.collection_name.find({'fieldname' : {$operator : value} }).limit(3).skip(1)  

> db.collection_name.find({'fieldname' : {$operator : value} }).skip(2)  

> db.collection_name.find({'fieldname' : {$operator : value} }).sort({price : 1})   <!-- 1 or -1 (also not workiing with not in operator) --> 


### Cursor Methods (Caveats)

- Performance Implications  
---> skip() can be inefficient for large offsets.
---> using sort on large result sets may impact performance.

- Use with caution  
---> be cautious when using limit() and skip() on large collections.
---> consider using indexing to optimize query performance.










### Complex expressions

- The $expr operator allows using aggregation expressions within a query.  

- Useful when you need to compare fields from the same documents in a more complex manner.

- Syntax : 
> {$expr : {operator : [field, value] } }

- Example : 
> db.sales.find( {$expr : {$gt : ['$price', 1340]} } )

> db.sales.find( { $expr : {$gt : [{$multiply : ['$quantity', '$price'] }, '$targetprice' ] } } )



<!-- these both examples down below not working as expected , they both are giving interchange values for the query -->
> db.sales.find( { $expr : {$gt : [{$add : ['$quantity', '$price'] }, '$targetprice' ] } } )    

> db.sales.find( { $expr : {$lt : [{$add : ['$quantity', '$price'] }, '$targetprice' ] } } )




### Elements Operators

- $exists, $type, $size 

- syntax :   
{field : { $exists: boolean } }    
{field : { $type : bson-data-type } }  
{field : { $size : array-length } }


- The bson type value can be one of the following :    
-> 1: Double  
-> 2: String  
-> 3: Object  
-> 4: Array  
-> 5: Binary Data  
-> 6: Undefined  
-> 7: Object ID  
-> 8: Boolean  
-> 9: Date  
-> 10: Null  
-> 11: Regular Expression  
-> 12: Javascript Code  


- Example :  
> db.data.find({'comments' : {$size : 2}})

> db.data.find( {'comments' : {$exists : false}} )

> db.data.find( {'comments' : {$exists : true}, age : {$eq : 19} } )

<!-- it checks if the datatype is of a certain type and then perform the operations on it according to the given condition -->
> db.data.find( {'comments' : {$type : 2 }, age : {$eq : 19} } )

> db.data.find( {'comments' : {$type : 'string' }, age : {$eq : 19} } )







## Projection

- syntax : db.collection.find({}, {field1 : 1, field2: 1})
- to include specific fields, use projection with a value of 1 for the fields you want.
- To include fields, use projection with a value of 0 for the fields you want to exclude.
- You cannot include and exclude fields simultaneously in the same query projection.

- Example : 

>  db.data.find( {'comments' : {$size : 2 } }, {comments : 1, _id : 0} )

> students> db.data.find( {'comments' : {$size : 2 } }, {comments : 1, age : 1, _id : 0} )  
Output :  
[  
  {  
    age: 21,  
    comments: [  
      { value: 'good', size: 'cute' },  
      { value: 'friendly', size: 'does not matter' }  
    ]
  }
]  
students> db.data.find( {'comments' : {$size : 2 } }, {comments : 1, age : 0, _id : 0} )
MongoServerError[Location31254]: Cannot do exclusion on field age in inclusion projection







## Embedded Documents
- Query documents inside embedded documents using dot notation.
- syntax : db.collection.find({ "parent.child" : value })
- Example : 
> db.data.find( { 'comments.value' : 'good' } )

> db.data.find( { 'comments.value' : 'good', 'age' : {$gt : 19}  } )



### $all vs $elemMatch
- The $all operator selects the documents where the value of a field is an array that contains all the spcified elements.  
- syntax : {field : {$all : [value1, value2, ...] } }  
-- db.data.find({'comments.value' : {$all : ["mid", "mid"] } })

- Example :
> db.data.find( { 'comments.value' : {$all : ['good', 'friendly'] } } )


- The $elemMatch operator matches documents that contain an array field with at least one element that matxhes all the specified query criteria.  
- syntax : {field : {$elemMatch : {quer1, query2, ...} } }
- Example : 

> db.data.find({'comments' : {$elemMatch : {"value" : "mid", 'size' : 'too big'} } })

> db.data.find( {'comments' : {$elemMatch : {'value' : 'good', 'size' : 'cute'} } } )







## Update Operations in mongodb 

### updateOne() and updateMany()

> db.collection-name.updateOne(  
    {filter},  
    {$set : { existing field : newValue, newField: "new value", //... }, }  
)

> db.collection-name.updateMany(  
    {filter},  
    {$set : { existing field : newValue, //... }, }  
)





### Removing and renaming fields  

-- db.collctionName.updateOne( {filter}, {$unset : {fieldName : 1} } )

> db.collctionName.updateOne(  
    {filter}, 
    {$rename : {oldFieldName : "newFieldName"} }  
)

example :
> db.data.updateOne( {name : "Kashish Goyal"}, {$unset : {Age:1} })

> db.data.updateOne( {name : "Kashish Goyal"}, {$rename : {'age' : "Age"} })






### Adding, removing items from array

> db.collctionName.updateOne(  
    {filter}, 
    {$push : {arrayField : "new Element"} }  
)


> db.collctionName.updateOne(  
    {filter}, 
    {$pop : {arrayField : value} }    
    <!-- either number 1 or -1 in the value field -->
)

> Example :   
db.data.updateOne( {name : "Arushi Lath"}, {$push : {comments : {value : 'friendly', size : 'does not matter'} } } )







### Updating embedded documents

> db.collctionName.updateOne(  
    {filter}, 
    {$set : {"arrayField.<!--  -->.text" : "Updated Text"} }  
)

<!-- $ --> : Positional operator above







## Delete Operations in mongodb 

to remove a document from a collection.

- syntax : db.collectionName.deleteOne( {filter} )

- syntax : db.collectionName.deleteMany( {filter} )








## Indexes in MongoDb

### What are indexes ?

-> Indexes are specialized data structures that optimize data retrieval speed in MongoDB.  
-> Indexes store a fraction of data in a more searchable format.  
-> They enable MongoDB to locate data faster during queries.  
-> Indexes are separate from collections and multiple indexes can exist per collection.


### Benefits of indexes 

- Faster Querying  
- Efficient Storing  
- Improved Agregation
- Indexing on Multiple fields


explain()

- use explain() method to understand query execution in detail.  
- db.collection_name.find( {name : value} ).explain()  
- db.collection_name.find( {name : value} ).explain('executionStats')








### Managing indexes

- db.collectionName.createIndex({field : 1})

(1) for storing indexes in ascending order
(-1) for storing indexes in descending order


- db.collectionName.getIndexes()

_id is a default index.



- db.collection.dropIndex( {field : 1} )  
- db.collection.dropIndex( "index_name" )

_id is automatically added by mongodb and it's a default unique index.



### Unique, Text Index

- db.collection_name.createIndex({field : 1}, {unique : true})

- db.collection_name.createIndex( {field : 'text'} )

<!-- this query not practised -->
- db.collection_name.find( {$text : {$search : 'keyword'} } )   

-- searching using index is faster than $regex searching.   
-- db.collection_name.find( {field : {$regex : 'air'} } )





### When not to use Index ?

- Indexes on rarely used fields  
- Balancing Act  
- Indexing small collections
- If the output is gonna be very large and would be greater than 60% of the documents, then there is no need to make indexes








## Aggreggation in MongoDb

### What is Aggregation ?  

- Definition : Aggreggation is the process of performing transformations on documents and combining them to produce computed results.

- Pipeline stages : Aggreggation consists of multiple pipeline stages, each performing a specific operation on the input data.

- Benefits :  
-> Aggregating Data : Complex calculations and operations are possible.  
-> Advanced Transfrmations : data can be combined, reshaped and computed for insights.  
-> Efficient Processing : Aggreggation handles large datasets efficiently.




### $match 
- the $match stage is similar to the query used as the first argument in .find(). It filters documents based on specified conditions.

- Syntax : {$match : {query}}

- Example :  db.sales.aggregate( [ {$match : {price : 55} } ] )




### $group

- The $group stage groups documents by specified fields and performs aggregate operations on grouped data.

- Syntax : 

> {  
    $group :  
        {  
            _id : expression,   <!-- Group Key -->  
            field1 : {accumulator1 : expression1},  
            ...  
        }  
}


- Example :  db.sales.aggregate( [ {$group : { _id: '$price' , totalPrice : {$sum:1} } } ] )

output : 
> [  
  { _id: 35, totalPrice: 1 },  
  { _id: 15, totalPrice: 1 },  
  { _id: 25, totalPrice: 1 },  
  { _id: 55, totalPrice: 2 }  
]

-- db.sales.aggregate([  
    {  
        $group : {  
            _id : '$price',  
            totalPrice : {$sum : '$quantity'}  
        }  
    }
])

- db.sales.aggregate([ {$match : {price : {'$gt': 30}} }, {$group : { _id: '$price' , totalPrice : {$sum:1} } } ] )

- chaining example :  db.sales.aggregate( [ {$match : {quantity : 5} },  {$group : {_id : '$quantity', totalPrice: {$sum: '$price'}, priceAvg : {$avg : '$price'}  } } ] )




### $sort 

- {$sort : {field : order} }

- db.sales.aggregate([
    {$sort : {totalProducts : 1}}
])

- Example :  db.sales.aggregate( [ {$group : { _id: '$price' , totalPrice : {$sum:1} } }, {$sort : {totalPrice : 1}} ] )




### $project

- The $project stage reshapes documents, includes or excludes fields, and perform operations on fields.
- { $project : {field : expression1, ... } }

- db.products.aggregate{[
    {$project : {name : 1, discountedPrice : {$subtract : ['$price', 5] } } }
]}

-- Projects the name field and calculates a discountedPrice field by subtracting 5 from the price.

-- $sum, $subtract, $multiply, $avg, etc. are types of expression operator.


- Example : db.sales.aggregate( [ {$match : {price : {$gt : 30} } }, {$project : {price : 1, _id : 0, discountedPrice : {$subtract : ['$price', 5] } } } ] )








### $push

- The $push stage adds elements to an array field within documents.  
- {$push : expression}
> db.products.aggregate([  
    {$group : {_id : {company : '$company'}, products : {$push : '$name'} } }  
])  








### $unwind

- The $unwind stage deconstructs an array field and produces multiple documents.

- {$unwind : array}

> db.sales.aggregate([  
    {$unwind : '$colors'},  
    {$match : {price : {$gt : 30}}}
    {$group : {_id : '$price', allColors : {$push : '$colors'} } }  
])

- Deconstructs the colors array field, groups colors by price, and creates an array of colors for price, also the price has a condition given.

- problem - We are getting a duplicate data in this.




### $addToSet

- The $addToSet adds elements to any array field while preventing duplicates.

> db.sales.aggregate([  
    {$unwind : '$colors'},  
    {$match : {price : {$gt : 30}}}
    {$group : {_id : '$price', allColors : {$addToSet : '$colors'} } }  
])

- Groups allColors by each price and creates an array of unique colors for each company.







### $size

- The $size stage calculates the length of an array field.

- {$size : array}

- db.sales.aggregate([
    {$project : {price : 1, numberOfColors : {$size : "$colors"}}}
])

- projects the price field and calculates the number of colors in the colors array.

- db.sales.aggregate([  
    {$unwind : '$colors'},  
    {$match : {price : {$gt : 30}}}
    {$group : {_id : '$price', allColors : {$addToSet : '$colors'} } }  
    {$project : {_id : 1, allColors : 1, colorLength : {$size : 'allColors'} }}
])  
-- We had to pass allColors in the project here, coz normal 'color' is not present in the field.

- we cannot use size in $group.







### $limit and $skip

- the $limit and $skip stages are useful for pagination, limiting and skipping results.

- syntax : { $limit : +ve_integer }

- db.sales.aggregate([
    {$skip : 1},   <!--  skips the given number of fields -->
    {$limit : 3}    <!--  limits the number of displayed fields  -->
])






### $filter
- The $filter stage filters elements of an array based on specified conditions.

- Syntax :  {  
    $project : {  
        field : {  
            $filter : {  
                input : '$array',
                as : 'variable'
                cond : expression
            }  
        }
    }
}

- Example :  db.sales.aggregate([   
    {   
        $project :      
        {   
            quantity : 1,
            values :   
            {  
                $filter :    
                    {    
                        input : '$values',   
                        as : 'value',   
                        cond : {$gte : ['$$value', 50] }   
                    }   
            }    
        }
    } 
])

-- Output :   
[  
  { _id: 1, quantity: 10, values: [ 74 ] },  
  { _id: 2, quantity: 5, values: [ 68, 57 ] },  
  { _id: 3, quantity: 6, values: [ 86, 90 ] },  
  { _id: 4, quantity: 5, values: [ 68, 57 ] },  
  { _id: 5, quantity: 5, values: [ 68, 57 ] }  
]












## Introduction to MongoDb Atlas

- MongoDb Atlas is MongoDB's fully managed cloud database service.
- It offers an easy way to deploy, manage and scale MongoDB databases in the cloud.
- Atlas eliminates the need for manual setup and maintenance, allowing developers to focus on their applications.
- It provides automated scaling options to accommodate growing workloads.
- Atlas supports global clusters, enabling databases to be deployed across multiple regions for better data availability and reduced latency.






### Hierarchy in MongoDB
Organization -> Projects -> Clusters -> Database -> Collections -> Documents






### Clusters

- In MongoDB, a cluster refers to a group of interconnected servers (nodes) that work together to store and manage data.




### Horizontal scaling (Scaling Out) (in NoSQL)

- Add more resources like virtual machines to your system to spread out the workload across them.
- Increases high availability.
- Fewer periods of downtime
- Easy to resize according to your needs





### Vertical Scaling  (Scaling Up) (In MySQL)

- Increase or decrease the capacity of existing services/instances.
- No changes have to be made to the application code.
- Less complex network.
- Less complicated maintenance.








## Working with MongoDB Drivers

### Intoduction to MongoDB Drivers

- Software Libraries that allow applications to interact with MongoDB databases.
- MongoDB offers official and community-supported drivers for various programming languages.
- Drivers provide APIs tailored to specific programming languages.
- https://www.mongodb.com/docs/drivers

- Languages supported by MongoDb are :  
-- C  
-- C++  
-- C#  
-- Go  
-- Java  
-- Kotlin  
-- Node.js  
-- PHP  
-- Python  
-- Ruby  
-- Rust  
-- Scala  
-- Swift  
-- Typescript  







### Working with Node.js MongoDB Drivers

- Download and install Node.js from official Node.js website.
- Create a node.js project using npm init -y
- install mongodb driver using npm install mongodb.
- https://www.npmjs.com/package/mongodb
- Create a connection with MongoDB database and start working with it.






### Getting started with Node.js MongoDB Driver

- Connect to MongoDB server. Use the MongoCLient class and a valid URI to establish a connection to the MongoDB server.
- Select a database : Access a specific database using the client.db(databaseName) method.
- Access a collection : Retrieve a collection reference using the db.ccollection(collectionName) method.
- Perform Operations : Perform CRUD operations like querying, inserting, updating and deleting documents within the collection.
- Close Connection : Safely close the connection using the client.close() method when done







## Working with mongoose

- It is an Object Data Modeling (ODM) library for MongoDB and Node.js.
- It makes MongoDB interaction more straightforward and organized.
- It provides a structured, schema-based data modeling approach.
- Repository : github.com/Automattic/mongoose





### Why mongoose instead of official driver ?

- Structured schemas
- Validation 
- Relationships
- MiddleWare
- Complex Queries