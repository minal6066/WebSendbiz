const sharp = require('sharp');
const Service = require('../models/service');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { s3, getPresignedUrl } = require('../config/middlewares/aws');
const { premiumCompanyValidator } = require('./company');
const { sendEmail } = require('./emailController');
const SubUser = require('../models/sub_user');
const IntList = require('../models/interestList');
const Sponsored = require('../models/sponsored');

exports.premiumServiceValidator = premiumCompanyValidator(Service, 'companyId');

exports.queryForAll = (req, res, next) => {
  req.queryData = {
    isActive: true,
    isDeleted: { $ne: true },
  };
  next();
};

exports.queryForCompany = (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  req.queryData = {
    companyId: compId,
    isDeleted: { $ne: true },
  };
  next();
};

exports.getAllServices = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const currentPage = parseInt(req.query.page) || 1;
  const totalDocuments = await Service.countDocuments(req.queryData);
  const features = new APIFeatures(Service.find(req.queryData), req.query)
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate();
  let services = await features.query.populate({
    path: 'companyData',
    select: 'comp_info.comp_name',
  });
  services = JSON.parse(JSON.stringify(services));
  services.map((service) => {
    service.brochurePath = [];
    service.brochure.map((key) => {
      if (
        key !== null &&
        key.startsWith('company/service/brochures/CompanyServiceBrochures')
      ) {
        service.brochurePath.push(`${process.env.AWS_STATIC_URL}/${key}`);
        return;
      }
      service.brochurePath.push('');
    });
    service.media.map((file) => {
      if (
        file.fileName !== null &&
        file.fileName.startsWith('company/service/media/CompanyServiceMedia')
      ) {
        file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        return;
      }
      file.filePath = '';
    });
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: totalDocuments,
    currentPage,
    totalPages:
      totalDocuments % limit === 0
        ? totalDocuments / limit
        : parseInt(totalDocuments / limit) + 1,
    results: services.length,
    data: services,
  });
});

