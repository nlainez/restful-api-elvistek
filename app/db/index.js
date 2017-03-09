'use strict';
const config    = require('../config');
const Mongoose  = require('mongoose').connect(config.dbURI);
const mongoose  = require('mongoose');

// Loggin errors if connection fails
Mongoose.connection.on('error', error => {
  console.log('MongoDB error: ', error);
});

// create schema that defines the structure for storing user data
const elvisTekUser = new Mongoose.Schema({
  user_name: String,
  user_pass: String,
  user_admin: {
    type: Boolean,
    default: false
  } 
});

// Create schema that defines the structure for storing product data
const elvisTekProducts = new Mongoose.Schema({
  product_name: String,
  product_price: Number,
  product_quantity: Number
});

// Create schema that defines the structure for storing likes data
const elvisTekLikes = new Mongoose.Schema({
  product_id: String,
  user_id: String,
  like: {
    type: Number,
    default: 1
  }
});

// Create a Schema that defines the structure for storing buys data
const elvisTekBuys = new Mongoose.Schema({
  product_id: String,
  buy_quantity: Number
});

// Create a Schema that defines the structure for storing logs data
const elvisTekLogs = new Mongoose.Schema({
  log_type: String,
  log_values: String,
  commited_at: {
    type: Date,
    // 'Date.now()' returns the current unix timestamp as a number
    default: Date.now
  }
});

// turning schemas into usable models
let userModel     = Mongoose.model('users', elvisTekUser);
let productModel  = Mongoose.model('products', elvisTekProducts);
let likeModel     = Mongoose.model('likes', elvisTekLikes);
let buyModel      = Mongoose.model('buys', elvisTekBuys);
let logModel      = Mongoose.model('logs', elvisTekLogs);

module.exports = {
  Mongoose,
  userModel,
  productModel,
  likeModel,
  buyModel,
  logModel
};