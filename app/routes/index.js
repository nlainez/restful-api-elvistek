'use strict';
const h = require('../helpers');
const db = require('../db');
const mongodb = require('mongodb');

module.exports = () => {
  let routes = {
    'get': {
      // Endpoint to retrieve all products
      '/api/v1/products': (req, res, next) => {
        db.productModel.find({}, function(error, products) {
          if (error) {
            // response error
            console.log('Error when searching all users, error: ', error);
          } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(products));
          }
        });
      },

      // Endpoint to retrieve one user by its id
      '/api/v1/products/:id': (req, res, next) => {
        db.productModel.findOne({_id: new mongodb.ObjectID(req.params.id)}, function(error, product) {
          if(error) {
            console.log('Error when searching for user, error: ', error);
          } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(product));
          }
        })
      }
    },
    'post': {
      // Endpoint to create a new product
      '/api/v1/products': (req, res, next) => {
        let newElvistekProduct = db.productModel({
          product_name: req.body.product_name,
          product_price: req.body.product_price,
          product_quantity: req.body.product_quantity
        });
        newElvistekProduct.save(function (error) {
          if(error) {
            console.log('Error when creating new product', error);
          } else {
            res.status(201);
            res.setHeader('Content-Type', 'application/json');
            res.send('New product was added to database')
          }
        });
      },
      // Endpoint which performs one buy and decrements the product stock quantity 
      '/api/v1/products/:id/buy': (req, res, next) => {
        db.productModel.findByIdAndUpdate({ _id: new mongodb.ObjectID(req.params.id) }, 
        { 
          $inc: {
            product_quantity: -parseInt(req.body.product_quantity)
          }
        }, function(error) {
          if(error) {
            console.log('Error when decrementing the product stuck because of this buy. Error: ', error);
          } else {
            res.status(206);
            res.setHeader('Content-Type', 'application/json');
            res.send('Product succesfully updated');
          }
        });
      },
      // Endpoint which performs one "like" to a specific product 
      '/api/v1/products/:id/like': (req, res, next) => {
        let newElvistekLike = db.likeModel({
          product_id: req.params.id,
          user_id: "temporary_user_test"
        });
        newElvistekLike.save(function(error) {
          if(error) {
            console.log('Error when adding like to product, error: ', error);
          } else {
            res.status(201);
            res.setHeader('Content-Type', 'application/json');
            res.send('New like was added to product');
          }
        });
      }
    },
    'put': {
      // Endpoint to update a whole product
      '/api/v1/products/:id': (req, res, next) => {
        db.productModel.findByIdAndUpdate({_id: new mongodb.ObjectID(req.params.id)}, {
          product_name: req.body.product_name,
          product_price: req.body.product_price,
          product_quantity: req.body.product_quantity
        }, function(error) {
          if(error) {
            console.log('Error when updating product, error: ', error);
          } else {
            res.status(206);
            res.setHeader('Content-Type', 'application/json');
            res.send('Product succesfully updated');
          }
        })
      }
    },
    'patch': {
      // Endpoint to update a whole product
      '/api/v1/products/:id': (req, res, next) => {
        db.productModel.findByIdAndUpdate({ _id: new mongodb.ObjectID(req.params.id) }, 
        {
          $set: {
            product_price: parseFloat(req.body.product_price)
          }
        }, 
        function(error, product) {
          if(error) {
            console.log('Error when updating product, error: ', error);
          } else {
            res.status(206);
            res.setHeader('Content-Type', 'application/json');
            res.send('Product price succesfully updated');
          }
        })
      }
    },
    'delete': {
      '/api/v1/products/:id': (req, res, next) => {
        db.productModel.findOneAndRemove({_id: new mongodb.ObjectID(req.params.id)}, function (error) {
          if(error) {
            console.log('Error when removing product, error: ', error);
          } else {
            res.status(204);
            res.setHeader('Content-Type', 'application/json');
            res.send('Product succesfully removed');
          }
        });
      },
      '/api/v1/users/:id': (req, res, next) => {
        db.userModel.findByIdAndRemove({_id: new mongodb.ObjectID(req.params.id)}, function (error) {
          if(error) {
            console.log('Error when removing user, error: ', error);
          } else {
            res.status(204);
            res.setHeader('Content-Type', 'application/json');
            res.send('User succesfully removed');
          }
        });
      }
    }
  };

  return h.route(routes);
}
