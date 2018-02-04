
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

// let data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc');
// console.log(token);

// let decoded = jwt.verify(token, '123abc');
// console.log('decoded',decoded);


let password = 'password123!';

bcrypt.genSalt(10, ( err, salt ) => {
    bcrypt.hash( password, salt , (err, hash) => {
        console.log(hash);
    });
});

let hashedPassword = '$2a$10$yaAu5lOJybfJMs1rz9oRk.rWT4QMq5uXSaZhFtHYT2FXkeLDoqh32';

bcrypt.compare( password, hashedPassword , (err,res) => {
        console.log(res);
});


