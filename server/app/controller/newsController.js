const { ObjectId } = require('mongoose').Types;
const sharp = require('sharp');
const News = require('../models/news');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { s3 } = require('../config/middlewares/aws');
const APIFeatures = require('../utils/apiFeatures');
const Candidate = require('../models/candidate');
const Company = require('../models/company');
const SubUser = require('../models/sub_user');
const { premiumCompanyValidator } = require('./company');

const filterObject = (obj, arr) => {
  const body = {};
  arr.forEach((key) => {
    if (obj[key]) body[key] = obj[key];
  });
  return body;
};

exports.premiumNewsValidator = premiumCompanyValidator(News, 'companyId');

exports.createNews = catchAsync(async (req, res, next) => {
  const body = filterObject(req.body, ['image', 'title', 'description']);
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const news = await News.create({
    ...body,
    companyId: compId,
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'news uploaded successfully',
    data: news,
  });
});

exports.queryForCompany = (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subuser.comp_id;
  }
  req.queryData = {
    isDeleted: { $ne: true },
    companyId,
  };
  next();
};

exports.queryForAll = catchAsync(async (req, res, next) => {
  req.queryData = {
    isActive: true,
    isDeleted: { $ne: true },
  };
  next();
});

exports.getAllNews = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const documentCount = await News.countDocuments({
    ...req.queryData,
  });
  const features = new APIFeatures(
    News.find({
      ...req.queryData,
    }),
    req.query
  )
    .search('title')
    .filter()
    .sort()
    .fields()
    .paginate();
  const news = JSON.parse(
    JSON.stringify(
      await features.query.populate([
        {
          path: 'likes',
          model: 'user',
        },
        { path: 'companyData' },
      ])
    )
  );
  news.map((val) => {
    val.imagePath = [];
    val.image.map((key) => {
      if (
        key !== null &&
        key.startsWith('company/news/image/CompanyNewsImage')
      ) {
        val.imagePath.push(`${process.env.AWS_STATIC_URL}/${key}`);
        return;
      }
      val.imagePath.push('');
    });
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit, 10) + 1,
    currentPage,
    results: news.length,
    data: news,
  });
});

exports.getOneNews = catchAsync(async (req, res, next) => {
  const data = await News.findById(req.params.newsId, '', {
    isDeleted: { $ne: true },
  }).populate([
    { path: 'companyData', select: 'comp_info.comp_name comp_info.bus_name' },
    {
      path: 'likes',
      model: 'user',
    },
    { path: 'comments.createdBy', model: 'user' },
  ]);
  let news = JSON.parse(JSON.stringify(data));
  news.hasLiked = false;
  let myEntity = false;
  if (req.isAuth) {
    let identity;
    if (req.decodedData.user_type === 1) {
      identity = await Candidate.findOne({ can_id: req.decodedData.id });
    } else if (req.decodedData.user_type === 2) {
      identity = await Company.findOne({ comp_id: req.decodedData.id });
    } else if (req.decodedData.user_type === 3) {
      identity = await SubUser.findOne({ user_id: req.decodedData.id });
    }
    if (!data) return next(new AppError('news with this id not found', 404));
    const likedIndex = data.likes.findIndex(
      (like) => like.refId.toString() == identity._id
    );
    news.hasLiked = likedIndex !== -1 ? true : false;
    myEntity = news.companyId == req.decodedData.id ? true : false;
  }
  news.imagePath = [];
  news.image.map((key) => {
    if (key !== null && key.startsWith('company/news/image/CompanyNewsImage')) {
      news.imagePath.push(`${process.env.AWS_STATIC_URL}/${key}`);
      return;
    }
    news.imagePath.push('');
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    myEntity,
    data: news,
  });
});

exports.updateNews = catchAsync(async (req, res, next) => {
  const body = filterObject(req.body, ['image', 'title', 'description']);
  console.log(body);
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const news = await News.findOneAndUpdate(
    {
      _id: req.params.newsId,
      companyId: req.decodedData.id,
      isDeleted: { $ne: true },
    },
    {
      ...body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!news)
    return next(
      new AppError('news with this id does not found in your account', 404)
    );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'news updated successfully',
    data: news,
  });
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subuser.comp_id;
  }
  const news = await News.findOne({
    _id: req.params.newsId,
    companyId,
    isDeleted: false,
  });
  if (!news)
    return next(
      new AppError('news with this id does not found in your account', 404)
    );
  news.isDeleted = true;
  await news.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'news deleted successfully',
    data: news,
  });
});

