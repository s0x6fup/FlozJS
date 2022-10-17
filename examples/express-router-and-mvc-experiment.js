/*
# express router:
- can be used to manage routes more efficiently (less spaghetti code)
- can group types of routes (example: routes that handle posts)
- makes the project muich more modular and easier to update
- routes are in the routes/ folder

# MVC:
- Model View Controller
- a way to structure code and files
- keeps code modular, reusable and readable
## controllers
(model) -> [controller] -> (view)
- now we have all folders needed, models/, views/ (myviews), controllers/,


what is essentially done is a complete seperation of the router and controller logics
*/

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/posts');
const postRoutes = require('./routes/postRoutes'); // we import the routes we created

// some handy methods
// Post.findById()
// Post.find().sort()

const app = express();
const port = 3000;
const interface = '192.168.254.129';

const dbUrl = 'mongodb://root:asdfasdfasdf@127.0.0.1/myapp'; 
mongoose.connect(dbUrl)
    .then((result) => {
        console.log('[+] connected to mongodb');
        app.listen(port, interface);
        console.log(`[+] listening on http://${interface}:${port}`)
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', 'myviews');

// middleware
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true })); // request body parser middleware -> access data via req.body object

// post routes with /post prefix
app.use('/post', postRoutes); // we use the post routes as middleware

app.get('/', (req, res) => {
    Post.find()
    .then((result) => {
        res.render('index', { posts: result });
    })
    .catch((err) => {
        console.log('err');
        res.status(500).send('500')
    });
});

app.use((req, res) => {
    res.status(404).render('404');
});
