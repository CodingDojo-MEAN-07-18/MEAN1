

function Person(name, items) {

  // this = {};
  if (!(this instanceof Person)) {
    console.log('I am not a person', name)
    return new Person(name, items);
  }

  this.name = name;

  // console.log(this);

  this.items = items;
  // this.take = take;



  // return this;
  // return { name } ;
}

Person.prototype.take = function take(item, target) {

  console.log(' calling take ', this.name);
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target must have an items array');
  }

  // carry on with code
  for (let index = 0; index < target.items.length; index++) {
    if (item === target.items[index]) {
      // true, found item
      console.log(item);
      this.items.push(item);

      // slice -- makes a copy of items ['gold' ] ['gold', 'lint', 'cookies']
      // splice -- removes from array  ['gold' ] ['lint', 'cookies'] => []
      target.items.splice(index, 1);

      return true;
    }
  }

  return false;
};


//
const bob = Person('Bob', ['phone', 'keys', 'cash']);
const sally = new Person('Sally', ['gold', 'lint', 'cookies']);

console.log(bob);
console.log(sally);

bob.take('gold', sally);
sally.take('gold', bob);

console.log(bob);
console.log(sally);

const backpack = {
  items: ['map', 'snacks', 'compass'],
};

console.log(backpack);

bob.take('snacks', backpack);
console.log(backpack);

sally.take.apply(backpack, ['snacks', bob]);

console.log(bob);
console.log(sally);
console.log(backpack);