exports.toggleStatus = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subuser.comp_id;
  }
  const news = await News.findOne({
    _id: req.params.newsId,
    companyId,
    isDeleted: false,
  });
  if (!news)
    return next(
      new AppError('news with this id does not found in your account', 404)
    );
  news.isActive = !news.isActive;
  await news.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: `news status changed to ${news.isActive}`,
    data: news,
  });
});

exports.addRemoveLike = catchAsync(async (req, res, next) => {
  let news = await News.findOne({
    _id: req.params.newsId,
    isDeleted: { $ne: true },
  });
  if (!news) return next(new AppError('no news found with this id', 404));
  let identity;
  let data;
  if (req.decodedData.user_type === 1) {
    identity = await Candidate.findOne({ can_id: req.decodedData.id });
    data = {
      userType: req.decodedData.user_type,
      refId: identity._id,
      name: `${identity.can_detail.firstName} ${identity.can_detail.lastName}`,
      profileImage: identity.can_detail.profile,
    };
  } else if (req.decodedData.user_type === 2) {
    identity = await Company.findOne({ comp_id: req.decodedData.id });
    console.log(identity);
    data = {
      userType: req.decodedData.user_type,
      refId: identity._id,
      name: `${identity.comp_info.comp_name}`,
      profileImage: identity.logo.name,
    };
  } else if (req.decodedData.user_type === 3) {
    identity = await SubUser.findOne({ user_id: req.decodedData.id });
    data = {
      userType: req.decodedData.user_type,
      refId: identity._id,
      name: `${identity.first_name} ${identity.last_name}`,
      profileImage: identity.user_image,
    };
  }
  const index = news.likes.findIndex(
    (val) => val.refId.toString() === identity._id.toString()
  );
  let liked;
  if (index !== -1) {
    liked = false;
    news.likes = news.likes.filter(
      (val) => val.refId.toString() !== data.refId.toString()
    );
  } else {
    liked = true;
    news.likes.unshift(data);
  }
  await news.save();
  news = JSON.parse(JSON.stringify(news));
  news.hasLiked = liked;
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: liked
      ? 'You have successfully liked this news'
      : 'You have unliked this news',
    data: news,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const news = await News.findOne({
    _id: req.params.newsId,
    isDeleted: { $ne: true },
    isActive: true,
  }).populate('companyData');
  if (!news) {
    return next(new AppError('news with this Id does not exist', 401));
  }
  let identity;
  let data;
  if (req.decodedData.user_type === 1) {
    identity = await Candidate.findOne({ can_id: req.decodedData.id });
    data = {
      userType: req.decodedData.user_type,
      refId: identity._id,
      name: `${identity.can_detail.firstName} ${identity.can_detail.lastName}`,
      profileImage: identity.can_detail.profile,
      createdAt: Date.now(),
    };
  } else if (req.decodedData.user_type === 2) {
    identity = await Company.findOne({ comp_id: req.decodedData.id });
    data = {
      userType: req.decodedData.user_type,
      refId: identity._id,
      name: `${identity.comp_info.comp_name}`,
      profileImage: identity.logo.name,
      createdAt: Date.now(),
    };
  } else if (req.decodedData.user_type === 3) {
    identity = await SubUser.findOne({ user_id: req.decodedData.id });
    data = {
      userType: req.decodedData.user_type,
      refId: identity._id,
      name: `${identity.first_name} ${identity.last_name}`,
      profileImage: identity.user_image,
      createdAt: Date.now(),
    };
  }
  data.comment = req.body.comment;
  news.comments.unshift(data);
  await news.save();
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'comment created successfully',
    data: news,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const news = await News.findOne({
    _id: req.params.newsId,
    isDeleted: { $ne: true },
    isActive: true,
  }).populate('companyData');
  if (!news) {
    return next(new AppError('event with this Id does not exist', 401));
  }
  const [comment] = news.comments.filter(
    (val) => val._id == req.params.commentId
  );
  if (!comment)
    return next(new AppError('comment with this id not found', 404));
  let identity;
  if (req.decodedData.user_type === 1) {
    identity = await Candidate.findOne({ can_id: req.decodedData.id });
  } else if (req.decodedData.user_type === 2) {
    identity = await Company.findOne({ comp_id: req.decodedData.id });
  } else if (req.decodedData.user_type === 3) {
    identity = await SubUser.findOne({ user_id: req.decodedData.id });
  }
  if (comment.refId.toString() !== identity._id.toString()) {
    return next(
      new AppError('you are not authorized to delete this comment', 401)
    );
  }
  news.comments = news.comments.filter(
    (val) => val._id != req.params.commentId
  );
  await news.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'comment deleted successfully',
    data: news,
  });
});
