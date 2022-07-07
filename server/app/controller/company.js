/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const fs = require('fs');
const AWS = require('aws-sdk');
const { wrap: async } = require('co');
const Company = require('../models/company');
// const TestCompany = require('../models/testCompanyModel');
const News = require('../models/news');
const Event = require('../models/event');

const Product = require('../models/productModel');
const Service = require('../models/service');
const Sub_user = require('../models/sub_user');
const User = require('../models/user');
const Authorization = require('../config/middlewares/authorization');
const aws_upload = require('../config/middlewares/aws');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const aws = require('../config/middlewares/aws');
const ElasticSearch = require('../config/middlewares/elasticConfig');
const job = require('../models/job');
// const ProfileView = require('../models/profileViewModel');
const eventEmitter = require('./events');
const IntList = require('../models/interestList');

// Company Detail Function
exports.companyDetail = catchAsync(async (req, res, next) => {
  //  console.log(typeof req.query.comp_id);
  const companyDetail = await Company.findById(req.query.comp_id).populate(
    'jobs services events news products'
  );
  if (!companyDetail) {
    return next(new AppError('company with this id not found', 404));
  }
  let isInterested = false;
  if (req.isAuth) {
    eventEmitter.emit(
      'addView',
      { id: companyDetail.comp_id, user_type: 2 },
      { id: req.decodedData.id, user_type: req.decodedData.user_type },
      Date.now()
    );
    console.log('executed');
    const interest = await IntList.findOne({
      interestId: companyDetail._id,
      interestType: 'COMPANY',
      userId: req.decodedData.id,
    });
    if (interest) isInterested = true;
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    isInterested,
    data: companyDetail,
  });
});

exports.checkCompanyId = catchAsync(async (req, res, next) => {
  console.log(req.query.company_id);
  const company = await Company.countDocuments({
    'comp_info.company_id': req.query.company_id,
  });
  if (company >= 1) {
    return next(
      new AppError('company with this companyID already exists', 208)
    );
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
  });
});

/* try {
    let token = await getTokenFromHeaders(req.headers.token);
    var decoded = jwt.verify(token, 'secret');
    const comp_id = decoded.id;
    const fields = req.body;
    if (fields.update_type == 1) {
      console.log(comp_id);
      console.log(fields);

      await Company.findOneAndUpdate(
        { comp_id: comp_id },
        { comp_info: fields }
      ).exec();
      res.send({ status: 'Success', message: 'Data updated successfully' });
    } else if (fields.update_type == 2) {
      //Social update
      let addObj = { tag: req.body.tag, link: req.body.link };
      Company.findOneAndUpdate(
        { comp_id: comp_id },
        { $push: { social_link: addObj } }
      ).exec();
      res.send({ status: 'Success', message: 'Link Added Successfully' });
    } else if (fields.update_type == 3) {
      // update contact
      Company.findOneAndUpdate(
        { comp_id: comp_id },
        { contact_info: fields }
      ).exec();
      res.send({ status: 'Success', message: 'Info updated successfully' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: 'Error', message: err });
  } */

exports.companyEdit = catchAsync(async (req, res, next) => {
  // 5ff326408177e50bd0ebc29d
  console.log(req.body);
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await Sub_user.findOne({
      user_id: req.decodedData.id,
      isActive: true,
      isDeleted: false,
    });
    companyId = subUser.comp_id;
  }

  const { social_link } = req.body;
  const { comp_info } = req.body;
  const { contact_info } = req.body;
  // const validSubUser =
  const company = await Company.findOne({ comp_id: companyId });
  const companyName = company.comp_info.comp_name;
  if (req.body.contact_info) company.contact_info = req.body.contact_info;
  if (req.body.social_link) company.social_link = req.body.contact_info;
  if (req.body.comp_info) company.comp_info = req.body.comp_info;

  await company.save({ validateModifiedOnly: true });
  console.log(companyName);
  console.log(company);
  const updatedCompanyProfile = await Company.findOneAndUpdate(
    { comp_id: req.decodedData.id },
    {
      comp_info,
      contact_info,
      social_link,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(updatedCompanyProfile);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: company,
  });
});

/* --News Start--*/

// Add new News Function

