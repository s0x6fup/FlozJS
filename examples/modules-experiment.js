// modules experiment

// imported the example modules
const imported_module = require('./example-module');
const imported_module_2 = require('./example-module-2');
const { payloads } = require('./example-module-2'); // similar to import X from Y in python

// imported built-in / core modules
const os = require('os')


// logging exported values
console.log(imported_module);
console.log(imported_module_2);
console.log(imported_module_2.names[0])
console.log(payloads[1])

// os module object
console.log(os.platform(), os.homedir())
