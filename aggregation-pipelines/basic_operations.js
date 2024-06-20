
db.sales.aggregate([
    {
        $group : {
            _id : '$price',
            totalPrice : {$sum : '$quantity'}
        }
    },
    {
        $sort : {totalPrice : 1}
    }
])


db.sales.aggregate([
    {
        $match : {
            quantity : {$eq : 5}
        }
    },
    {
        $group : {
            _id : '$quantity',
            priceTotal : {$sum : '$price'},
            priceAvg : {$avg : '$price'}
        }
    }
])



db.sales.aggregate([
    {
        $project : {
            price : 1,
            _id : 0
        }
    }
])



db.products.aggregate([  
    { 
        $group : {
            _id : {company : '$company'}, 
            products : {$push : '$name'} 
        } 
    }  
])  




db.sales.aggregate([
    {
        $match : {
            price : {$gt : 30}
        }
    },

    {
        $group : {
            _id : '$price',
            allColors : {$push :'$colors'}
        }
    }
])



db.sales.aggregate([
    {
        $match : {
            price : {$gt : 30}
        }
    },

    {
        $project : {
            _id : 1,
            colors : 1,
            colorLength : {$size : '$colors'}
        }   
    }


])



// Lookups

[
    {
      $lookup: {
        from: "authors",
        localField: "author_id",
        foreignField: "_id",
        as: "author_details"
      }
    },
  
    {
      $addFields: {
        author_details : {
          $first : "$author_details"
        // $arrayElemAt : ["$author_details", 0]
        }
      }
    }
]