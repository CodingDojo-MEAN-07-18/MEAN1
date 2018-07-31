const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/animals', {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => console.log(`Mongoose connected`));

const animalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Provide a name for your animal'],
    trim: true,
  },
  age: Number,
  numLegs: {
    type: Number,
    min: [0, 'More legs than that...'],
    required: [true, 'Provide your animal with legs']
  },
  eatsPeople: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: {
      createdAt: 'created_at',
    },
});
// future collection => animals
const Animal = mongoose.model('Animal', animalSchema);

// assume different file
// const Animal = mongoose.model('Animal');

// const o = {
//   a: 'this is a',
//   b: 'this is b',
// };
// const a = 'original a';
// const { a: notA, b } = o;
// console.log(a, b, notA );


const animal = new Animal({
  name: 'Owl',
  age: 8,
  numLegs: 7,
});


console.log(animal);


// animal.save(function (error, saved) {
//   if (error) {
//     // handle error
//     throw error;
//   }

//   // do stuff with newly saved animal

//   console.log(saved);
// });

animal.save()
  .then(function (saved) {
    // do stuff
    console.log(saved);
  })
  .catch(function (error) {
    console.log(error.errors.name.message);


    // [name, numLegs]
    // assumes validation issues
    const errors = Object.keys(error.errors)
      .map(key => error.errors[key].message);

    //   .map(key => {
    //   console.log(key);
    //   const message = error.errors[key].message;

    //   return message;
    // })


    // for (let index = 0; index < keys.length; index++) {
    //   console.log(index, keys[index]);
    //   const message = error.errors[keys[index]].message

    //   console.log(message)

    //   errors.push(message);
    // }


    console.log(errors)

    // response.render('some-page', { errors });
  });
