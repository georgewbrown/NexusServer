require('dotenv').config();

const jwt = require('jsonwebtoken');
const sequelize = require('../db')
var Business = sequelize.import('../models/business');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (!err && decodedToken) {
        Business.findOne({ where: { id: decodedToken.id }})
          .then(business => {
            if (!business) throw 'err'
            req.business = business
            return next()
          })
          .catch(err => next(err))
      } else {
        req.errors = err
        return next()
      }
    })
  }
  
  module.exports = validateSession