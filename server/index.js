const mongoose = require('mongoose');
const express = require('express');
const { join } = require('path');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const models = join(__dirname, 'app/models');
require('dotenv').config({ path: './.env' });

const cors = require('cors');
const routeConfig = require('./app/config/routes');

const port = 3000;
const app = express();
const globalErrorHandler = require('./app/controller/errorController');
const AppError = require('./app/utils/appError');
const ElasticSearch = require('./app/config/middlewares/elasticConfig');

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'app/view'));
app.use(express.static(join(__dirname, 'app/public')));

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      '*',
      'http://localhost',
      'http://localhost:3000',
      'http://localhost:3000/',
      'http://localhost:5000/',
      'http://localhost:3001',
      'http://localhost:5000',
      'http://sendbiz.com/',
      'http://sendbiz.com',
      'https://sendbiz.com',
      'https://sendbiz.com/',
      'https://www.sendbiz.com',
      'https://www.sendbiz.com/',
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  })
);

app.use(mongoSanitize());

routeConfig(app);

app.use('*', (req, res, next) => {
  next(
    new AppError(
      `sorry, the route ${req.originalUrl} does not found on this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

// ElasticSearch;

connect();
function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port).timeout = 60 * 10 * 1000;
  console.log(`Express app started on port ${port}`);
}
function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', console.log)
    .once('open', listen);
  mongoose.set('useFindAndModify', false);

  return mongoose
    .connect(process.env.LIVE_DB_URI, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) =>
      console.log(`connected to database of user: ${data.connections[0].user}`)
    )
    .catch(console.log);
}
