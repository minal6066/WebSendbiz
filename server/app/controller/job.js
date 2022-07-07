/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const { wrap: async } = require('co');
const formidable = require('formidable');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const everyauth = require('everyauth');
const connect = require('connect');
const validator = require('validator');
const AWS = require('aws-sdk');
const job = require('../models/job');
const Company = require('../models/company');
const Candidate = require('../models/candidate');
const User = require('../models/user');
const ApplyJob = require('../models/apply_job.js');
const Sponsored = require('../models/sponsored');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getPresignedUrl } = require('../config/middlewares/aws');
const { premiumCompanyValidator } = require('./company');
const { sendEmail } = require('./emailController');
const SubUser = require('../models/sub_user');
const IntList = require('../models/interestList');
// const ElasticSearch = require('../config/middlewares/elasticConfig');

const s3 = new AWS.S3({
  accessKeyId: 'AKIA2W4DC2TJGW2QWSH6',
  secretAccessKey: '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',
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (true) cb(null, true);
  else {
    cb(
      new AppError(`File type is not a document file ${file.mimetype}`, 401),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadResume = upload.fields([
  { name: 'candidateResume', maxCount: 1 },
  { name: 'candidatePhoto', maxcount: 1 },
]);

exports.evalResumeFile = async (req, res, next) => {
  if (!req.files) return next();
  if (req.files.candidateResume) {
    const filename = `resume-${Date.now()}.pdf`;
    const uploadedFile = await s3
      .upload({
        Bucket: 'sendbizbucket',
        Key: filename,
        Body: req.files.candidateResume[0].buffer,
        ACL: 'public-read',
      })
      .promise();
    console.log('file uploaded successfully', uploadedFile);
    req.resumeName = uploadedFile.key;
  }
  if (req.files.candidatePhoto) {
    const filename = `photo-${Date.now()}.jpeg`;
    const processedImage = await sharp(req.files.candidatePhoto[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedFile = await s3
      .upload({
        Bucket: 'sendbizbucket',
        Key: filename,
        Body: processedImage,
        ACL: 'public-read',
      })
      .promise();
    console.log('image uploaded successfully');
    req.body.profileData = uploadedFile;
  }
  next();
};

exports.premiumJobValidator = premiumCompanyValidator(job, 'comp_id');

exports.jobList_search = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const documentCount = await job.countDocuments({
    isActive: true,
    publish_to: { $gte: Date.now() },
    isDeleted: { $ne: true },
  });
  const features = new APIFeatures(
    job.find({
      isActive: true,
      publish_to: { $gte: Date.now() },
      isDeleted: { $ne: true },
    }),
    req.query
  )
    .search('title')
    .filter('create')
    .sort('-create')
    .fields()
    .paginate();

  let jobList = await features.query
    .populate('companyAccount')
    .populate('companyDetail');

  jobList = JSON.parse(JSON.stringify(jobList));
  jobList.map((oneJob) => {
    if (
      oneJob.job_logo !== null &&
      oneJob.job_logo.startsWith('jobsMedia/JobsMedia')
    ) {
      oneJob.logoPath = `${process.env.AWS_STATIC_URL}/${oneJob.job_logo}`;
    } else {
      oneJob.logoPath = '';
    }
    if (
      oneJob.job_cover !== null &&
      oneJob.job_cover.startsWith('jobsMedia/JobsMedia')
    ) {
      oneJob.coverPath = `${process.env.AWS_STATIC_URL}/${oneJob.job_cover}`;
    } else {
      oneJob.coverPath = '';
    }
    if (oneJob.media.length >= 1) {
      oneJob.media.map((file) => {
        if (
          file.fileName !== null &&
          file.fileName.startsWith('jobsMedia/JobsMedia')
        ) {
          file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        } else {
          file.filePath = '';
        }
      });
    }
  });
  res.status(200).json({
    status: 'Succes',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit) + 1,
    currentPage,
    results: jobList.length,
    data: jobList,
  });
});

exports.createSponsored = catchAsync(async (req, res, error) => {
  console.log(req.body);
  const sponsored = await Sponsored.create(req.body);

  res.status(200).json({
    status: 'isSuccess',
    messgae: 'Sponsored created Successfully',
    data: sponsored,
  });
});

exports.jobList_withSponsored = catchAsync(async (req, res, next) => {
  const actualLimit = req.query.limit || 10;

  //SPONSORED JOBS LIST
  req.query.limit = 2;
  let totalCount;
  totalCount = job.countDocuments({
    isDeleted: { $ne: true },
    publish_to: { $gte: Date.now() },
    isActive: true,
    isSpnsored: true,
    sponsorExpiresAt: { $gte: Date.now() },
  });
  const sponsoredFeatures = new APIFeatures(
    job
      .find({
        isDeleted: { $ne: true },
        publish_to: { $gte: Date.now() },
        isActive: true,
        isSponsored: true,
        sponsorExpiresAt: { $gte: Date.now() },
      })
      .sort('-clicksPerDay -totalCLicks'),
    req.query
  )
    .search('title')
    .filter('create')
    .sort('-create')
    .fields()
    .paginate(2);

  let sponsoredJobs = sponsoredFeatures.query
    .populate('companyAccount')
    .populate('companyDetail');

  const [count, sJobs] = await Promise.all([totalCount, sponsoredJobs]);
  console.log(count, sJobs);

  //NON SPONSORED JOBS LIST
  req.query.limit = count === 0 ? actualLimit : actualLimit - count;
  const limit = req.query.limit;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const nonSponQuery = {
    isActive: true,
    isSpnsored: { $ne: true },
    publish_to: { $gte: Date.now() },
    isDeleted: { $ne: true },
  };
  const jobCount = await job.countDocuments(nonSponQuery);
  const features = new APIFeatures(job.find(nonSponQuery), req.query)
    .search('title')
    .filter('create')
    .sort('-create')
    .fields()
    .paginate();

  let jobList = features.query
    .populate('companyAccount')
    .populate('companyDetail');

  const [nonSponCount, jobs] = await Promise.all([jobCount, jobList]);
  console.log(nonSponCount);

  const data = [...sJobs, ...jobs];
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    currentPage,
    totalCount: nonSponCount + count,
    totalPages:
      ((nonSponCount + count) / actualLimit) % actualLimit
        ? parseInt((nonSponCount + count) / actualLimit, 10) + 1
        : (nonSponCount + count) / actualLimit,
    results: data.length,
    data,
  });
});

exports.deleteSponsored = catchAsync(async (req, res, next) => {
  const sp = await Sponsored.deleteMany({ _id: req.body.sp_id });
  res.status(200).json({
    status: 'isSuccess',
    message: 'Is dltd successfully',
    data: sp,
  });
});

exports.postedJobs = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const documentCount = await job.countDocuments({
    comp_id: compId,
    isDeleted: { $ne: true },
  });
  const currentPage = parseInt(req.query.page) || 1;
  console.log(req.decodedData.id);
  const features = new APIFeatures(
    job.find({ comp_id: compId, isDeleted: { $ne: true } }),
    req.query
  )
    .filter()
    .sort('-create')
    .fields()
    .paginate();
  let myJobs = await features.query;
  myJobs = JSON.parse(JSON.stringify(myJobs));
  myJobs.map((oneJob) => {
    if (
      oneJob.job_logo !== null &&
      oneJob.job_logo.startsWith('jobsMedia/JobsMedia')
    ) {
      oneJob.logoPath = `${process.env.AWS_STATIC_URL}/${oneJob.job_logo}`;
    } else {
      oneJob.logoPath = '';
    }
    if (
      oneJob.job_cover !== null &&
      oneJob.job_cover.startsWith('jobsMedia/JobsMedia')
    ) {
      oneJob.coverPath = `${process.env.AWS_STATIC_URL}/${oneJob.job_cover}`;
    } else {
      oneJob.coverPath = '';
    }
    if (oneJob.media.length >= 1) {
      oneJob.media.map((file) => {
        if (
          file.fileName !== null &&
          file.fileName.startsWith('jobsMedia/JobsMedia')
        ) {
          file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        } else {
          file.filePath = '';
        }
      });
    }
  });
  res.status(200).json({
    status: 'sucess',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit) + 1,
    currentPage,
    results: myJobs.length,
    data: myJobs,
  });
});

