// bringing in express 
const express = require('express');

const logger = require('./middleware/logger')
// want to bring in path module (a node js module that deals with file paths)
const path = require('path')


// adding express handle bars => can be found in handlebar documentation
const exphbs = require('express-handlebars');


// want to take our members and put them in our views template
const members = require('./Members')

// initalize express
const app = express();


// initalize middleware
// logs hello in the terminal after every server call (i.e. every time the page refreshes)
//app.use(logger)

// need to add handlebar middleware => recall: middleware lets us manipulate requests and response data
// first thing to create middleware is set the engine
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // setting template view engine to handle bars, then passing in our handle bars that has a default file name layout of main (e.g. main.handlebars)
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'))


// to create a route => want to use app.(whatever type of request)
/**app.get('/', (req, res) => {
     can add html if you want
     //res.send('<h1> Why wont this work????? does it automatically update when i save?</h1> ');
     get current directory with __ dirname, go into public folder, then go into index.html file
     here we are rendering the index file (i.e. server side rendering (SSR)) => however, not ideal, since then you'd have to create a path for each html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});*/


// need a body parser middleware for post requests => now express has one built in
// allows us to handle raw json data => get an output in the body while using postman website (i.e. test mock server)
app.use(express.json());

// allows to handle url encoded data (e.g. html forms)
app.use(express.urlencoded({extended: false}))

// to render your index handlebar from views directory
//app.get('/', (req, res) => res.render('index'));


// instead of hard coding the values for layout, we can pass them as variables
app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members: members,
}));


// instead of routing to each static file, can route directly to a static folder 
// to call a static file want to call express object  through .use
app.use(express.static(path.join(__dirname, 'public')));

// members api route
app.use('/api/members', require('./routes/api/members'));

// typically won't use express for this => will mostly apis or render templates where you can include dynamic data instead of a static site


// need to listen in a port
// purpose of .env is because when the server runs, it may not be on PORT 5000, just want to make sure it is in a port
const PORT = process.env.PORT || 5000;

// add port to listener and adding a callback function that console logs port number 
app.listen(PORT, () =>console.log(`Server started on port ${PORT}`));