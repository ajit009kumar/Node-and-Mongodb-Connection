const { SHA256 } = require('crypto-js');



let message = ' I am user number-3 ';
let hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

let data = {
    id: 4
}




let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret' ).toString()
}


//if we try to maniputate the data from the client side it fails because client do not know the secrete key here comes the use of salt which present only on server


token.data.id = 5 ;
token.hash = SHA256(JSON.stringify(token.data)).toString();


let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if ( resultHash === token.hash) {
    console.log('Data is not manipulated');
}

else {
    console.log('Data is Manipulated do not trust');
}
