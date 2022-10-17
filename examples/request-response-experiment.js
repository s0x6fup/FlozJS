/*
remote IP: https://www.abstractapi.com/guides/how-to-get-a-client-ip-address-in-node-js
*/

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // logs important request information
    console.log(req.socket.remoteAddress, req.method, req.url);

    // set headers
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Set-Cookie', 'session=session-cookie-123');

    // // write to the response body
    // res.write('<script>alert(document.cookie)</script>');
    const file = './static/example.html'
    fs.readFile(file, (err,data) => {
        if (err) {
            console.log('ERROR! Could not read ' + file);
        }
        if (!err) {
            // send response
            // res.write(data); // how it can be done originally
            res.end(data); // if it's a single document you can send it via end()
        }
    });
});

const port = 3000
const interface = '192.168.254.129'
server.listen(port, interface, () => {
    console.log('listening on port ' + port + ' on ' + interface + ' interface');
});
