function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'A large tarp',
          directions: function() { return 'cover the floor' }
        }
      };

      if (item in warehouse) {
        resolve(warehouse[item]);
      }
      else {
        reject(new Error(`Item ${item} is out of stock`));
      }

    }, deliveryTime);
  });
}

function receivedItem(item) {
  console.log(`Received ${item.product}, time to ${item.directions()}`);
}


const paint = orderSupplies('paint');
const tarp = orderSupplies('tarp');
const brush = orderSupplies('brush');
const roller = orderSupplies('roller').catch(handleError);

function handleError(error) {
  console.log(error.message);
}

Promise.all([tarp, paint, brush])
  .then(items => {
    items.forEach(receivedItem);
  })
  .catch(handleError);

// tarp
//   .then(item => {
//     receivedItem(item);

//     return paint;
//   })
//   .then(receivedItem)
//   .then(() => brush)
//   .then(receivedItem)
//   .then(() => roller)
//   .then(receivedItem)
//   .catch(error => {
//     // handle error
//     console.log(error.message);
//   });


// orderSupplies('paint', function (item) {
//   receivedItem(item);

//   orderSupplies('brush', receivedItem);
// });



// let havePaint = false;

// orderSupplies('paint', function (item) {
//   receivedItem(item);

//   havePaint = true;
// });

// orderSupplies('brush', function (item) {
//   if (havePaint) {
//     receivedItem(item);
//   } else {
//     const timer = setInterval(function () {
//       console.log('checking for paint....');
//       if (havePaint) {
//         receivedItem(item);
//         clearInterval(timer);
//       }
//     }, 100);
//   }
// });

// orderSupplies('brush', handleBrush);

// function handleBrush(item) {
//   if (havePaint) {
//     return receivedItem(item);
//   }

//   console.log('... checking for brush', item);
//   setTimeout(handleBrush, 100, item);
// }


// function setTimeout(callback, timeout, ...everything) {
//   // in timeout milliseconds do thi

//   callback.apply(null, everything);
// }


// let havePaint = false;
// let haveBrush = false;

// orderSupplies('paint', function (item) {
//   console.log('got paint');
//   receivedItem(item);

//   if (haveBrush) {
//     // do something
//     return receivedItem(haveBrush);
//   }

//   havePaint = item;
// });

// orderSupplies('brush', function (item) {
//   console.log('checking for things....');
//   if (havePaint) {
//     return receivedItem(item);
//   }

//   haveBrush = item;
// });


// const paint = new Promise(function (resolve, reject) {
//   console.log('ordering paint');

//   orderSupplies('paint', resolve);
// });

// const brush = new Promise(function (resolve, reject) {
//   console.log('ordering brush');

//   orderSupplies('brush', resolve);
// });

// const tarp = new Promise(function (resolve, reject) {
//   console.log('ordering tarp');

//   orderSupplies('tarp', resolve);
// });

// tarp
//   .then(function (item) {
//     receivedItem(item);
//     return paint;
//   })
//   .then(function (item) {
//     receivedItem(item);
//   })
//   .then(function () {
//     return brush
//   })
//   .then(receivedItem)
//   .catch(function (_error) {
//     // eventually
//   });

