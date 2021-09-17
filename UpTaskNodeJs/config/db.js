const { Sequelize } = require('sequelize');
 
// Option 1: Passing parameters separately
const db = new Sequelize('uptasknode', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: false,
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
    },
    pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

module.exports = db;
