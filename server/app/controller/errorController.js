const AppError = require('../utils/appError');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: 'test',
  name: 'My First Test Transaction',
});
console.log('sentry transaction started');

const handleJWTError = () =>
  new AppError('Invalid token, please login again', 401);

const sendErrorDev = (err, req, res) => {
  Sentry.captureException(err);
  transaction.finish();
  res.status(err.statusCode).json({
    status: err.status,
    isSuccess: false,
    path: req.originalUrl,
    message: err.message,
    error: { ...err, requestPath: req.originalUrl },
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  Sentry.captureException(err);
  transaction.finish();
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      isSuccess: false,
      message: err.message,
    });
  }
  res.status(500).json({
    status: 'error',
    isSuccess: false,
    message: 'Something went wrong',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'jwt malformed') err === handleJWTError();
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    error = { ...err };
    sendErrorProd(error, req, res);
  }
};
