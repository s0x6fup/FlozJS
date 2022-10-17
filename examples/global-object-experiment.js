// global object experiment

// global object
// "global" object is like the "window" object within a browser
console.log(global)
console.log('\n' + '#'.repeat(100))


// timeout function 1 (using global)
global.setTimeout(() => {
    console.log('second after 3 seconds')
}, 3000);


// timeout function 1 (not specifying global since it is available out of the box)
setTimeout(() => {
    console.log('first print after 2 seconds');
}, 2000);


// executing at an interval
const inter = setInterval(() => {
    console.log('Im annoying :)');
}, 500);


// stopping an interval with stopInterval
global.setTimeout(() => {
    clearInterval(inter);
    console.log('stopped interval after 4 seconds');
}, 4000);


// get file name and directory
console.log(__filename);
console.log(__dirname);

