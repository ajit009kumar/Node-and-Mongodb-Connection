var { Employee } = require('./../../server/models/employee');
const elasticsearch = require('elasticsearch');
const mongoosastic = require('mongoosastic');



Employee.esSearch({
    query: {
        match: {
            name: "  Rishu  "
        }
    }
},function(err,res) {
    console.log('employee search======>', res);
});


Employee.esSearch({
    query: {
        bool: {
            must: {
                match: {
                    email: 'rishu13raj@gmail.com'
                }
            }
        }
    }
},function(err,res) {
    console.log('Employee Email search response', res.hits.hits);
});


// Employee.esSearch({
//     query: {
//             match: {
//                 state: "  Bihar  "
//             }
//         }
// },function(err,res) {
//     console.log('Employee state search', res.hits.hits);
// });



// Employee.esDelete({
//     query: {
//         match: {
//             name: '"Rishu raj'
//         }
//     }
// },function(err,res) {
//     console.log('delete request', res);
// });

