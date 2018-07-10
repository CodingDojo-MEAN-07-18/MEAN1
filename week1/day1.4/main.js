var index;
var myVar = 'this is a string';

var thing = 'this is a thing';
console.log(thing);

thing = 45;

console.log(thing);

var array = ['cow', 'fish', 'horse'];


array.push('cat');
array.unshift('dog');
// console.log(array);

// console.log('index is ====>>>>', index)

// for (let index = 0; index < array.length; index++) {
//   console.log('this is the index', index);
//   console.log('content at index is ' + array[index]);
// }
// console.log('index after loop', index);

// function newScope() {

// }

// newScope();


// for (var element in array) {
//   console.log('element is ', array[element]);
// }

// for (var element of array) {
//   console.log('for of:: element is ' + element);
// }

// var person = ['Jason', 12, 'brown'];

// console.log('Hello ' + person[0]);

var person = {
  name: 'Jason',
  age: 12,
  eyeColor: 'brown',
  key: 'do I exist?'
};


// console.log('Hello ' + person['name']);

// for (var key in person) {
//   console.log('key is ' + key);
//   console.log('value is :: ' + person[key]);
// }



function sayHello(name, ...rest) {
  // console.log(arguments);
  console.log(rest);
  console.log(`Hello ${name}`);
}

sayHello('Jason', true, 'cats');
