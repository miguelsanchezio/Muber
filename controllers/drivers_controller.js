const mongoose = require('mongoose');
const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    const { lgn, lat } = req.query;
    
    Driver.geoNear(
      { type: 'Point', coordinates: [lgn, lat] },
      { spherical: true, maxDistance: 200000 }
    )
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const id = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(id, req.body)
      .then(() => Driver.findById({ _id: id }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const id = req.params.id;
  
    Driver.findByIdAndRemove(id)
      .then(driver => res.send(driver))
      .catch(next);
  }
};