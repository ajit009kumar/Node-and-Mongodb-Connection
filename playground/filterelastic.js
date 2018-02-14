GET /courses/_search
{
  "query": {
    "bool": {
      "filter": {
        "match":{
           "name": "accounting"   
        }
      }
    }
  }
}


//----------------------------------------------------->

GET /courses/_search
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "must":[
             {"match": {"professor.name": "bill"}},
             {"match": {"name": "accounting"}}
            ],
           "must_not":[
              {"match": {"room": "e7"}}
             ]
        }
      }
    }
  }
}


//other way of writing the second query

GET /courses/_search
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "must":[
             {"match": {"professor.name": "bill"}},
             {"match": {"name": "accounting"}}
            ]
        }
      },
      "must": [
        {"match": {
          "room": "e3"
        }}
      ]
    }
  }
}

//

GET /courses/_search
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "must":[
             {"range": {
               "students_enrolled": {
                 "gte":12
               }
             }
             }
            ]
        }
      },
      "should": [
        {"match": {
          "room": "e3"
        }}
      ]
    }
  }
}

//-------------------------------------------------------------->


GET /courses/_search
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "must":[
             {"range": {
               "students_enrolled": {
                 "gte":12
               }
             }
             }
            ]
        }
      },
      "should": [
        {"match": {
          "room": "e3"
        }
        },
         {"range": {
               "students_enrolled": {
                 "gte":13,
                 "lte": 14
               }
             }
          },
          {
            "multi_match": {
              "query": "market",
              "fields": ["name","course_description^2"]
            }
          }
      ]
    }
  }
}


//------------------------------------------------------------>

GET /vehicles/cars/_search
{
  "from": 0, 
  "size": 5,
  "sort": [
    {
      "price": {
        "order": "desc"
      }
    }
  ], 
  "query": {
    "match_all": {} 
  }
  
}
  

//======================aggregation=====================>



GET /vehicles/cars/_count
{
 "query": {
   "match": {
     "make": "dodge"
   }
 }
}
  
//===================aggregation================================>

GET /vehicles/cars/_search
{
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "avg_price": {
         "avg": {
           "field": "price"
         }
       }
     }
   }
 }
}
  

//=============================aggregation===============================================>


GET /vehicles/cars/_search
{
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "avg_price": {
         "avg": {
           "field": "price"
         }
       },
       "max_price":{
         "max": {
           "field": "price"
         }
       },
       "min_price":{
         "min": {
           "field": "price"
         }
       }
     }
   }
 }
}
  
//--------------------------------------------------------->

GET /vehicles/cars/_search
{
  "query": {
    "match": {
      "color": "red"
    }
  }, 
  
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "avg_price": {
         "avg": {
           "field": "price"
         }
       },
       "max_price":{
         "max": {
           "field": "price"
         }
       },
       "min_price":{
         "min": {
           "field": "price"
         }
       }
     }
   }
 }
}
  
//-====================================================>

GET /vehicles/cars/_search
{
  "size": 0, 
  "query": {
    "match": {
      "color": "red"
    }
  }, 
  
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "stats on price": {
         "stats": {
           "field": "price"
         }
       }
     }
   }
 }
}
  



GET /vehicles/cars/_search
{
  "size": 0, 
  "query": {
    "match": {
      "color": "red"
    }
  }, 
  
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "stats on price": {
         "stats": {
           "field": "price"
         }
       }
     }
   }
 }
}

//------------------------------------------------------------------------------->
  


GET /vehicles/cars/_search
{
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "sold_date_range": {
         "range": {
           "field": "sold",
           "ranges": [
             {
               "from": "2016-01-01",
               "to": "2016-05-18"
             },
             {
               "from": "2016-05-18",
               "to": "2017-01-01"
             }
           ]
         }
       }
     }
   }
 }
}


//==================================================================>

GET /vehicles/cars/_search
{
 "aggs": {
   "popular_cars": {
     "terms": {
       "field": "make.keyword"
     },
     "aggs": {
       "sold_date_range": {
         "range": {
           "field": "sold",
           "ranges": [
             {
               "from": "2016-01-01",
               "to": "2016-05-18"
             },
             {
               "from": "2016-05-18",
               "to": "2017-01-01"
             }
           ]
         },
         "aggs": {
           "avg_price": {
             "avg": {
               "field": "price"
             }
           }
         }
       }
     }
   }
 }
}
  

//========================================================>

GET /vehicles/cars/_search
{
 "aggs": {
   "cars_condition": {
     "terms": {
       "field": "condition.keyword"
     },
     "aggs": {
       "avg_price": {
         "avg": {
           "field": "price"
         }
       }
     }
   }
 }
}
    

//===========================================================>

GET /vehicles/cars/_search
{
 "aggs": {
   "cars_condition": {
     "terms": {
       "field": "condition.keyword"
     },
     "aggs": {
       "avg_price": {
         "avg": {
           "field": "price"
         }
       },
       "make":{
         "terms": {
           "field": "make.keyword"
         },
         
         "aggs": {
           "min_price": {
             "min": {
               "field": "price"
             }
           },
           "max_price":{
            
            "max": {
              "field": "price"
            }
             
           }
         }
        
       }
     }
   }
 }
}
    
//=====================================================================>

GET /vehicles/cars/_search
{
  "size": 0, 
  "query": {
    "match": {
      "color": "red"
    }
  }, 
  
 "aggs": {
   "cars_condition": {
     "terms": {
       "field": "condition.keyword"
     },
     "aggs": {
       "avg_price": {
         "avg": {
           "field": "price"
         }
       },
       "make":{
         "terms": {
           "field": "make.keyword"
         },
         
         "aggs": {
           "min_price": {
             "min": {
               "field": "price"
             }
           },
           "max_price":{
            
            "max": {
              "field": "price"
            }
             
           }
         }
        
       }
     }
   }
 }
}
    
  