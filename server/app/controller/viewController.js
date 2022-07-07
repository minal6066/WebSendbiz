const { ObjectId } = require('mongoose').Types;
const ProfileView = require('../models/profileViewModel');
const catchAsync = require('../utils/catchAsync');

exports.deleteAllViews = catchAsync(async (req, res, next) => {
  await ProfileView.deleteMany();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'Views deleted successfully',
  });
});

exports.getAllViews = catchAsync(async (req, res, next) => {
  const views = await ProfileView.find()
    .populate('userId')
    .populate('viewedBy');
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: views,
  });
});

exports.getViewStats = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const viewStats = await ProfileView.aggregate([
    {
      $unwind: '$viewedAt',
    },
    {
      $match: {
        userId: ObjectId(req.decodedData.id),
        viewedAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$viewedAt' },
        viewCount: { $sum: 1 },
        userId: { $push: '$viewedBy' },
      },
    },
    {
      $lookup: {
        as: 'viewedBy',
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
      },
    },
    {
      $project: {
        viewedBy: { password: 0 },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    currentYear: year,
    totalViews: viewStats.reduce((acc, curr) => {
      return acc + curr.viewCount;
    }, 0),
    data: viewStats,
  });
});
