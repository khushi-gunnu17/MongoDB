// 01.) How many users are active ?

[
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "activeUsers",
  }
]





// 02.) What is the average age of all users ?

[
    {
      $group : {
        _id : 'null',
        averageAge : {
          $avg : "$age"
        }
      }
    }
]





// 03.) List the top 2 most common favourite fruits among the users.

[
    {
      $group : {
        _id : '$favoriteFruit',
        count : {
          $sum : 1
        }
      }
    },
    
    {
      $sort : {
        count : -1
      }
    },
    
    {
      $limit : 2
    }
]





// 04.) Find the total number of males and females.

[
    {
      $group : {
        _id : "$gender",
        genderCount : {
          $sum : 1
        }
      }
    }
]

// or 

[
    {
      $group : {
        _id : "$gender",
        genderCount : {
          $count : "$gender"
        }
      }
    }
]





// 05.) Which country has the highest number of registered users ?

[
    {
      $group : {
        _id : "$company.location.country",
        userCount : {
          $sum : 1
        }
      }
    },
  
    {
      $sort : {
        userCount : -1
      }
    },
  
    {
      $limit : 2
    }
]





// 06.) List all the unique eye colors present in the collection.

[
    {
      $group : {
        _id : "$eyeColor"
      }
    }
]





// 07.) What is the average number of tags per user ?

[
    {
      $unwind : "$tags"
    },
  
    {
      $group : {
        _id : "$_id",
        numberOfTags : {
          $sum : 1
        }
      }
    },
  
    {
      $group : {
        _id : null,
        averageTags : {
          $avg : "$numberOfTags"
        }
      }
    }
]

// or 

[
    {
      $addFields: {
              numberOfTags : {
          $size : { $ifNull : ["$tags", []] }
        }
      }
    },
  
    {
      $group : {
        _id : null,
        averageNumberOfTags : {
          $avg : "$numberOfTags"
        }
      }
    }
]





// 08.) How many users have 'enim' as one of their tags ?

[
    {
      $match : {
        tags : "enim"
      }
    },
  
    {
      $count : 'userWithEnimTag'
    }
]





// 09.) What are the names and age of users who are inactive and have 'velit' as a tag ?

[
    {
      $match : {
        tags : "velit",
        isActive : false
      }
    },
  
    {
      $project : {
        name : 1,
        age : 1,
        _id : 0
      }
    }
]





// 10.) How many users have a phone number starting with '+1 (940)' ?

[
    {
      $match : {
        "company.phone" : /^\+1 \(940\)/
      }
    },
  
    {
      $count : "UsersWithSpecifiedNumber"
    }
]





// 11.) Who has registered most recently ?

[
    {
      $sort : {
        registered : -1
      }
    },
  
    {
      $limit : 5
    },
  
    {
      $project : {
        name : 1,
        registered : 1,
        favoriteFruit : 1,
        _id : 0
      }
    }
]





// 12.) Categorize users by their favourite fruit.

[
    {
      $group : {
        _id : "$favoriteFruit",
        users : {
          $push : "$name" 
        }
      }
    }
]





// 13.) How many users have 'ad' as the second tag in their list of tags ?

[
    {
      $match : {
        "tags.1" : "ad"
      }
    },
  
    {
      $count : 'secondTag-Ad'
    }
]





// 14.) Find users who have both 'enim' and 'id' as their tags.

[
    {
      $match : {
        tags : {
          $all : ['enim', 'id']
        }
      }
    }
]





// 15.) List all the companies located in the USA with their corresponding user count.

[
    {
      $match : {
        "company.location.country" : "USA"
      }
    },
  
    {
      $group : {
        _id : "$company.title",
        userCount : {
          $sum : 1
        }
      }
    }
]