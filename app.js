const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

// app config
const app = express();
const port = 3000;
const interface = '127.0.0.1';
app.set('view engine', 'ejs');
app.set('views', 'views');


// connect to database
const dbUrl = 'mongodb://root:asdfasdfasdf@127.0.0.1/myapp'; 
mongoose.connect(dbUrl)
    .then((result) => {
        console.log('connected to mongodb');
        app.listen(port, interface);
        console.log(`listening on http://${interface}:${port}`)
    })
    .catch((err) => console.log(err));

// session handling
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir76a7",
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false
    },
    resave: false
}));

// routers
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');


// request handling
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use(userRoutes);

app.get('/', (req, res) => {
    res.redirect('/post');
});

// app.post('/test', (req, res) => {
//     // let user = JSON.parse(req.body);
//     let user = req.body
//     console.log(user);
//     console.log(user.sneaked);
//     let baseTest = { picture: '/tmp/test.png' };
//     let newTest = Object.assign( baseTest, user);
//     console.log(newTest.sneaked);
//     // console.log(newTest)
//     res.render('test');
// });

// app.get('/test', (req, res) => {
//     let test = req.query;
//     console.log(test)
//     res.render('test');
// });

app.use(express.static('public'));

app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});
