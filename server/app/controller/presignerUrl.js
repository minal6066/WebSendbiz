const AWS = require('../config/middlewares/aws');
const catchAsync = require('../utils/catchAsync');

const putPresignedUrl = catchAsync(async (req, res, next) => {
  const signedUrl = await AWS.uploadPresignedUrl(
    req.body.files,
    `${req.decodedData.id}-${Date.now()}`
  );
  res.status(200).json(signedUrl);
});

const getPresignedUrl = async (req, res) => {
  try {
    console.log('1');
    const signedUrl = await AWS.getPresignedUrl(req.body.files);
    res.status(200).json(signedUrl);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  putPresignedUrl,
  getPresignedUrl,
};
