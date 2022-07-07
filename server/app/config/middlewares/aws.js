const fs = require('fs');
const AWS = require('aws-sdk');
const AppError = require('../../utils/appError');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3',
});

const uploadToS3 = (file, bucket, folder_name, file_name) => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      version: 'latest',
      region: 'ap-south-1',
      accessKeyId: 'AKIA2W4DC2TJGW2QWSH6',
      secretAccessKey: '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',
    });
    const uploadParams = {
      Bucket: bucket,
      Key: '',
      Body: '',
      ACL: 'public-read',
    };
    const filename = file_name;
    let fileStream = fs.createReadStream(file.path);
    fileStream.on('error', (err) => {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = folder_name + filename;
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else if (data) {
        resolve(data);
      }
    });
  });
};

// view media and files
const getPresignedUrl = (files, bucketName) => {
  return new Promise((resolve, reject) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: files[i],
        Expires: parseInt(process.env.PRESIGNED_URL_EXPIRES_IN),
      });
      urls.push({ url, fileName: files[i] });
    }
    resolve(urls);
  });
};

// request: fileType, requestType

// post data in bucket
const uploadPresignedUrl = (files, key) => {
  return new Promise((resolve, reject) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      let bucketName;
      if (files[i].requestType === 'CompanyLogoCover') {
        bucketName = process.env.AWS_BUCKET_COMPANY_LOGO_COVER;
      } else if (files[i].requestType === 'CompanyMedia') {
        bucketName = process.env.AWS_BUCKET_COMPANY_MEDIA;
      } else if (files[i].requestType === 'CompanyServiceBrochures') {
        bucketName = process.env.AWS_BUCKET_COMPANY_SERVICE_BROCHURE;
      } else if (files[i].requestType === 'CompanyServiceMedia') {
        bucketName = process.env.AWS_BUCKET_COMPANY_SERVICE_MEDIA;
      } else if (files[i].requestType === 'CompanyEventImage') {
        bucketName = process.env.AWS_BUCKET_COMPANY_EVENT_MEDIA;
      } else if (files[i].requestType === 'CompanyNewsImage') {
        bucketName = process.env.AWS_BUCKET_COMPANY_NEWS_MEDIA;
      } else if (files[i].requestType === 'JobsMedia') {
        bucketName = process.env.AWS_BUCKET_JOB_MEDIA;
      } else if (files[i].requestType === 'CandidateProfile') {
        bucketName = process.env.AWS_BUCKET_CANDIDATE_PROFILE;
      } else if (files[i].requestType === 'CompanyProductsMedia') {
        bucketName = process.env.AWS_BUCKET_COMPANY_PRODUCTS_MEDIA;
      }
      if (!bucketName)
        return reject(new AppError('Please send a valid requestType', 404));
      urls.push({
        url: s3.getSignedUrl('putObject', {
          Bucket: bucketName,
          Key: `${files[i].requestType}-${key}`,
          ContentType: files[i].contentType,
          ACL: 'public-read',
          Expires: parseInt(process.env.PRESIGNED_URL_EXPIRES_IN),
        }),

        fileName: `${bucketName.replace('sendbizbucket/', '')}/${
          files[i].requestType
        }-${key}`,
      });
    }
    resolve(urls);
  });
};

module.exports = {
  s3,
  uploadToS3,
  getPresignedUrl,
  uploadPresignedUrl,
};
