/*
streams -> start using data before it has finished loading
- stream gets "bits" of data each called a buffer

questions:
- what are duplex streams and how do they work?
*/

const fs = require('fs');

const readStream = fs.createReadStream('./static/large-file-for-testing.txt');
// const readStream = fs.createReadStream('./large-file-for-testing.txt', { encoding: 'utf-8'}); // using it this way makes it print data without using toString()
const writeStream = fs.createWriteStream('/tmp/out.txt');

// a better method that does what's written below under the hood
readStream.pipe(writeStream);

// the "on" is an event listener which listens for a "data" event. Thus, executes every time we get a "buffer" of data
readStream.on('data', (chunk) => {
    console.log('='.repeat(25) + '[ NEW CHUNK ]' + '='.repeat(25));
    console.log(chunk);
    // console.log(chunk.toString());
    // every time we get a chunk, it gets written to the write stream file
    writeStream.write(chunk);
});

