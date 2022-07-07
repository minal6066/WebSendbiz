const FavJob = require('../models/favJobs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const { sendEmail } = require('./emailController');

exports.createFavJobs = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newFavJob = await FavJob.create(req.body);
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    data: newFavJob,
  });
});

exports.getAllFavJobs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    FavJob.find({ candidate: req.decodedData.id }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const favJobs = await features.query
    .populate({ path: 'job' })
    .populate({ path: 'companyDetail', select: 'comp_info.comp_name' });
  if (!favJobs) {
    return res.status(200).json({
      status: 'success',
      isSuccess: true,
      message: 'No favourite jobs found in your account',
    });
  }
  res.status(200).json({
    status: 'success',
    isSucces: true,
    results: favJobs.length,
    data: favJobs,
  });
});

exports.getOneFavJob = catchAsync(async (req, res, next) => {
  const favJob = await FavJob.findOne({
    candidate: req.decodedData.id,
    job: req.params.favJobId,
  });

  if (!favJob) {
    return res.status(200).json({
      status: 'success',
      isSuccess: true,
      message:
        'No favorite job found in your account matching this job id you provided',
    });
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: favJob,
  });
});

exports.deleteFavJob = catchAsync(async (req, res, next) => {
  const favJob = await FavJob.findOneAndUpdate(
    {
      candidate: req.decodedData.id,
      job: req.params.favJobId,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
      validateBeforeSave: true,
    }
  );

  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: favJob,
  });
});