exports.getServiceWithSponsored = catchAsync(async (req, res, next) => {
  const actualLimit = req.query.limit || 10;
  // const currentPage = parseInt(req.query.page) || 1;
  //SPONSORED JOBS LIST
  req.query.limit = 2;
  let totalCount;
  totalCount = Service.countDocuments({
    isDeleted: { $ne: true },
    isActive: true,
    isSpnsored: true,
    sponsorExpiresAt: { $gte: Date.now() },
  });
  const sponsoredFeatures = new APIFeatures(
    Service.find({
      isDeleted: { $ne: true },
      isActive: true,
      isSponsored: true,
      sponsorExpiresAt: { $gte: Date.now() },
    }).sort('-clicksPerDay -totalCLicks'),
    req.query
  )
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate(2);

  let sponsoredServices = sponsoredFeatures.query.populate({
    path: 'companyData',
    select: 'comp_info.comp_name comp_info.bus_name',
  });

  const [count, sServices] = await Promise.all([totalCount, sponsoredServices]);
  console.log(count, sServices);

  //NON SPONSORED JOBS LIST
  req.query.limit = count === 0 ? actualLimit : actualLimit - count;
  const limit = req.query.limit;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const nonSponQuery = {
    isActive: true,
    isSpnsored: { $ne: true },
    isDeleted: { $ne: true },
  };
  const serviceCount = await Service.countDocuments(nonSponQuery);
  const features = new APIFeatures(Service.find(nonSponQuery), req.query)
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate();

  let serviceList = features.query.populate({
    path: 'companyData',
    select: 'comp_info.comp_name comp_info.bus_name',
  });

  const [nonSponCount, services] = await Promise.all([
    serviceCount,
    serviceList,
  ]);
  console.log(nonSponCount);

  const data = [...sServices, ...services];
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

exports.createService = catchAsync(async (req, res, next) => {
  if (!req.body.currency)
    return next(new AppError('currency is a required field', 401));
  if (!req.body.amount)
    return next(new AppError('amount is a required field', 401));
  req.body.price = {
    currency: req.body.currency,
    amount: req.body.amount,
  };
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const service = await Service.create({
    ...req.body,
    companyId: compId,
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'service created successfully',
    data: service,
  });
});

exports.getOneService = catchAsync(async (req, res, next) => {
  let service = await Service.findOne({
    _id: req.params.serviceId,
    ...req.queryData,
  }).populate('companyData');
  if (!service) return next(new AppError('No service found matching this id'));
  let isInterested = false;
  let myEntity = false;
  if (req.isAuth) {
    const interest = await IntList.findOne({
      interestType: 'SERVICE',
      interestId: service._id,
      userId: req.decodedData.id,
    });
    if (interest) isInterested = true;
    myEntity = service.companyId == req.decodedData.id ? true : false;
  }
  service = JSON.parse(JSON.stringify(service));
  service.brochurePath = [];
  if (service.brochure.length >= 1) {
    service.brochure.map((key) => {
      if (
        key !== null &&
        key.startsWith('company/service/brochures/CompanyServiceBrochures')
      ) {
        service.brochurePath.push(`${process.env.AWS_STATIC_URL}/${key}`);
        return;
      }
      service.brochurePath.push('');
    });
  }
  service.media.map((file) => {
    if (
      file.fileName !== null &&
      file.fileName.startsWith('company/service/media/CompanyServiceMedia')
    ) {
      file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
      return;
    }
    file.filePath = '';
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    isInterested,
    myEntity,
    data: service,
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  if (req.body.isDeleted)
    return next(new AppError('this route is not for delete service', 401));
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const service = await Service.findOne({
    _id: req.params.serviceId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!service) {
    return next(
      new AppError('Service with this id does not found in your account', 404)
    );
  }
  let shouldCheck = true;
  if (req.body.currency && req.body.amount) {
    req.body.price = {};
    req.body.price = {
      currency: req.body.currency,
      amount: req.body.amount,
    };
    shouldCheck = false;
  }
  if (shouldCheck) {
    if (req.body.currency) {
      req.body.price = {};
      req.body.price = {
        currency: req.body.currency,
        amount: service.price.amount,
      };
    }
    if (req.body.amount) {
      req.body.price = {};
      req.body.price = {
        currency: service.price.currency,
        amount: req.body.amount,
      };
    }
  }

  const updatedService = await Service.findOneAndUpdate(
    { _id: req.params.serviceId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'service update successfully',
    data: updatedService,
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const myService = await Service.findOne({
    _id: req.params.serviceId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!myService) {
    return next(
      new AppError('No service found in your account with this Id', 404)
    );
  }
  const deletedService = await Service.findOneAndUpdate(
    { _id: myService._id },
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: `Service ${deletedService.name} has been successfully deleted`,
    data: deletedService,
  });
});

exports.uploadServiceMedia = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const service = await Service.findOne({
    _id: req.params.serviceId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!service) {
    return next(
      new AppError('service with this id does not found in your account', 404)
    );
  }
  req.body.media = [];
  if (req.body.serviceMediaData) {
    await Promise.all(
      req.body.serviceMediaData.map(async (file) => {
        console.log(file);
        if (file.type === 'image') {
          const filename = `${compId}-${Date.now()}.jpeg`;
          const processedImage = await sharp(file.buffer)
            .toFormat('jpeg')
            .jpeg({ quality: 70 })
            .toBuffer();

          const uploadedImage = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET_COMPANY_SERVICE_MEDIA,
              Key: filename,
              Body: processedImage,
              ACL: 'public-read',
            })
            .promise();
          // console.log(uploadedImage);
          req.body.media.unshift({
            fileType: file.type,
            fileName: uploadedImage.Key,
          });
        }
        if (file.type === 'video') {
          const filename = `${compId}-${Date.now()}.${file.ext}`;
          const uploadedFile = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET_COMPANY_SERVICE_MEDIA,
              Key: filename,
              Body: file.buffer,
              ACL: 'public-read',
            })
            .promise();
          // console.log(uploadedFile);
          req.body.media.unshift({
            fileType: file.type,
            fileName: uploadedFile.Key,
          });
        }
      })
    );
  }
  // console.log(req.body.media);
  const updatedService = await Service.findOneAndUpdate(
    { _id: service._id },
    {
      $push: {
        media: {
          $each: req.body.media,
          $position: 0,
        },
      },
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'media uploaded successfully',
    data: updatedService,
  });
});

exports.deleteServiceMedia = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const service = await Service.findOne({
    _id: req.params.serviceId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!service) {
    return next(
      new AppError('service with this id does not found in your account', 404)
    );
  }
  const preservedMedia = service.media.filter((media) => {
    if (req.params.mediaId != media._id) {
      return media;
    }
  });
  service.media = preservedMedia;
  await service.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'media deleted successfully',
    data: service,
  });
});

exports.toggleInActive = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const service = await Service.findOne({
    _id: req.params.serviceId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!service) {
    return next(
      new AppError('service with this id does not found in your account', 404)
    );
  }
  service.isActive = !service.isActive;
  await service.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: `isActive status set to ${service.isActive}`,
    data: service,
  });
});
