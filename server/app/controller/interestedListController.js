const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const IntList = require('../models/interestList');
const Product = require('../models/productModel');
const Service = require('../models/service');
const News = require('../models/news');
const Event = require('../models/event');
const Company = require('../models/company');
const Candidate = require('../models/candidate');
const Job = require('../models/job');

exports.addRemoveInterested = catchAsync(async (req, res, next) => {
  req.body.userId = req.decodedData.id;
  req.body.userType = req.decodedData.user_type;
  req.body.interestType = req.params.type.toUpperCase();
  const type = req.params.type.toUpperCase();
  let resData;
  let Model;
  let field;
  let resMessage;
  switch (type) {
    case 'PRODUCT':
      Model = Product;
      field = 'companyId';
      break;

    case 'SERVICE':
      Model = Service;
      field = 'companyId';
      break;

    case 'NEWS':
      Model = News;
      field = 'companyId';
      break;

    case 'CANDIDATE':
      Model = Candidate;
      break;

    case 'COMPANY':
      Model = Company;
      field = 'comp_id';
      break;

    case 'JOB':
      Model = Job;
      searchField;
      field = 'comp_id';
      break;

    case 'EVENT':
      Model = Event;
      field = 'companyId';
      break;
  }

  const entity = await Model.findOne({ _id: req.body.interestId });
  if (!entity) return next(new AppError('Entity with this Id not found', 404));
  req.body.companyId = entity[field];

  const interested = await IntList.findOne({
    interestType: req.body.interestType,
    interestId: req.body.interestId,
    userId: req.decodedData.id,
  });
  if (!interested) {
    const entity = await Model.countDocuments({ _id: req.body.interestId });
    if (entity < 1) {
      return next(new AppError(`${type} with this id does not found`));
    }
    resData = await IntList.create(req.body);
    resMessage = true;
  } else {
    resData = await IntList.findByIdAndDelete(interested._id);
    resMessage = false;
    console.log('removed from Interested');
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: resMessage,
    data: resData,
  });
});

exports.getAllIntList = catchAsync(async (req, res, next) => {
  let model;
  let select;
  let populate;
  let { type } = req.params;
  type = type.toUpperCase();
  // let comp_id = req.decodedData.companyId;
  switch (type) {
    case 'PRODUCT':
      model = 'Product';
      bucketRef = 'CompanyProductsMedia';
      bucketName = process.env.AWS_BUCKET_COMPANY_PRODUCTS_MEDIA;
      populate = { path: 'companyData', select: 'comp_info.comp_name' };
      break;

    case 'SERVICE':
      model = 'Service';
      bucketRef = 'CompanyServiceMedia';
      bucketName = process.env.AWS_BUCKET_COMPANY_SERVICE_MEDIA;
      populate = { path: 'companyData', select: 'comp_info.comp_name' };
      break;

    case 'NEWS':
      model = 'News';
      bucketRef = 'CompanyNewsImage';
      bucketName = process.env.AWS_BUCKET_COMPANY_NEWS_MEDIA;
      populate = { path: 'companyData', select: 'comp_info.comp_name' };
      break;

    case 'CANDIDATE':
      model = 'Candidate';
      bucketRef = 'CandidateProfile';
      bucketName = process.env.AWS_BUCKET_CANDIDATE_PROFILE;
      populate = {};
      break;

    case 'COMPANY':
      model = 'Company';
      bucketRef = 'CompanyLogoCover';
      bucketName = process.env.AWS_BUCKET_COMPANY_LOGO_COVER;
      populate = {};
      break;

    case 'JOB':
      model = 'Job';
      bucketRef = 'JobsMedia';
      bucketName = process.env.AWS_BUCKET_JOB_MEDIA;
      select =
        'title location daysBeforePosted create media job_logo job_cover comp_id';
      populate = { path: 'companyDetail', select: 'comp_info.comp_name' };
      break;

    case 'EVENT':
      model = 'Event';
      bucketRef = 'CompanyEventImage';
      bucketName = process.env.AWS_BUCKET_COMPANY_EVENT_MEDIA;
      populate = { path: 'companyDetail', select: 'comp_info.comp_name' };
      break;
  }
  const currentPage = 'page' in req.query ? parseInt(req.query.page, 10) : 1;
  const limit = 'limit' in req.query ? parseInt(req.query.limit, 10) : 10;
  const documentCount = await IntList.countDocuments({
    companyId: req.decodedData.companyId,
    interestType: req.params.type,
  });
  const features = new APIFeatures(
    IntList.find({ companyId: req.decodedData.id, interestType: type }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .paginate();
  let intList = await features.query.populate([
    {
      path: 'interestId',
      select,
      model,
      populate: populate,
    },
    {
      path: 'userId',
      select: '_id',
      populate: [
        {
          path: 'companyData',
          select: 'logo coverImage comp_info.comp_name contact_info join_date',
        },
        { path: 'candidateData' },
        { path: 'subUserData' },
      ],
    },
  ]);
  res.status(200).json({
    status: 'success',
    isSucces: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? parseInt(documentCount / limit, 10)
        : parseInt(documentCount / limit, 10) + 1,
    currentPage,
    results: intList.length,
    data: intList,
  });
});

exports.deleteIntItem = catchAsync(async (req, res, next) => {
  const interestList = await IntList.findOne({
    userId: req.decodedData.id,
    _id: req.params.interestId,
  });
  if (!interestList)
    return next(new AppError('interest with this ID not found', 404));
  await interestList.delete();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'Interest deleted successfully',
    data: interestList,
  });
});