exports.add_job = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const comp_id = decoded.id;
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      fields.comp_id = comp_id;
      const file_name = `job_logo${Date.now()}.jpg`;
      const bucket = 'sendbizbucket';
      const file_name_cover = `job_cover${Date.now()}.jpg`;
      const bucket_cover = 'job_cover';

      await uploadToS3(files.job_logo, bucket, ' ', file_name)
        .then((res) => {
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
        });

      await uploadToS3(files.job_cover, bucket, '', file_name_cover)
        .then((res) => {})
        .catch((err) => {});
      fields.job_cover = file_name_cover;
      fields.job_logo = file_name;
      const job_data = new job(fields);
      await job_data.save();
      res.send({
        status: 'Success',
        isSuccess: true,
        message: 'Job Add Successfully',
        data: job_data,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

exports.createJob = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const newJob = await job.create({ ...req.body, comp_id: compId });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'job created successfully',
    data: newJob,
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const jobData = await job.findOne({
    _id: req.params.jobId,
    comp_id: compId,
    isDeleted: { $ne: true },
  });
  if (!jobData) {
    return next(new AppError('job with this id not found in your jobs', 404));
  }
  if ('comp_id' in req.body) {
    return next(new AppError('comp_id cannot be updated', 401));
  }
  const updatedJob = await job.findByIdAndUpdate(jobData._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'job updated successfully',
    data: updatedJob,
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const myJob = await job.findOne({
    _id: req.params.jobId,
    comp_id: compId,
    isDeleted: { $ne: true },
  });
  if (!myJob) {
    return next(
      new AppError('Job with this id does not found in your account', 404)
    );
  }
  const deletedJob = await job.findByIdAndUpdate(
    myJob._id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  console.log('job deleted successfully');
  const applyJobBulk = ApplyJob.collection.initializeOrderedBulkOp();
  applyJobBulk
    .find({ applied_for_job: deletedJob._id })
    .update({ $set: { isDeleted: true } });
  await applyJobBulk.execute();
  console.log('deleted all apply jobs');
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message:
      'Job has been successfully deleted and the applyJobs linked to this job also deleted',
    data: deletedJob,
  });
});

