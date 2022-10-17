/*
middleware:
- functions that run between request and response
- app.use(func) is an example
- we can have many occurances of middle ware app.use(func) -> app.use(func) -> app.get('/', func)
- order of middleware is important, once a response is sent the middleware chain does not continue.
- middlewares examples: requests logger, authentication, json parsing, 404 pages, etc.

third-part middleware: (for examples above)
- morgan -> requests logger -> 
*/

const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'myviews');

// // request logger middleware
// // ideally this will be async, since we want to log the response status code too, which is processed when sending a response
// app.use((req, res, next) => {
//     console.log(req.ip, Date(), req.hostname, req.method, req.path);
//     next(); // we must tell express to move to the next middleware
// });

// a middleware to route to static files within "static" directory
app.use(express.static('static'))

// morgan middleware -> it gets the response code right too :)
app.use(morgan('combined'));

app.get('/', (req, res) => {
    const posts = [
        { heading: 'test1', text: 'fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus' },
        { heading: 'test2', text: 'fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus' },
        { heading: 'test3', text: 'fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus' }
    ];
    res.render('index', { posts });
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

const port = 3000;
const interface = '192.168.254.129';
app.listen(port, interface);
console.log(`listening on http://${interface}:${port}`)
