const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const { debugHeader } = require('./helpers/debug')
const { startLab } = require('./helpers/lab');

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
        startLab();
        console.log(`listening on http://${interface}:${port}`);
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
const authRoutes = require('./routes/auth');
const manageRoutes = require('./routes/manage'); 
const commentRoutes = require('./routes/comment');
const contactRoutes = require('./routes/contact'); 

// request handling
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(debugHeader);

app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/contact', contactRoutes);
app.use('/auth', authRoutes);
app.use('/manage', manageRoutes);


app.get('/', (req, res) => {
    res.redirect('/post');
});

app.use(express.static('public'));

app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
});
