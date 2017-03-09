'use strict';
const router = require('express').Router();

let _registerRoutes = (routes, method) => {
  for (let key in routes) {
    if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      // Registering the keys
      if (method === 'get') {
        router.get(key, routes[key]);
      } else if (method === 'post') {
        router.post(key, routes[key]);
      } else if (method === 'put') {
        router.put(key, routes[key]);
      } else if (method === 'patch') {
        router.patch(key, routes[key]);
      } else if (method === 'delete') {
        router.delete(key, routes[key]);
      } else {
        router.use(routes[key]);
      }
    }
  }
};

let route = routes => {
  _registerRoutes(routes);
  return router;
};

module.exports = {
  route
};