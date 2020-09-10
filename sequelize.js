const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

module.exports = sequelize.define('user', {
    id: {
        type: Sequelize.TEXT,
        unique: true,
        primaryKey: true
    },
    code: Sequelize.TEXT
});