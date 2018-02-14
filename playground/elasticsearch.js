GET /courses/_search
{
  "query": {
    "bool": { 
    "must": [
    {"match": {"name": "accounting"}}
    ],
    
    "must_not": [
      {
        "match": {"professor.name": "bill"}
        
      }
    ]
    , "should": [
      {
        "match": {
          "room": "e7"
        }
      }
    ],
    "minimum_should_match": 1
  }
  }
}

// Multi match matching on more than one field

GET /courses/_search
{
  "query": {
    "multi_match": {
      "query": "accounting",
      "fields": ["name", "professor.department"]
    }
  }
}


// matching the phrase .

GET /courses/_search
{
  "query": {
    "match_phrase": {
      "course_description": "from the business school on the introduction to accounting"
    }
  }
}


//partial token can be figure out using match_phrase_prefix.

GET /courses/_search
{
  "query": {
    "match_phrase_prefix": {
      "course_description": "from the business school on the introduction to accou"
    }
  }
}


//range query --------------------------------------->

GET /courses/_search
{
  "query": {
    "range": {
      "students_enrolled": {
        "gte": 10,
        "lte": 30
      }
    }
  }
}


GET /courses/_search
{
  "query": {
    "range": {
      "students_enrolled": {
        "gt": 10,
        "lt": 30
      }
    }
  }
}



//Nested queries with must,must_not,shuould,range

GET /courses/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "accounting"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "room": "e7"
          }
        }
      ],
      "should": [
        {
          "range": {
            "students_enrolled": {
              "gte": 10,
              "lte": 20
            }
          }
        }
      ],
      "minimum_should_match": 1
      
    }
  }
}