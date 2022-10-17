const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/posts')

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

app.get('/post', (req, res) => {
    res.render('post-form');
});

app.post('/post', (req, res) => {
    if (req.body.heading && req.body.heading != '' && req.body.text && req.body.text != '' ) {
        const post = new Post({
            heading: req.body.heading,
            text: req.body.text
        });
    
        post.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('500')
        });
    } else {
        res.redirect('/');
    }
});

// find posts via id URI parameter
app.get('/post/:id', (req, res) => {
    const id = req.params.id; // get id value from URI
    
    Post.findById(id)
    .then((result) => {
        res.render('singlePost', { post: result });
    })
    .catch((err) => {
        res.redirect('/');
    })
});

// delete post via id URI parameter
app.delete('/post/:id', (req, res) => {
    const id = req.params.id; // get id value from URI
    
    Post.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/' }); // return JSON response to fetch telling to redirect main thread
    })
    .catch((err) => {
        console.log(err);
    });
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

app.use((req, res) => {
    res.status(404).render('404');
});
