/*
search packages:
https://www.npmjs.com/

installing package globally:
npm install -g nodemon

- nodemon helps in web developement by not requiring the developer to restart the app each time manually

package.json:
- project dependencies
- create via "npm init"

install package locally: // it is installed only on the project
npm install lodash
- you'll see that "lodash" was added as a dependency
- lodash has a lot of cool methods
- documentation: https://lodash.com/docs/4.17.15

installing cloned project (Git) packages:
- if the project has "package.json", all you have to do is run "npm install" and it will install all the dependencies

last notes:
- npm packages can be imported to the browser V8 engine as well!
*/

// lodash
const _ = require('lodash');
const num = _.random(0, 65535); // choosing random port number
const listener_port = _.once(() => {
    console.log('port ' + num);
});

// will be executed only once
listener_port();
listener_port();
