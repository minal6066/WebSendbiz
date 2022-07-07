const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const aws = require('./aws');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // console.log(file);
  if (
    file.mimetype.includes('image') ||
    file.mimetype.includes('video') ||
    file.mimetype.includes('pdf') ||
    true
  ) {
    cb(null, true);
  }
  // if (
  //   file.fieldname === 'productMedia' &&
  //   ['image', 'video'].includes(file.mimetype.split('/')[0])
  // ) {
  //   cb(null, true);
  // }
  else {
    cb(new AppError('The uploaded file is not an image or video', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.readImagesAndVideos = upload.fields([
  { name: 'image', maxCount: 4 },
  { name: 'video', maxCount: 1 },
  { name: 'companyLogo', maxcount: 1 },
  { name: 'companyCover', maxCount: 1 },
  { name: 'job_logo', maxCount: 1 },
  { name: 'job_cover', maxCount: 1 },
  { name: 'candidateProfilePhoto', maxCount: 1 },
  { name: 'jobMedia', maxCount: 4 },
  { name: 'subUserImage', maxCount: 1 },
  { name: 'serviceBrochure', maxCount: 1 },
  { name: 'serviceMedia', maxCount: 5 },
  { name: 'productMedia', maxCount: 5 },
  { name: 'eventImage', maxCount: 1 },
  { name: 'newsImage', maxCount: 1 },
]);

exports.uploadImagesAndVideos = catchAsync(async (req, res, next) => {
  // console.log(req.files);
  if (!req.files) return next();
  // for image upload
  if (req.files.image) {
    console.log('hello');
    req.body.imagesData = [];
    await Promise.all(
      req.files.image.map(async (file, i) => {
        const fileName = `${Date.now()}-${req.decodedData.id}-${i + 1}.jpeg`;
        const processedImage = await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 70 })
          .toBuffer();
        console.log(processedImage);
        const uploadedFile = await aws.s3
          .upload({
            Bucket: process.env.AWS_BUCKET_COMPANY_MEDIA,
            Key: fileName,
            Body: processedImage,
            ACL: 'public-read',
          })
          .promise();
        console.log(uploadedFile);
        req.body.imagesData.push(uploadedFile);
      })
    );
  }
  if (req.files.video) {
    req.body.videoData = [];
    await Promise.all(
      req.files.video.map(async (file, i) => {
        const fileName = `${Date.now()}-${req.decodedData.id}-${i}.mp4`;
        console.log(file.buffer);
        const uploadedFile = await aws.s3
          .upload({
            Bucket: process.env.AWS_BUCKET_COMPANY_MEDIA,
            Key: fileName,
            Body: file.buffer,
            ACL: 'public-read',
          })
          .promise();
        console.log(uploadedFile);
        req.body.videoData.push(uploadedFile);
      })
    );
  }
  if (req.files.companyLogo) {
    const fileName = `${Date.now()}-${req.decodedData.id}-logo.jpeg`;
    const processedImageBuffer = await sharp(req.files.companyLogo[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedFileData = await aws.s3
      .upload({
        Bucket: process.env.AWS_BUCKET_COMPANY_LOGO_COVER,
        Key: fileName,
        Body: processedImageBuffer,
        ACL: 'public-read',
      })
      .promise();
    console.log(uploadedFileData);
    req.body.companyLogoData = uploadedFileData;
  }
  if (req.files.companyCover) {
    const fileName = `${Date.now()}-${req.decodedData.id}-cover.jpeg`;
    const processedImageBuffer = await sharp(req.files.companyCover[0].buffer)
      .resize({ width: 893, height: 216 })
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedFileData = await aws.s3
      .upload({
        Bucket: process.env.AWS_BUCKET_COMPANY_LOGO_COVER,
        Key: fileName,
        Body: processedImageBuffer,
        ACL: 'public-read',
      })
      .promise();

    req.body.companyCoverData = uploadedFileData;
  }
  if (req.files.job_logo) {
    const fileName = `${Date.now()}-${req.decodedData.id}-logo.jpg`;
    const processedImageBuffer = await sharp(req.files.job_logo[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedFileData = await aws.s3
      .upload({
        Bucket: process.env.AWS_BUCKET_JOB_MEDIA,
        Key: fileName,
        Body: processedImageBuffer,
        ACL: 'public-read',
      })
      .promise();
    req.body.jobLogoData = uploadedFileData;
  }
  if (req.files.job_cover) {
    const fileName = `${Date.now()}-${req.decodedData.id}-cover.jpeg`;
    const processedImageBuffer = await sharp(req.files.job_cover[0].buffer)
      .resize(2000, 1400)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedFileData = await aws.s3
      .upload({
        Bucket: process.env.AWS_BUCKET_JOB_MEDIA,
        Key: fileName,
        Body: processedImageBuffer,
        ACL: 'public-read',
      })
      .promise();
    req.body.jobCoverData = uploadedFileData;
  }
  if (req.files.jobMedia) {
    console.log('hello');
    req.body.jobMediaData = [];
    await Promise.all(
      req.files.jobMedia.map(async (file, i) => {
        const fileName = `${Date.now()}-${req.decodedData.id}-${i + 1}.jpeg`;
        const processedImage = await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 70 })
          .toBuffer();
        console.log(processedImage);
        const uploadedFile = await aws.s3
          .upload({
            Bucket: process.env.AWS_BUCKET_JOB_MEDIA,
            Key: fileName,
            Body: processedImage,
            ACL: 'public-read',
          })
          .promise();
        console.log(uploadedFile);
        req.body.jobMediaData.unshift(uploadedFile);
      })
    );
  }
  if (req.files.candidateProfilePhoto) {
    const fileName = `${req.decodedData.id}-${Date.now()}-profile.jpeg`;
    const processedImageBuffer = await sharp(
      req.files.candidateProfilePhoto[0].buffer
    )
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedImageData = await aws.s3
      .upload({
        Bucket: process.env.AWS_BUCKET_CANDIDATE_PROFILE,
        Key: fileName,
        Body: processedImageBuffer,
        ACL: 'public-read',
      })
      .promise();

    req.body.profileData = uploadedImageData;
  }
  if (req.files.subUserImage) {
    const filename = `${req.decodedData.id}-${Date.now()}-subUser.jpeg`;
    req.body.subUserData = {
      buffer: req.files.subUserImage[0].buffer,
      filename,
    };
  }
  if (req.files.serviceBrochure) {
    req.body.serviceBrochureData = {
      filename: `${req.decodedData.id}-${Date.now()}-brochure.pdf`,
      buffer: req.files.serviceBrochure[0].buffer,
      mimetype: req.files.serviceBrochure[0].mimetype,
    };
  }
  if (req.files.serviceMedia) {
    req.body.serviceMediaData = [];
    req.files.serviceMedia.forEach((val) => {
      const data = {
        type: val.mimetype.split('/')[0],
        buffer: val.buffer,
        ext: val.mimetype.split('/')[1],
      };
      req.body.serviceMediaData.unshift(data);
    });
  }
  if (req.files.productMedia) {
    req.body.productMediaData = [];
    req.files.productMedia.forEach((val) => {
      const data = {
        type: val.mimetype.split('/')[0],
        buffer: val.buffer,
        ext: val.mimetype.split('/')[1],
      };

      req.body.productMediaData.unshift(data);
    });
  }
  if (req.files.eventImage) {
    req.body.eventImageData = {};
    req.body.eventImageData = {
      type: req.files.eventImage[0].mimetype.split('/')[0],
      buffer: req.files.eventImage[0].buffer,
    };
    // console.log(req.body.eventImageData);
  }
  if (req.files.newsImage) {
    req.body.newsImageData = {};
    req.body.newsImageData = {
      type: req.files.newsImage[0].mimetype.split('/')[0],
      buffer: req.files.newsImage[0].buffer,
    };
    console.log(req.body.newsImageData);
  }
  next();
});
