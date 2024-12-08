const { Sequelize } = require('sequelize');

const database = 'postgres';
const username = 'postgres';
const password = 'changeme';
const host = 'localhost';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

module.exports = {
  sequelize,
};
