const fs = require('fs');
let FILE_NAME = './assests/order.json';

let orderRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let orders = JSON.parse(data);
        orders.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(orders), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let orders = JSON.parse(data);
        let index = orders.findIndex((p) => p.id == id);
        if (index != 1) {
          orders.splice(index, 1);
          fs.writeFile(FILE_NAME, function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  },
  updateStatus: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let orders = JSON.parse(data);
        let order = orders.find((p) => p.id == id);
        if (order) {
          if (
            newData.deliveryStatus == 'placed' ||
            newData.deliveryStatus == 'packed' ||
            newData.deliveryStatus == 'dispatched' ||
            newData.deliveryStatus == 'delivered'
          ) {
            Object.assign(order.deliveryStatus, newData.deliveryStatus);
            fs.writeFile(FILE_NAME, JSON.stringify(orders), function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(newData);
              }
            });
          }
        }
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let orders = JSON.parse(data);
        let order = orders.find((p) => p.id == id);
        if (order) {
          Object.assign(order, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(orders), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  getByDate: function (date, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let orders = JSON.parse(data).filter((p) => p.date == date);
        resolve(orders);
      }
    });
  },
};
module.exports = orderRepo;