exports.job_list = async (req, res) => {
  const token = await getTokenFromHeaders(req.headers.token);
  const decoded = jwt.verify(token, 'secret');
  const comp_id = decoded.id;
  const jobList = await job.find({ comp_id, isActive: true }).exec();
  if (jobList) {
    res.send({
      status: 'Succes',
      isSuccess: true,
      results: jobList.length,
      data: jobList,
    });
  } else {
    res.send({ status: 'No Job Found', data: {} });
  }
};

exports.job_detail = async (req, res) => {
  const jobdetail = await job
    .findById({ _id: req.query.job_id, isActive: true })
    .exec();
  if (jobdetail) {
    res.send({ status: 'Success', data: jobdetail });
  } else {
    res.send({ status: 'No Job Found', data: {} });
  }
};

exports.job_detail = async (req, res) => {
  var jobdetail = await job
    .findById({ _id: req.query.job_id, isActive: true })
    .exec();
  if (jobdetail) {
    res.send({ status: 'Succes', data: jobdetail });
  } else {
    res.send({ status: 'No Job Found', data: {} });
  }
};

const getTokenFromHeaders = (authorization) => {
  //  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const uploadToS3 = (file, bucket, folder_name, file_name) =>
  // console.log(file.path);
  new Promise((resolve, reject) => {
    // Create S3 service object
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
    const fileStream = fs.createReadStream(file.path);
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
exports.jobInActive = async (req, res, next) => {
  try {
    if (!(req.decodedData.user_type == 2 || req.decodedData.user_type == 3)) {
      return res.status(401).json({
        status: 'fail',
        isSuccess: false,
        message: 'you are not authorized to access this route',
      });
    }
    let compId = req.decodedData.id;
    if (req.decodedData.user_type === 3) {
      const subuser = SubUser.findOne({ user_id: req.decodedData.id });
      compId = subuser.comp_id;
    }
    const jobData = await job.findOne({
      _id: req.params.jobId,
      comp_id: compId,
    });
    if (!jobData) {
      return res.status(401).json({
        status: 'fail',
        isSuccess: false,
        message: 'No job found',
      });
    }
    jobData.isActive = !jobData.isActive;
    await jobData.save();
    res.status(200).json({
      status: 'status',
      isSuccess: true,
      message: 'job Active status updated successfully',
      data: jobData,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'fail',
      isSuccess: false,
      error: err,
    });
  }
};

exports.applyJob = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('unable to access');
    return res.status(401).json({
      status: 'fail',
      isSuccess: false,
      message: 'please provide the auth token to use this route',
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'secret');
  if (decoded.user_type === 1) {
    req.body.applied_by_candidate_id = decoded.id;
    req.body.applied_by_type = 1;
  } else if (decoded.user_type === 2) {
    req.body.applied_by_company_id = decoded.id;
    req.body.applied_by_type = 2;
  } else if ((decoded, user_type === 3)) {
    const subuser = SubUser.findOne({ user_id: decoded.id });
    let compId = subuser.comp_id;
    req.body.applied_by_company_id = compId;
    req.body.applied_by_type = 2;
  }
  const candidate = {};
  candidate.name = req.body.name || '';
  candidate.experience = req.body.experience || '';
  candidate.current_position = req.body.current_position || '';
  candidate.current_company = req.body.current_company || '';
  candidate.price = req.body.price || '';
  candidate.availability = parseInt(req.body.availability) || 0;
  candidate.profile_url = req.body.profile_url || '';
  candidate.information = req.body.information || '';
  candidate.resume = req.body.resume ? req.body.resume : '';
  candidate.image = req.body.profileData ? req.body.profileData.key : '';

  const jobData = await job.findById(req.body.applied_for_job);
  if (!jobData) return next(new AppError('Job with this Id not found', 404));
  if (jobData.comp_id === decoded.id) {
    return next(new AppError('you cannot apply on your own job', 401));
  }

  req.body.candidate = candidate;
  req.body.applied_for_company_id = jobData.comp_id;
  const appliedJob = await ApplyJob.create(req.body);
  if (jobData) {
    jobData.noOf_applied += 1;
    if (decoded.user_type === 1) jobData.candidatesApplied.push(decoded.id);
    if (decoded.user_type === 2) jobData.companyApplied.push(decoded.id);
    await jobData.save({ validateBeforeSave: false });
    console.log(jobData);
  }
  // console.log(appliedJob);
  const company = await Company.findOne({ comp_id: jobData.comp_id });
  if (await sendEmail(4, company.contact_info.email)) {
    console.log('email sent successfully');
  } else {
    console.log('error sending email');
  }
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    appliedJob,
  });
});

