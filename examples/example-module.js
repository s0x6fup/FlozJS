// this is an example module

const payloads = ['command injection', 'SQL injection', 'XSS', 'XXE'];
console.log(payloads);

// exporting a value to be used by the imported module constant
module.exports = 'exported string';
