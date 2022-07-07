const Event = require('../models/event');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Candidate = require('../models/candidate');
const Company = require('../models/company');
const SubUser = require('../models/sub_user');
const { premiumCompanyValidator } = require('./company');

exports.premiumEventValidator = premiumCompanyValidator(Event, 'companyId');

exports.createEvent = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subUser.comp_id;
  }
  let event = await Event.create({
    ...req.body,
    companyId,
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'Event created successfully',
    data: event,
  });
});

exports.queryForAll = (req, res, next) => {
  req.queryData = {
    isActive: true,
    isDeleted: { $ne: true },
  };
  next();
};

exports.queryForCompany = async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subUser.comp_id;
  }
  req.queryData = {
    isActive: true,
    isDeleted: { $ne: true },
    companyId,
  };
  next();
};

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const documentCount = await Event.countDocuments({
    ...req.queryData,
  });
  const features = new APIFeatures(Event.find({ ...req.queryData }), req.query)
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate();
  let events = await features.query.populate({
    path: 'companyData',
    select: 'comp_info.comp_name comp_info.bus_name',
  });
  events = JSON.parse(JSON.stringify(events));
  events.map((event) => {
    event.imagePath = [];
    event.image.map((key) => {
      if (
        key !== null &&
        key.startsWith('company/event/image/CompanyEventImage')
      ) {
        event.imagePath.push(`${process.env.AWS_STATIC_URL}/${key}`);
        return;
      }
      event.imagePath.push('');
    });
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? parseInt(documentCount / limit, 10)
        : parseInt(documentCount / limit, 10) + 1,
    results: events.length,
    currentPage,
    data: events,
  });
});

exports.getOneEvent = catchAsync(async (req, res, next) => {
  let event = await Event.findOne({
    _id: req.params.eventId,
    isDeleted: { $ne: true },
    isActive: true,
  }).populate('companyData');
  if (!event) {
    return next(new AppError('event with this Id does not exist', 401));
  }
  event = JSON.parse(JSON.stringify(event));
  event.hasLiked = false;
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
    const likedIndex = event.likes.findIndex(
      (like) => like.refId.toString() === identity._id.toString()
    );
    event.hasLiked = likedIndex !== -1 ? true : false;
    myEntity = event.companyId == req.decodedData.id ? true : false;
  }
  event.imagePath = [];
  event.image.map((key) => {
    if (
      key !== null &&
      key.startsWith('company/event/image/CompanyEventImage')
    ) {
      event.imagePath.push(`${process.env.AWS_STATIC_URL}/${key}`);
      return;
    }
    event.imagePath.push('');
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    myEntity,
    data: event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subUser.comp_id;
  }
  const event = await Event.findOne({
    _id: req.params.eventId,
    companyId,
    isDeleted: { $ne: true },
  });
  if (!event) {
    return next(
      new AppError('No event found with this eventId in your account', 404)
    );
  }
  event.isDeleted = true;
  await event.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: `event '${event.name}' has been successfully deleted`,
    data: event,
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subUser.comp_id;
  }
  const event = await Event.findOne({
    _id: req.params.eventId,
    companyId,
    isDeleted: { $ne: true },
  });
  if (!event) {
    return next(
      new AppError('No event found with this eventId in your account', 404)
    );
  }
  let validateDateSaperately = true;
  if (req.body.to && req.body.from) {
    validateDateSaperately = false;
    if (
      new Date(req.body.to).toISOString() <
      new Date(req.body.from).toISOString()
    ) {
      return next(
        new AppError('to date cannot be smaller than from date', 401)
      );
    }
  }
  if (validateDateSaperately) {
    if (req.body.from) {
      if (
        Date.parse(event.to) < Date.parse(new Date(req.body.from).toISOString())
      ) {
        return next(
          new AppError('from date cannot be higher than to Date', 401)
        );
      }
    }
    if (req.body.to) {
      if (
        Date.parse(new Date(req.body.to).toISOString()) < Date.parse(event.from)
      ) {
        return next(
          new AppError('to date cannot be smaller than from date', 401)
        );
      }
    }
  }
  const updatedEvent = await Event.findByIdAndUpdate(event._id, req.body, {
    new: true,
    runValidators: true,
  }).populate('companyData');
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'Event updated successfully',
    data: updatedEvent,
  });
});

exports.toggleStatus = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await SubUser.findOne({ user_id: req.decodedData.id });
    companyId = subUser.comp_id;
  }
  const event = await Event.findOne({
    _id: req.params.eventId,
    companyId,
    isDeleted: { $ne: true },
  });
  if (!event) {
    return next(
      new AppError('event with this id does not found in your account', 404)
    );
  }
  event.isActive = !event.isActive;
  await event.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: `event status changed to ${event.isActive}`,
    data: event,
  });
});

exports.addRemoveLikes = catchAsync(async (req, res, next) => {
  let event = await Event.findOne({
    _id: req.params.eventId,
    isDeleted: { $ne: true },
    isActive: true,
  }).populate('companyData');
  if (!event) {
    return next(new AppError('event with this Id does not exist', 401));
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
    };
  } else if (req.decodedData.user_type === 2) {
    identity = await Company.findOne({ comp_id: req.decodedData.id });
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
  const index = event.likes.findIndex(
    (val) => val.refId.toString() === identity._id.toString()
  );
  let liked;
  if (index !== -1) {
    liked = false;
    event.likes = event.likes.filter(
      (val) => val.refId.toString() !== data.refId.toString()
    );
  } else {
    liked = true;
    event.likes.unshift(data);
  }
  await event.save();
  event = JSON.parse(JSON.stringify(event));
  event.hasLiked = liked;
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: liked
      ? 'You have successfully liked this event'
      : 'You have unliked this event',
    data: event,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({
    _id: req.params.eventId,
    isDeleted: { $ne: true },
    isActive: true,
  }).populate('companyData');
  if (!event) {
    return next(new AppError('event with this Id does not exist', 401));
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
  event.comments.unshift(data);
  await event.save();
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'comment created successfully',
    data: event,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({
    _id: req.params.eventId,
    isDeleted: { $ne: true },
    isActive: true,
  }).populate('companyData');
  if (!event) {
    return next(new AppError('event with this Id does not exist', 401));
  }
  const [comment] = event.comments.filter(
    (val) => val._id == req.params.commentId
  );
  if (!comment) {
    return next(new AppError('comment with this id not found', 404));
  }
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
  event.comments = event.comments.filter(
    (val) => val._id != req.params.commentId
  );
  await event.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'comment deleted successfully',
    data: event,
  });
});
