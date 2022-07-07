const emailValidator = require('deep-email-validator');

exports.isEmailValid = async (email) => {
  return await emailValidator.validate(email);
};
