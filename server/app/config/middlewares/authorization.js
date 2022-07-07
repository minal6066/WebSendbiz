'use strict';
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/*
 *  Password encryption
 */

exports.Passwordencrypt = function (req) {
  var ciphertext = CryptoJS.AES.encrypt(req.password, '172839645').toString();
  return ciphertext;
};

exports.PasswordCheck = function (req) {
  var bytes = CryptoJS.AES.decrypt(req.password, '172839645');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

exports.isAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      isSuccess: false,
      message: 'please login before using this route',
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  req.decodedData = decoded;
  next();
};
