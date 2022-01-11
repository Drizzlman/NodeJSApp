require('dotenv').config();

module.exports = {
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: true,
    timestamps: false,
    freezeTableName: true,
    schema: process.env.DB_SCHEMA
};
