// run `node index.js` in the terminal
const express = require('express');
let orderRepo = require('./repos/orderRepo');

let app = express();

let router = express.Router();

app.use(express.json());

// Get all orders
router.get('/', function (req, res, next) {
  orderRepo.get(
    function (data) {
      res.status(200).json({
        status: 200,
        StatusText: 'OK',
        message: 'All Fruits Retrieved',
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});
// Add new Order
router.post('/add', function (req, res, next) {
  orderRepo.insert(
    req.body,
    function (data) {
      res.status(201).json({
        status: 201,
        StatusText: 'Created',
        message: 'New Order Added to the List',
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});
// Delete a record
router.delete('/delete/:id', function (req, res, next) {
  orderRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        res.status(204).json({
          status: 204,
          StatusText: 'Deleted',
          message: 'Order with ' + req.params.id + ' is Deleted',
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: 'Not Found',
          message: 'Order with id ' + req.params.id + ' not found',
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});
// update order
router.put('update/:id', function (req, res, next) {
  orderRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        orderRepo.update(req.body, req.params.id, function (data) {
          res.status(200).json({
            status: 200,
            StatusText: 'Updated',
            message: 'Order with id ' + req.params.id + ' updated',
            data: data,
          });
        });
      } else {
        res.status(404).json({
          status: 404,
          StatusText: 'Not Found',
          message: 'Order by ID ' + req.params.id + ' not Found',
          error: {
            code: 'Not found',
            message: 'Order by ID ' + req.params.id + ' not Found',
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});
//updateStatus
router.put('updateStatus/:id', function (req, res, next) {
  orderRepo.getById(
    req.params.id,
    function (data) {
      if (data) {
        orderRepo.updateStatus(req.body, req.params.id, function (data) {
          res.status(200).json({
            status: 200,
            StatusText: 'Updated',
            message: 'Order with id ' + req.params.id + ' updated',
            data: data,
          });
        });
      } else {
        res.status(404).json({
          status: 404,
          StatusText: 'Not Found',
          message: 'Order by ID ' + req.params.id + ' not Found',
          error: {
            code: 'Not found',
            message: 'Order by ID ' + req.params.id + ' not Found',
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});
//Check Capacity
router.get('/checkCapacity/:date', function (req, res, next) {
  orderRepo.getByDate(
    req.params.date,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          StatusText: 'OK',
          message: 'Orders retrieved',
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          StatusText: 'Not Found',
          message: 'No Orders',
          error: {
            code: 'Not found',
            message: 'No Orders',
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});
app.use('/api/', router);
var server = app.listen(5000, function () {
  console.log('Node server 2');
});
console.log(`Hello Node.js v${process.versions.node}!`);
