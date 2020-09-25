// creating a simple middleware function
// when creating middleware, takes 3 parameters: request, response, and next => always want to call next last

const moment = require('moment');
const logger = (req, res, next) => {
    // can do anything inside your middle ware => even have acces to some of the url objects
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}` ); // console.logs the webpage link with whole url
    // can add date to it by adding 3rd party package moment 
    next();
}

module.exports = logger;

