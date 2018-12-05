require('dotenv').config();

const jwt = require('jsonwebtoken');
const sequelize = require('../db')
const Business = sequelize.import('../models/business');
const Employee = sequelize.import('../models/employee');
  
  module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();   // allowing options as a method for request
    } else {
      let sessionToken = req.headers.authorization;
      if (!sessionToken || sessionToken === undefined) return res.status(403).send({ auth: false, message: "no token provided." })
      else {
          jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
              if (decoded) {
                  User.findOne({ where: { id: decoded.id } }).then(user => {
                      req.user = user;
                      next();
                  },
                      function () {
                          res.status(401).send({ error: "Not authorized" })
                      })
              } else {
                  res.status(400).send({ error: "Not authorized" })
              }
          })
      }
  }
}