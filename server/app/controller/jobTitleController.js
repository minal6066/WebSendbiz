const JobTitle = require('../models/jobTitleModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllJobTitles = catchAsync(async (req, res, next) => {
  let queryObj = {};
  if ('search' in req.query) {
    queryObj = {
      title: { $regex: new RegExp(req.query.search) },
    };
  }
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const documentCount = await JobTitle.countDocuments({ ...queryObj });
  const features = new APIFeatures(JobTitle.find(), req.query)
    .search('title')
    .filter()
    .sort('title')
    .fields()
    .paginate();
  const titles = await features.query;
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? parseInt(documentCount / limit, 10)
        : parseInt(documentCount / limit, 10) + 1,
    currentPage: page,
    results: titles.length,
    data: titles,
  });
});
