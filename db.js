require('dotenv').config();
const Sequelize = require('sequelize');

if (process.env.ENV == 'Production') {
  // TODO: Connect to real production database
  var sequelize = new Sequelize('sqlite:productiondb');
} else {
  var sequelize = new Sequelize('sqlite:testdb', {
    logging: false
  });
}

module.exports = (function() {
  require('dotenv').config();
  let data = {
    // All models most be imported here
    User: sequelize.import('models/user.js'),
    sequelize: sequelize,
    Sequelize: Sequelize
  };
  sequelize.sync();
  return data;
}());
