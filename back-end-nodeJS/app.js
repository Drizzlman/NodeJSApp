require("dotenv").config();

const path = require('path');

const express = require('express');

const app = express();

const log = require("./logger");

const { multerMiddleware } = require('./middleware/multerMiddleware');

const { CORSmiddleware } = require('./middleware/CORSmiddleware');

const { checkTokenMiddleware } = require('./middleware/checkTokenMiddleware');

const { sequelize } = require('./config/db');

const { originalErrorHandler } = require('./handlers/errorHandler');

const { apiRouter } = require("./routes/api.router");

//app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // application/json

app.use(multerMiddleware);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(CORSmiddleware);

app.use(checkTokenMiddleware);

app.use('/api', apiRouter);

app.use(originalErrorHandler);

sequelize.sync({ logging: false }).then(() => {
  app.listen(process.env.APP_SERVER_PORT, () => {
    log.info("Listening on port: ", process.env.APP_SERVER_PORT);
  });
}).catch(err => {
  log.error(err);
});