const Sequelize = require('sequelize');
const config = require('./config');
const initModels = require("../models/init-models");

const sequelize = new Sequelize(config.db, config.user, config.pwd, config);

module.exports = {
    initedModels: initModels(sequelize),
    sequelize: sequelize
};

exports.initModels = initModels(sequelize)