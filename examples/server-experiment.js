const http = require('http');

// declares the server
const server = http.createServer((req, res) => { // takes in request and response as args
    console.log('request made');
});

// for the server to work we must create a listener
const port = 3000
const interface = 'localhost'
server.listen(port, interface, () => {
    console.log('listening on port ' + port + ' on ' + interface + ' interface');
});
