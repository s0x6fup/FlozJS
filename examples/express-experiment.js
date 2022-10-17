/*
framework that helps handling routing, requests, responses, etc. In a much more elegant way
*/

const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
    // will by default look for absolute path, we overcome this by specifying the "__dirname" as the root of the file
    res.sendFile('./static/example.html', { root: __dirname });
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

app.get('/hidden', (req, res) => {
    res.sendFile('./static/example1.html', { root: __dirname });
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

// listen for requests
const port = 3000;
const interface = '192.168.254.129';
app.listen(port, interface);
console.log(`listening on http://${interface}:${port}`)

// redirects
app.get('/admin', (req, res) => {
    res.redirect('/');
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});

// 404 error handler (should be at the bottom)
// use and middleware in express
// why this will trigger? if none of the routes ABOVE triggers then this will trigger
// use means -> use this for ANY request
// if this will be above a legit route, it will fire since all above it wont execute and this one will execute for every request
app.use((req, res) => {
    res.statusCode = 404;
    res.sendFile('./static/404.html', { root: __dirname });
    console.log(req.ip, Date(), req.method, req.url, res.statusCode);
});
