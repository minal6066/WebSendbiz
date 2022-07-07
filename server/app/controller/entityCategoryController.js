const EntityCategory = require('../models/entityCategoryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCategoriesByType = catchAsync(async (req, res, next) => {
  let searchQuery = {};
  if (req.query.search) {
    searchQuery = {
      categoryName: { $regex: new RegExp(req.query.search) },
    };
  }
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const documentCount = await EntityCategory.countDocuments({
    type: req.params.type.toUpperCase(),
    ...searchQuery,
  });
  const features = new APIFeatures(
    EntityCategory.find({ type: req.params.type.toUpperCase() }),
    req.query
  )
    .search('categoryName')
    .filter()
    .sort('categoryName')
    .fields()
    .paginate();

  const categories = await features.query;
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? parseInt(documentCount / limit, 10)
        : parseInt(documentCount / limit, 10) + 1,
    currentPage,
    results: categories.length,
    data: categories,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await EntityCategory.create({
    type: req.params.type.toUpperCase(),
    categoryName: req.body.categoryName,
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'category created successfully',
    data: category,
  });
});
