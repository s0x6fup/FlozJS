const fs = require('fs')

// read files
// first argument is a file, second argument is a function that will fire once the file reading is complete
// the function takes in an error message and the data received
fs.readFile('/etc/passwd', (err, data) => {
    if (err) {
        console.log(err);
    };
    if (data) {
        // the data we get is the buffer
        console.log(data);

        // logging the actual data
        console.log(data.toString());
    };
});

console.log('this was printed first since readFile is asynchronous and takes longer execute');

// writing files
fs.writeFile('/tmp/file1.txt', 'Wassup\n', (err) => {
    if (err) {
        console.log(err);
    }
    if (!err) {
        console.log('file created');
    }
});

// deleting files
const file = '/tmp/file1.txt';
if (fs.existsSync(file)) {
    fs.unlink(file, (err) => {
        if (err) {
            console.log(err);
        }
        if (!err) {
            console.log(file + ' was deleted');
        }
    });
}

// directories
if (!fs.existsSync('/tmp/assets')) { // check if exists, otherwise mkdir will raise an error
    fs.mkdir('/tmp/assets', (err) => { // make a directory
        if (err) {
            console.log(err);
        }
        if (!err) {
            console.log('directory created');
        }
    });
} else {
    fs.rmdir('/tmp/assets', (err) => {
        if (err) {
            console.log(err);
        }   
        if (!err) {
            console.log('directory deleted');
        }
    });
}

