const crypto = require('crypto');

const dataEncryption = {};

dataEncryption.encryptData = function (Data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, iv);
  const encrypted = cipher.update(Data);
  const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  const encryptedHex = `${iv.toString('hex')}:${finalBuffer.toString('hex')}`;
  return encryptedHex;
};

const decryptAes256Ctr = function (encryptedHex, secret) {
  const decipher = crypto.createDecipher('aes-256-ctr', secret);
  let dec = decipher.update(encryptedHex, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

dataEncryption.decryptData = function (encryptedHex) {
  const encryptedArray = encryptedHex.split(':');

  // maintain backwards compatibility
  if (encryptedArray.length === 1) {
    return decryptAes256Ctr(encryptedArray[0], process.env.ENCRYPTION_KEY);
  }

  const iv = new Buffer.from(encryptedArray[0], 'hex');
  const encrypted = new Buffer.from(encryptedArray[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENCRYPTION_KEY, iv);
  const decrypted = decipher.update(encrypted);
  const clearText = Buffer.concat([decrypted, decipher.final()]).toString();
  return clearText;
};
module.exports = dataEncryption;
