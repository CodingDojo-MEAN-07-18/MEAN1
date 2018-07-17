

// // function doStuff(cb) {
// //   // console.log(cb.toString());

// //   if (typeof cb === 'function') {
// //     cb();
// //   } else {
// //     console.log('cb is not a function');
// //   }
// //   // cb();

// // }

// // doStuff(function () {

// //   console.log('useful');
// //  });


// function map(array, callback) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];

//     results.push(callback(element));
//   }

//   return results;
// }

// function add10(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];

//     results.push(element + 10);
//   }

//   return results;
// }

// function addHello(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];

//     results.push(`Hello ${element}`);
//   }

//   return results;
// }

// const numbers = [1, 2, 34, 54, 346, 567, 789];

// // const nums = add10(numbers);
// const nums = map(numbers, function (element) {
//   console.log('inside callback', element + 10);
//   return element + 10;
//  });

// console.log('nums ', nums);

// const names = ['jason', 'bob', 'sally'];
// // const hello = addHello(names);
// const hello = map(names, function (element) {
//   return `Hello ${element}`;
// });

// // const numsP = add10(names);
// const numsP = map(names, element => element + 100);


// console.log('hello', hello)
// console.log('numsP', numsP)



// console.log('before');

// function sayHello(name) {
//   setTimeout(function () {
//     console.log(`Hello ${name}`);
//   }, 2000);
// }

// sayHello('Jason');


// console.log('after');


function getThingsFromDB(query, callback) {
  console.log(query);
  return setTimeout(function () {
    const data = ['thing1', 'thing2', 'thing3']

    callback(data);
    // return data;
  }, 2000);
}


getThingsFromDB('select * from things;', function (things) {
  console.log('calling back to the future', things);

  things.forEach(thing => console.log(thing));
});



// console.log('things ', things.data);