exports.addNews = async (req, res) => {
  try {
    //Get Data in Body..
    // var companyData = {
    //   comp_id: '601a5465ceae681754428fff',
    //   name: 'Braking News',
    //   from_date: '11-01-2020',
    //   to_date: '11-11-2020',
    //   description:
    //     "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n" +
    //     '\n',
    //   news_image: 'test.png',
    // };
    var companyData = req.body;
    const add_news = new News(companyData);
    await add_news.save();
    res.send({ message: 'News added' });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

// Get News List
exports.getNews = async (req, res) => {
  try {
    console.log(req.query.comp_id);
    const comp_id = parseInt(req.query.comp_id);
    const companyData = await Company.findOne({ comp_id }).exec();
    const newsData = await News.find({ comp_id, isActive: true }).exec();
    const result = {
      comapnyDate: companyData,
      newsData,
    };
    if (newsData) {
      res.send({ status: 'success', result });
    } else {
      res.status(404).send({ status: 'error', message: 'No data Found' });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
/* --News End--*/

/* --Product Start--*/

// Add Prodcut

exports.addProdcut = async (req, res) => {
  try {
    const productData = {
      comp_id: 83432381800015,
      prod_name: 'CreateBytes',
      prod_price: 10,
      availability: 'Yes',
      reference: 'test',
      url: 'www.google.com',
      category: [],
      in_stock: true,
      pricing_plan: '',
      delivery_time: '1236547',
      short_desc:
        'Generally, you only use getters on primitive paths as opposed to arrays or subdocuments. Because getters override what accessing a Mongoose path returns, declaring a getter on an object may remove Mongoose change tracking for that path',
      full_desc:
        'Generally, you only use getters on primitive paths as opposed to arrays or subdocuments. Because getters override what accessing a Mongoose path returns, declaring a getter on an object may remove Mongoose change tracking for that path',
    };
    const product = new Product(productData);
    await product.save();
    // await sendEmail(parseInt(process.env['AddProduct']),user.email);
    if (!(await sendEmail(parseInt(2, ' ')))) {
      console.log('error sending email');
    } else {
      console.log('email sent successfully');
    }
    res.send({ message: 'Product added' });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

// Get Company Product List

exports.getProduct = async (req, res) => {
  try {
    const { comp_id } = req.query;
    const companyData = await Company.findOne({ comp_id }).exec();
    const prodData = await Product.find({
      comp_id,
      isActive: true,
    }).exec();
    const result = {
      comapnyDate: companyData,
      prodData,
    };
    if (prodData) {
      res.send({ status: 'success', result });
    } else {
      res.status(404).send({ status: 'error', message: 'Product Not Found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
};

/* --Product End--*/

/* --Add Event--*/

exports.addEvent = async (req, res) => {
  try {
    const token = await getTokenFromHeaders(req.headers.token);
    const decoded = jwt.verify(token, 'secret');
    const comp_id = decoded.id;
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      fields.comp_id = comp_id;
      const file_name = `event${Date.now()}.jpg`;
      const bucket = 'sendbizbucket';
      await aws_upload
        .uploadToS3(files.image, bucket, ' ', file_name)
        .then((res) => {
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
        });
      fields.image = file_name;
      const event_data = new Event(fields);
      await event_data.save();
      res.send({ status: 'Success', message: 'Event Add Successfully' });
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 'error', message: err });
  }
};

exports.eventList = async (req, res) => {
  try {
    const token = await getTokenFromHeaders(req.headers.token);
    const decoded = jwt.verify(token, 'secret');
    const comp_id = decoded.id;
    const eventData = await Event.find({ comp_id }).exec();
    const result = {
      event: eventData,
    };
    if (result) {
      res.send({ status: 'success', result });
    } else {
      res.status(404).send({ status: 'error', message: 'Service Not Found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
};
/* --Service Start--*/

// Add Service

exports.addService = async (req, res) => {
  try {
    const serviceData = {
      comp_id: 83432381800015,
      name: 'CreateBytes',
      duration: 'test',
      location: 'India',
      price: 10,
      period: '10',
      availability: 'Yes',
      reference: 'test',
      url: 'www.google.com',
      experience: '10',
      in_stock: true,
      pricing_plan: '',
      delivery_time: '1236547',
      short_desc:
        'Generally, you only use getters on primitive paths as opposed to arrays or subdocuments. Because getters override what accessing a Mongoose path returns, declaring a getter on an object may remove Mongoose change tracking for that path',
      full_desc:
        'Generally, you only use getters on primitive paths as opposed to arrays or subdocuments. Because getters override what accessing a Mongoose path returns, declaring a getter on an object may remove Mongoose change tracking for that path',
    };
    const service = new Service(serviceData);
    await service.save();
    res.send({ message: 'Service added' });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

// Get Service

exports.getService = async (req, res) => {
  try {
    const comp_id = parseInt(req.query.comp_id);
    const companyData = await Company.findOne({ comp_id }).exec();
    const serviceData = await Service.find({
      comp_id,
      isActive: true,
    }).exec();
    const result = {
      comapnyDate: companyData,
      serviceData,
    };
    if (serviceData.length) {
      res.send({ status: 'success', result });
    } else {
      res.status(404).send({ status: 'error', message: 'Service Not Found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
};
/* --Service End--*/

/* --Company Sub User Start--*/

// Add Sub User

exports.addSubuser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (req.body.subUserData) {
    const processedImage = await sharp(req.body.subUserData.buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toBuffer();

    const uploadedImage = await aws.s3
      .upload({
        Bucket: 'sendbizbucket/company/subuser',
        Key: req.body.subUserData.filename,
        Body: processedImage,
        ACL: 'public-read',
      })
      .promise();
    req.body.user_image = uploadedImage.Key;
  }
  console.log(req.body);
  const company = await Company.findOne({ comp_id: req.decodedData.id });
  const mailCheck = await User.findOne({
    email: req.body.email,
  });

  if (mailCheck) {
    return next(new AppError('This email id already exists', 401));
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    user_type: 3,
    comp_detail: {
      company_name: company.comp_info.comp_name,
    },
  });
  const subUser = await Sub_user.create({
    ...req.body,
    comp_id: req.decodedData.id,
    user_id: user._id,
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'sub user created',
    data: subUser,
  });
});

// Get Sub User

exports.getSubuser = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 10;
  const documentCount = await Sub_user.countDocuments({
    comp_id: req.decodedData.id,
  });
  const features = new APIFeatures(
    Sub_user.find({ comp_id: req.decodedData.id, isDeleted: { $ne: true } }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .paginate();
  const subUserList = await features.query;
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit, 10) + 1,
    currentPage,
    results: subUserList.length,
    data: subUserList,
  });
});

exports.editSubUser = catchAsync(async (req, res, next) => {
  if (req.body.comp_id || req.body.user_id) {
    return next(
      new AppError('Updation of comp_id or user_id is strictly forbidden', 403)
    );
  }
  const subUser = await Sub_user.findOne({
    _id: req.params.subUserId,
    comp_id: req.decodedData.id,
    isDeleted: { $ne: true },
  });
  if (!subUser) {
    return next(
      new AppError(
        'Sub User with this account does not found in your account',
        404
      )
    );
  }
  if (req.body.title) subUser.title = req.body.title;
  if (req.body.first_name) subUser.first_name = req.body.first_name;
  if (req.body.last_name) subUser.last_name = req.body.last_name;
  if (req.body.permission) subUser.permission = req.body.permission;
  if (req.body.fee) subUser.fee = req.body.fee;
  if (req.body.email) {
    let error = false;
    const user = await User.findById(subUser.user_id);
    if (!user) {
      return next(new AppError('user linked to this subuser notfound', 404));
    }
    user.email = req.body.email;
    await user.save().catch((err) => {
      if (err) {
        error = true;
      }
    });
    if (error) return next(new AppError('error updating email of subuser'));
    subUser.email = req.body.email;
  }
  await subUser.save({ validateModifiedOnly: true });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'Sub User updated successfully',
    data: subUser,
  });
});

// exports.toggleStatus = catchAsync(async (req, res, next) => {
//   const subUser = Sub_user.findOne({
//     _id: req.params.subUserId,
//     comp_id: req.decodedData.id,
//     isDeleted: { $ne: true },
//   });
//   if(!subUser)return next(new AppError(''))
// })

/* --Company Sub User End--*/

const getTokenFromHeaders = (authorization) => {
  //  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

exports.editAvtar = async (req, res) => {
  try {
    const token = await getTokenFromHeaders(req.headers.token);
    const decoded = jwt.verify(token, 'secret');
    const can_id = decoded.id;
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
      let file_name = '';
      if (fields.update_type == 'cover') {
        file_name = `cover${Date.now()}.jpg`;
      }
      if (fields.update_type == 'logo') {
        file_name = `logo${Date.now()}.jpg`;
      }
      if (files.logo !== undefined) {
        const oldpath = files.logo.path;
        const bucket = 'sendbizbucket';
        await uploadToS3(files.iamge, bucket, '', file_name)
          .then((res) => {})
          .catch((err) => {});
      }
    });
  } catch (err) {
    res.send({ mes: 'error', error: err });
  }
};

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 30;
  const page = parseInt(req.query.page) || 1;
  const features = new APIFeatures(
    Company.find({
      'comp_info.comp_name': {
        $regex: new RegExp(req.query.search),
        $options: '$i',
      },
      isActive: true,
    }),
    req.query
  )
    .filter()
    .sort('-join-date')
    .fields()
    .paginate();
  const companies = await features.query;
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    currentPage: page,
    results: companies.length,
    data: companies,
  });
});

exports.getCompaniesWithSponsored = catchAsync(async (req, res, next) => {
  const actualLimit = req.query.limit || 10;

  //SPONSORED JOBS LIST
  req.query.limit = 2;
  let totalCount;
  totalCount = Company.countDocuments({
    isDeleted: { $ne: true },
    isActive: true,
    isSpnsored: true,
    sponsorExpiresAt: { $gte: Date.now() },
  });
  const sponsoredFeatures = new APIFeatures(
    Company.find({
      isDeleted: { $ne: true },
      isActive: true,
      isSponsored: true,
      sponsorExpiresAt: { $gte: Date.now() },
    }).sort('-clicksPerDay -totalCLicks'),
    req.query
  )
    .search('comp_info.comp_name')
    .filter()
    .sort('-join-date')
    .fields()
    .paginate(2);

  let sponsoredCompany = sponsoredFeatures.query.populate([
    'services',
    'news',
    'products',
    'events',
    'jobs',
  ]);

  const [count, sCompany] = await Promise.all([totalCount, sponsoredCompany]);
  console.log(count, sCompany);

  //NON SPONSORED JOBS LIST
  req.query.limit = count === 0 ? actualLimit : actualLimit - count;
  const limit = req.query.limit;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const nonSponQuery = {
    isActive: true,
    isSpnsored: { $ne: true },
    isDeleted: { $ne: true },
  };
  const companyCount = await Company.countDocuments(nonSponQuery);
  const features = new APIFeatures(Company.find(nonSponQuery), req.query)
    .search('comp_info.comp_name')
    .filter()
    .sort('-join-date')
    .fields()
    .paginate();

  let companyList = features.query.populate([
    'services',
    'news',
    'products',
    'events',
    'jobs',
  ]);

  const [nonSponCount, companies] = await Promise.all([
    companyCount,
    companyList,
  ]);
  console.log(nonSponCount);

  const data = [...sCompany, ...companies];
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

exports.uploadCompanyMedia = catchAsync(async (req, res, next) => {
  let company;
  if (req.decodedData.user_type === 2) {
    company = await Company.findOne({ comp_id: req.decodedData.id });
  }
  if (req.decodedData.user_type === 3) {
    const subUser = await Sub_user.findOne({ user_id: req.decodedData.id });
    company = await Company.findOne({ comp_id: subUser.comp_id });
  }
  if ('media' in req.body) {
    company.comp_media = req.body.media;
  }
  await company.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'media uploaded successfully',
    data: company,
  });
});

exports.premiumCompanyValidator = (Model, queryField) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.decodedData);
    const company = await Company.findOne({
      comp_id: req.decodedData.id,
    });
    if (!('isPremium' in company) || !company.isPremium) {
      const count = await Model.countDocuments({
        [queryField]: req.decodedData.id,
        isDeleted: { $ne: true },
      });
      if (count >= process.env.PREMIUM_COUNT)
        return next(
          new AppError(
            'You have exceeded your max limit of 5, Subscribe to premium to get full access',
            401
          )
        );
    }
    next();
  });

exports.uploadLogoAndCover = catchAsync(async (req, res, next) => {
  let companyId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subUser = await Sub_user.findOne({ user_id: req.decodedData.id });
    companyId = subUser.comp_id;
  }
  const updatedCompany = await Company.findOne({
    comp_id: companyId,
  });
  console.log(updatedCompany);
  if (req.body.companyLogoData) {
    updatedCompany.logo.name = req.body.companyLogoData.fileName;
    await updatedCompany.save();
  }
  if (req.body.companyCoverData) {
    updatedCompany.coverImage.name = req.body.companyCoverData.fileName;
    await updatedCompany.save();
  }
  // add url in the updatedCompany

  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: updatedCompany,
  });
});

const canCreate = (count) => (5 - count < 0 ? false : 5 - count !== 0);

exports.getPremiumDetail = catchAsync(async (req, res, next) => {
  let company;
  if (req.decodedData.user_type === 2) {
    company = await Company.findOne({ comp_id: req.decodedData.id });
  }
  if (req.decodedData.user_type === 3) {
    const subUser = await Sub_user.findOne({ user_id: req.decodedData.id });
    company = await Company.findOne({ comp_id: subUser.comp_id });
  }
  if (!('isPremium' in company) || !company.isPremium) {
    const serviceCount = Service.countDocuments({
      companyId: req.decodedData.id,
    });
    const productCount = Product.countDocuments({
      companyId: req.decodedData.id,
    });
    const jobCount = job.countDocuments({
      comp_id: req.decodedData.id,
    });
    const newsCount = News.countDocuments({
      companyId: req.decodedData.id,
    });
    const eventCount = Event.countDocuments({
      companyId: req.decodedData.id,
    });
    const [service, product, jobs, news, event] = await Promise.all([
      serviceCount,
      productCount,
      jobCount,
      newsCount,
      eventCount,
    ]);
    return res.status(200).json({
      status: 'success',
      isSuccess: true,
      premium: company.isPremium,
      data: {
        services: canCreate(service),
        jobs: canCreate(jobs),
        products: canCreate(product),
        news: canCreate(news),
        events: canCreate(event),
      },
    });
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    premium: company.isPremium,
    data: {
      services: true,
      jobs: true,
      products: true,
      news: true,
      events: true,
    },
  });
});
