const color = require('colors');

/**
* Create middleware that reports information about the incoming http request
* Certain elements will be objects(body, etc), display the key value pairs
* Items to report iff they have value, use colors (an external module):
*                 method
*                 hostname
*                 ip
*                 body
*                 params
*                 protocol
*                 route
*                 path
*                 query
*/


module.exports = function (request, response, next) {
  // if (request.method) {
  //   console.log(request.method);

  // }
  // console.log(request.protocol);
  const keys = ['method', 'hostname', 'ip', 'body', 'params', 'path', 'protocol', 'route', 'query'];

  keys.forEach(key => {
    const data = request[key];

    if (data) {

      // console.log('key', data, key);

      if (typeof data === 'object') {
        // do object things
        if (Object.keys(data).length) {
          console.log(color.red(`The request ${key} object has the following properties: `));



          for (const [k, v] of Object.entries(data)) {
            // const array = [1, 'value'];

            // const [k, v] = array;
            // // const k = array[0];
            // // const v = array[1];
            // console.log(k, v);
            console.log(color.blue(`\t${k} => ${v}`));
          }
        }
      } else {
        console.log(color.gray(`The request ${key} is ${data}`));
      }
    }
  });

  next();
};
