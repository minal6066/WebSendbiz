const SendInBlue = require('sib-api-v3-sdk');

const Email = SendInBlue.ApiClient.instance;

const api = Email.authentications['api-key'];
api.apiKey = process.env.SIB_API_KEY;

module.exports = SendInBlue;
