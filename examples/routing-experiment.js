/*
let, var, const -> https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/

switch -> you can use it to "switch" between cases when value equates to something
*/

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200; // I default to 200 unless there's an error

    // different cases of requested routes
    let path = './static/';
    switch(req.url) {
        case '/':
            path += 'example.html';
            break;
        case '/hidden':
            path += 'example2.html';
            break;
        // a redirect using "Location:" header
        case '/admin':
            res.statusCode = 302;
            res.setHeader('Location', '/')
            res.end() // I just send it already since there's no document that need to be returned
            break;
        // default case when nothing above is met
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(path, (err,data) => {
        if (err) {
            console.log('ERROR! Could not read ' + path);
            res.statusCode = 500;
            res.write('500!');
            res.end();
        }
        if (!err) {
            res.end(data);
        }
    });

    // log the entire request process
    console.log(req.socket.remoteAddress, req.method, req.url, res.statusCode);
});

const port = 3000
const interface = '192.168.254.129'
server.listen(port, interface, () => {
    console.log('listening on port ' + port + ' on ' + interface + ' interface');
});
