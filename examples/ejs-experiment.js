/*
ejs -> templating engine for node
- it runs javascript within a template on the server-side
*/

const express = require('express');
const app = express();

// specify templating engine for express app
app.set('view engine', 'ejs');
app.set('views', 'myviews'); // specify "views" folder which is "views" by default

// we no longer return a file, we render a template
app.get('/', (req, res) => {
    const posts = [
        { heading: 'test1', text: 'fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus' },
        { heading: 'test2', text: 'fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus' },
        { heading: 'test3', text: 'fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus' }
    ];
    res.render('index', { posts });
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

app.get('/ip', (req, res) => {
    res.render('ip', { ip: req.ip });
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

app.get('/login', (req, res) => {
    res.render('login');
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

app.get('/admin', (req, res) => {
    res.redirect('/');
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

app.use((req, res) => {
    res.status(404).render('404');
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

const port = 3000;
const interface = '192.168.254.129';
app.listen(port, interface);
console.log(`listening on http://${interface}:${port}`)
