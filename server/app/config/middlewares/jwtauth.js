const jwt = require('jsonwebtoken');
const getTokenFromHeaders = (authorization) => {
  //  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};
exports.generateJWT = async (req) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 365 * 600);

  return jwt.sign(
    {
      email: req.email,
      user_type: req.user_type,
      id: req._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    'secret'
  );
};
exports.jwtcheck = async (req, res, next) => {
  try {
    let token = await getTokenFromHeaders(req.headers.token);
    var decoded = jwt.verify(token, 'secret');
    next();
  } catch (err) {
    // err
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