exports.getApplyJobByJobId = catchAsync(async (req, res, next) => {
  console.log(req.params, req.decodedData);
  let query;
  switch (req.decodedData.user_type) {
    case 1:
      console.log(1);
      query = {
        applied_by_candidate_id: req.decodedData.id,
        applied_for_job: req.params.jobId,
        isDeleted: { $ne: true },
      };
      break;
    case 2:
      console.log(2);
      query = {
        applied_by_company_id: req.decodedData.id,
        applied_for_job: req.params.jobId,
        isDeleted: { $ne: true },
      };
      break;
    case 3:
      console.log(3);
      const subuser = SubUser.findOne({ user_id: req.decodedData.id });
      let compId = subuser.comp_id;
      query = {
        applied_by_company_id: compId,
        applied_for_job: req.params.jobId,
        isDeleted: { $ne: true },
      };
      break;
  }
  console.log(query);
  const appliedJob = await ApplyJob.find(query).sort('-createdAt');
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    result: appliedJob.length,
    data: appliedJob,
  });
});

exports.getApplyJobByMyJobId = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const applyJob = await ApplyJob.find({
    applied_for_job: req.params.jobId,
    applied_for_company_id: compId,
    isDeleted: { $ne: true },
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    results: applyJob.length,
    data: applyJob,
  });
});

exports.getAllAppliedJobs = catchAsync(async (req, res, next) => {
  console.log(req.decodedData);
  const user = await User.findById(req.decodedData.id);
  console.log();
  let query;
  switch (user.user_type) {
    case 1:
      query = ApplyJob.find({
        applied_by_candidate_id: user._id,
        isDeleted: { $ne: true },
      });
      break;
    case 2:
      query = ApplyJob.find({
        applied_by_company_id: user._id,
        isDeleted: { $ne: true },
      });
      break;
    case 3:
      const subuser = SubUser.findOne({ user_id: req.decodedData.id });
      let compId = subuser.comp_id;
      query = ApplyJob.find({
        applied_by_company_id: compId,
        isDeleted: { $ne: true },
      });
  }
  const appliedJobs = await query
    .populate({ path: 'applied_for_job' })
    .populate({
      path: 'companyData',
      select: 'comp_info.comp_name contact_info',
    });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    result: appliedJobs.length,
    data: appliedJobs,
  });
});

exports.appliedOnMyjobs = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }

  const features = new APIFeatures(
    ApplyJob.find({
      applied_for_company_id: compId,
      isDeleted: { $ne: true },
    }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const appliedOnMyjobs = await features.query;

  res.status(200).json({
    status: 'success',
    isSuccess: true,
    results: appliedOnMyjobs.length,
    data: appliedOnMyjobs,
  });
});

exports.getOneAppliedJobCompany = catchAsync(async (req, res, next) => {
  const appliedJob = await ApplyJob.findOne({
    _id: req.params.applyJobId,
    isDeleted: { $ne: true },
  });
  if (!appliedJob) {
    return next(new AppError('Applied job with this id does not found', 404));
  }
  if (appliedJob.applied_for_company_id !== req.decodedData.id) {
    return next(new AppError('you are not authorized for this Apply job', 401));
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: appliedJob,
  });
});

