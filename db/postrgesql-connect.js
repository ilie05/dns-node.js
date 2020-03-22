const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', 'qweasd', { host: 'localhost', dialect: 'postgres' });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit();
  });

module.exports = sequelize;
