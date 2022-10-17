/*
nosql
- collections
- documents
- collection is a collection of documents
- each collection stores only one type of document
- document is very similar to json, key and value pairs

docker approach:
https://www.linode.com/docs/guides/set-up-mongodb-on-docker/
https://docs.docker.com/engine/reference/run/

creating user:
"""
sudo docker-compose -f docker-compose.yml up -d
"""
- creating example database
https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm
https://www.tutorialspoint.com/mongodb/mongodb_create_collection.htm
- mongosh for manual mongodb interaction if needed
- ini-mongo.js file

interacting with mongodb
- we use mongoose
- it is ODM -> Object Document Mapping library
*/

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); // our mongodb ODM
const Post = require('./models/posts')

// some handy methods
// Post.findById()
// Post.find().sort()

const app = express();
const port = 3000;
const interface = '192.168.254.129';

// connecting to the database
const dbUrl = 'mongodb://root:asdfasdfasdf@127.0.0.1/myapp'; // specifying connection to mongodb database, if it doesnt exist the database will be created once you create the first collection
mongoose.connect(dbUrl) // this task is async and takes time to complete, which is why we use then
    .then((result) => { // we wait for the database to connect only then we start the app
        console.log('connected to mongodb');
        app.listen(port, interface);
        console.log(`listening on http://${interface}:${port}`)
    })
    .catch((err) => console.log(err)); // if there's an error we catch it

app.set('view engine', 'ejs');
app.set('views', 'myviews');

app.use(morgan('dev'));
app.use(express.static('static'));

// adding a post (with a get lol)
app.get('/add-post', (req, res) => {
    const post = new Post({
        heading: 'some cool heading',
        text: 'some cool text'
    });

    post.save() // we need to "commit" this post, it is async
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {console.log(err)});
});

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

app.get('/ip', (req, res) => {
    res.render('ip', { ip: req.ip });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/admin', (req, res) => {
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('404');
});
