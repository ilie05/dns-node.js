const Sequelize = require('sequelize');
const sequelize = require('../db/postrgesql-connect');

class Domain extends Sequelize.Model {}

Domain.init({
  // attributes
  oldDomain: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  newDomain: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ipAddress: {
    type: Sequelize.STRING,
  }
}, {
  // options
  sequelize,
  modelName: 'domain'
});

Domain.beforeCreate(async () => {
  // fetch ip
});

Domain.sync();

module.exports = Domain;