exports.getOneAppliedJob = catchAsync(async (req, res, next) => {
  const appliedJob = await ApplyJob.findOne({
    _id: req.params.appliedJobId,
    isDeleted: { $ne: true },
  })
    .populate('companyData')
    .populate('candidateData')
    .populate('appliedByCompany');
  if (!appliedJob) {
    return next(new AppError('Applied job with this id does not found', 404));
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: appliedJob,
  });
});

exports.updateAppliedJobs = async (req, res, next) => {
  try {
    // const appliedJob = await ApplyJob.findById(req.params.appliedJobId);
    /* appliedJob.status = req.body.status;
    await appliedJob.save(); */
    res.status(200).json({
      status: 'success',
      isSuccess: true,
      data: req.params,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: 'fail',
      isSuccess: false,
      err,
    });
  }
};

exports.updateApplyJobStatus = async (req, res, next) => {
  try {
    const appliedJob = await ApplyJob.findOne({
      _id: req.params.appliedJobId,
      isDeleted: { $ne: true },
    });
    appliedJob.status = req.body.status;
    await appliedJob.save();
    if (await sendEmail(15, appliedJob.candidate.email)) {
      console.log('Email sent successfully');
    } else {
      console.log('error sending mail');
    }
    res.status(200).json({
      status: 'success',
      isSuccess: true,
      data: appliedJob,
    });
  } catch (err) {
    res.status(403).json({
      status: 'fail',
      isSuccess: false,
      err,
    });
  }
};

exports.getOneJob = catchAsync(async (req, res, next) => {
  let oneJob = await job
    .findById(req.params.jobId)
    .populate('companyAccount')
    .populate('companyDetail');

  let applyJobStatus = {};
  if (!oneJob)
    return next(new AppError('no job found matching this jobId', 404));
  let hasApplied = false;
  let isInterested = false;
  let myJob = false;
  if (req.isAuth) {
    myJob = req.decodedData.id === oneJob.comp_id;
    const interest = await IntList.findOne({
      interestType: 'JOB',
      interestId: oneJob._id,
      userId: req.decodedData.id,
    });
    if (interest) isInterested = true;
    if (req.decodedData.user_type === 1) {
      // hasApplied = oneJob.candidatesApplied.includes(req.decodedData.id);
      const candidate = await Candidate.findOne({ can_id: req.decodedData.id });
      const applyJob = await ApplyJob.findOne({
        applied_for_job: oneJob._id,
        applied_by_candidate_id: candidate._id,
      });
      if (applyJob) {
        hasApplied = true;
        applyJobStatus = {
          candidate: applyJob.candidate,
          status: applyJob.status,
        };
      }
    }
    if (req.decodedData.user_type === 2) {
      // hasApplied = oneJob.companyApplied.includes(req.decodedData.id);
      const company = await Company.findOne({ comp_id: req.decodedData.id });
      const applyJob = await ApplyJob.findOne({
        applied_for_job: oneJob._id,
        applied_by_company_id: company._id,
      });
      console.log(applyJob);
      if (applyJob) {
        hasApplied = true;
        applyJobStatus = {
          candidate: applyJob.candidate,
          status: applyJob.status,
        };
      }
    }
    if (req.decodedData.user_type === 3) {
      const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
      hasApplied = oneJob.companyApplied.includes(subUser.comp_id);
      const company = await Company.findOne({ comp_id: subUser.comp_id });
      const applyJob = await ApplyJob.findOne({
        applied_for_job: oneJob._id,
        applied_by_company_id: company._id,
      });
      if (applyJob) {
        hasApplied = true;
        applyJobStatus = {
          candidate: applyJob.candidate,
          status: applyJob.status,
        };
      }
    }
  }
  oneJob = JSON.parse(JSON.stringify(oneJob));
  oneJob.logoPath = '';
  oneJob.coverPath = '';
  if (
    oneJob.job_logo !== null &&
    oneJob.job_logo.startsWith('jobsMedia/JobsMedia')
  ) {
    oneJob.logoPath = `${process.env.AWS_STATIC_URL}/${oneJob.job_logo}`;
  }
  if (
    oneJob.job_cover !== null &&
    oneJob.job_cover.startsWith('jobsMedia/JobsMedia')
  ) {
    oneJob.coverPath = `${process.env.AWS_STATIC_URL}/${oneJob.job_cover}`;
  }
  oneJob.media.map((file) => {
    if (
      file.fileName !== null &&
      file.fileName.startsWith('jobsMedia/JobsMedia')
    ) {
      file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
      return;
    }
    file.filePath = '';
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    hasApplied,
    myJob,
    isInterested,
    applyJobStatus,
    data: oneJob,
  });
});
