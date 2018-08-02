const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const port = process.env.PORT || 8000;
const { Schema } = mongoose;
const app = express();

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: 3
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
}, {
    timestamps: true
});


const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  year: Number,

  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  }
});
// collection => authors
const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);


mongoose.connect('mongodb://localhost:27017/books_authors', {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => console.log('MongoDB Connected'));

app
  .set('view engine', 'ejs')
  .set('views', path.resolve('views'))
  .use(bodyParser.urlencoded({ extended: true }))


app.get('/', function (request, response) {
  response.render('index');
});

// get all authors
app.get('/authors', function (request, response) {
  Author.find({})
    .populate('books')
    .then(authors => {
      response.render('authors/index', { authors });
    })
})
app.get('/authors/new', function (request, response) {
  response.render('authors/new');
});

app.post('/authors', function (request, response) {
  // const author = new Author({
  //   name: request.body.name,
  //   isAlive: request.boduy.isAlive
  // })

  Author.create(request.body)
    .then(author => {
      console.log('new author', author);
      response.redirect('/authors');
    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message)

      response.render('authors/new', { errors });
    });
});;


// book routes
app.get('/books', function (request, response) {
  Book.find({})
    .populate('author')
    .then(books => response.render('books/index', { books }))
    .catch(console.log);
});

app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => {
      response.render('books/new', { authors });
    })
});

app.post('/books', function (request, response) {
  Book.create(request.body)
    .then(book => {
      console.log('new book', book.toObject());


      // find author so we can update books array
      return Author.findById(book.author)
        .then(author => {
          console.log('found author ', author.toObject());

          // add new book to array
          author.books.push(book.id);

          // save returning promise
          return author.save()
        })
        .then(() => {
          // finally redirect
          response.redirect('/books')
        })
    })
    .catch(error => {

      console.log('catching errors');
      const errors = Object.keys(error.errors).map(key => error.errors[key].message)

      response.render('books/new', { errors });
    });
});

//
app.listen(port, console.log(`Express Server listening on port ${ port }`));
