// this is an example module

const payloads = ['command injection', 'SQL injection', 'XSS', 'XXE'];
const names = ['alice', 'bob', 'charlie'];


// exporting payloads
module.exports = {
    payloads, names
};
// // same as
// module.exports = {
//     payloads: payloads,
//     names: names
// };