const { Sequelize } = require('sequelize');
const { database } = require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    }
);

module.exports = sequelize;