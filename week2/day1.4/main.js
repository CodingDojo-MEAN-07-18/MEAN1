

// function doStuff(callback) {
//   console.log('doing stuff');
//   console.log(callback);

//   // callback();
//   if (typeof callback === 'function') {
//     callback();
//   } else {
//     console.log('callback is not a function');
//   }

// }


// doStuff(function () {

//   console.log('more exciting');
// });



// function add10(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     results.push(array[index] + 10);
//   }

//   return results;
// }

// function addHello(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     results.push('Hello ' + array[index]);
//   }

//   return results;
// }
function map(array, callback) {
  const results = [];

  console.log('cb', callback.toString());

  for (let index = 0; index < array.length; index++) {
    // tranform data
    results.push(callback(array[index], index, array));

  }

  return results;
}

// const numArray = [1, 2, 4, 4, 5, 6, 7, 7];
// const strArray = ['Bob', 'Jason', 'Sally'];
// // const nums = add10(numArray);
// // const hello = addHello(strArray);
// const nums = map(numArray, function (element) {
//   console.log('inside nums callback', element);

//   return element + 10;
// });
// const hello = map(strArray, function (element) {
//   return `Hello ${element}`;
// });
// console.log('nums', nums, numArray);
// console.log('hello', hello);

console.log('before');

function sayHello(name) {
  setTimeout(function () {
    console.log(`Hello ${name}`);
  }, 2000);

  // more content to run in current scope
}

// sayHello('Jason');

console.log('after');


function getThingsFromDB(query, callback) {
  console.log(query);

  return setTimeout(function () {
    const data = ['thing1', 'thing2', 'thing3'];

    console.log('in the future', callback);
    callback(data);
    // return data;
  }, 3000);
}


getThingsFromDB('select * from things;', function (things) {
  console.log('getting db callback', things);

  things.forEach(thing => console.log(thing));
});

// setTimeout(() => {
//   console.log('things ', things.data);
// }, 3000);
