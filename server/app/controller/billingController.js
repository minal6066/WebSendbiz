const join = require('path').join;
const { readFileSync } = require('fs');
const EventEmitter = require('events');
const Stripe = require('stripe');
// const pug = require('pug');
// const puppeteer = require('puppeteer');
// const pdfCreator = require('pdf-creator-node');
const Billing = require('../models/billingModel');
const SubBilling = require('../models/subBillingModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Service = require('../models/service');
const Product = require('../models/productModel');
const Event = require('../models/event');
const Job = require('../models/job');
const Company = require('../models/company');
const eventEmitter = require('./events');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/user');

const assets = join(__dirname, '../assets');

// const invoiceHtml = readFileSync(`${assets}/invoice.pug`, 'utf-8');

const sponsorEvent = new EventEmitter();

sponsorEvent.on('sponsorEntity', async (entity, price, days) => {
  console.log(price);
  try {
    const totalClicks = price * 10;
    const clicksPerDay = parseInt(totalClicks / days, 10);
    entity.totalClicks = totalClicks;
    entity.clicksPerDay = clicksPerDay;
    entity.isSponsored = true;
    const date = new Date();
    date.setDate(date.getDate() + days);
    entity.sponsorExpiresAt = date;
    await entity.save();
    console.log('entity updated', entity);
  } catch (err) {
    console.log(err);
  }
});

const stripe = Stripe(process.env.SECRET_KEY);

exports.createPremiumSubscription = catchAsync(async (req, res, next) => {
  let userBilling, premiumPackageIndex, premiumPackageExist, subBilling;

  userBilling = await Billing.findOne({ user: req.decodedData.id }).populate(
    'packages'
  );
  console.log(userBilling);
  if (!userBilling) {
    let currentDate = new Date(Date.now());
    currentDate.setMonth(currentDate.getMonth() + 1);
    userBilling = await Billing.create({
      user: req.decodedData.id,
      startDate: Date.now(),
      endDate: currentDate,
    });
  } else {
    premiumPackageIndex = userBilling.packages.findIndex((package) => {
      console.log(package);
      return package.isBase === true;
    });
    console.log(premiumPackageIndex);
    premiumPackageExist = premiumPackageIndex !== -1 ? true : false;
  }
  if (!premiumPackageExist) {
    subBilling = await SubBilling.create({
      isBase: true,
      type: 'Premium',
      entity: { entityId: req.decodedData.id, name: 'profile' },
      billingId: userBilling._id,
      isActive: false,
      isReccuring: true,
    });
    userBilling.packages.push(subBilling._id);
    await userBilling.save();
    console.log(userBilling);
  }
  await userBilling.execPopulate('packages');
  console.log(userBilling);
  premiumPackageIndex = userBilling.packages.findIndex((package) => {
    console.log(package);
    return package.isBase == true;
  });
  console.log(premiumPackageIndex);
  premiumPackageExist = premiumPackageIndex !== -1 ? true : false;
  if (userBilling.packages[premiumPackageIndex].isActive) {
    return next(new AppError('You premium package has not ended yet', 200));
  }
  console.log(userBilling);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: process.env.PREMIUM_PACKAGE_PRICE * 100,
    currency: 'inr',
    payment_method: 'pm_1IVw7DBTuxm47TYAPjdruO2S',
    customer: req.stripeUser.stripeCxId,
  });
  const confirmPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    {
      payment_method: 'pm_1IVw7DBTuxm47TYAPjdruO2S',
    }
  );
  console.log(confirmPaymentIntent);
  if (confirmPaymentIntent.status !== 'succeeded') {
    return next(new AppError('Something went wrong', 400));
  }
  const [package] = userBilling.packages.filter(
    (package) => package.isBase === true
  );
  console.log(package);
  const order = await Order.create({
    type: 'Premium',
    packages: [package._id],
    price: process.env.PREMIUM_PACKAGE_PRICE,
    user: req.decodedData.id,
    paid: true,
    paymentId: paymentIntent.id,
  });
  let month = new Date(Date.now());
  month.setMonth(month.getMonth() + 1);
  const updatedPackage = await SubBilling.findByIdAndUpdate(
    package._id,
    {
      isActive: true,
      expiresAt: month,
    },
    { new: true, runValidators: true }
  );
  const userBilling2 = await Billing.findOne({ user: req.decodedData.id });
  console.log(order);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: { updatedPackage, order, userBilling: userBilling2 },
  });
});

exports.subscribeToPremium = catchAsync(async (req, res, next) => {
  if (!('paymentMethod' in req.body) || !('isMonthly' in req.body))
    return next(
      new AppError('Payment Mehtod and IsMonthly is a required field', 400)
    );
  req.vars = {};
  req.vars.userBilling = await Billing.findOne({
    user: req.decodedData.id,
  }).populate('packages');
  req.vars.checkPackage = true;
  // console.log(req.vars.userBilling);
  if (!req.vars.userBilling) {
    req.vars.checkPackage = false;
    req.vars.newDate = new Date();
    req.vars.newDate.setMonth(req.vars.newDate.getMonth() + 1);
    req.vars.userBilling = await Billing.create({
      user: req.decodedData.id,
      startDate: Date.now(),
      endDate: req.vars.newDate,
      cycle: req.body.isMonthly ? 'MONTHLY' : 'YEARLY',
    });
  }
  // console.log(req.vars.userBilling);
  if (!req.vars.checkPackage) {
    req.vars.package = await SubBilling.create({
      isBase: true,
      type: 'PREMIUM',
      entity: {
        entityId: req.decodedData.id,
        name: 'profile',
        period: 30,
      },
      price: parseInt(process.env.PREMIUM_PACKAGE_PRICE, 10),
      currency: 'Euro',
      billingId: req.vars.userBilling._id,
      isActive: false,
      isReccuring: true,
      expiresAt: req.vars.newDate,
    });
    req.vars.userBilling.packages.push(req.vars.package._id);
    await req.vars.userBilling.save();
  } else {
    const [package] = req.vars.userBilling.packages.filter(
      (package) => package.isBase === true
    );
    // console.log(package);
    if (!package) {
      req.vars.package = await SubBilling.create({
        isBase: true,
        type: 'PREMIUM',
        entity: {
          entityId: req.decodedData.id,
          name: 'profile',
          period: 30,
        },
        price: parseInt(process.env.PREMIUM_PACKAGE_PRICE, 10),
        currency: 'Euro',
        billingId: req.vars.userBilling._id,
        isActive: false,
        isReccuring: true,
        expiresAt: req.vars.newDate,
      });
      req.vars.userBilling.packages.push(req.vars.package._id);
      await req.vars.userBilling.save();
    } else {
      req.vars.package = package;
    }
  }
  // console.log(req.vars.package);
  if (req.vars.package.isActive) {
    return next(
      new AppError('You previous premium subscription has not expired', 401)
    );
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: process.env.PREMIUM_PACKAGE_PRICE * 100,
    currency: 'inr',
    payment_method: req.body.paymentMethod,
    customer: req.stripeUser.stripeCxId,
  });
  // console.log(paymentIntent);
  const confirmPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    {
      payment_method: req.body.paymentMethod,
    }
  );
  // console.log(confirmPaymentIntent);
  if (confirmPaymentIntent.status !== 'succeeded') {
    return next(
      new AppError('something went wrong, payment is not successfull', 503)
    );
  }
  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethod
  );
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  const package = await SubBilling.findByIdAndUpdate(
    req.vars.package._id,
    { expiresAt: currentDate, isActive: true },
    { new: true, runValidators: true }
  );
  // console.log(package);
  const order = await Order.create({
    type: 'PREMIUM',
    packages: [package._id],
    price: process.env.PREMIUM_PACKAGE_PRICE,
    user: req.decodedData.id,
    paid: true,
    paymentId: paymentIntent.id,
    paymentMethod: req.body.paymentMethod,
    last4: paymentMethod.card.last4,
  });
  eventEmitter.emit('sendEmail', 1, req.decodedData.email);
  const company = await Company.findOneAndUpdate(
    { comp_id: req.decodedData.id },
    { isPremium: true, isMonthlyPremium: req.body.isMonthly },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'You have successfully subscribed for Premium Plan',
    data: { order, company },
  });
  console.log('resp sent...............................');
});

exports.deleteBilling = catchAsync(async (req, res, next) => {
  const billing = await Billing.findOne({ user: req.decodedData.id });
  const orders = await Order.deleteMany({ user: req.decodedData.id });
  const deletedPackages = await Promise.all(
    billing.packages.map(async (id, i) => {
      await SubBilling.findByIdAndDelete(id);
      console.log(`package ${i} deleted`);
    })
  );
  await billing.delete();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'user billing related data deleted',
  });
});

exports.sponsorEntity = catchAsync(async (req, res, next) => {
  const { budget, period } = req.body;
  const today = new Date(Date.now());
  today.setDate(today.getDate() + period);
  // const userBilling = await Billing.findOne({ user: req.decodedData.id });
  let entity;
  if (req.body.name === 'service') {
    entity = await Service.findOne({
      _id: req.body.entity,
      companyId: req.decodedData.id,
    });
  } else if (req.body.name === 'product') {
    entity = await Product.findOne({
      _id: req.body.entity,
      companyId: req.decodedData.id,
    });
  } else if (req.body.name === 'event') {
    entity = await Event.findOne({
      _id: req.body.entity,
      companyId: req.decodedData.id,
    });
  } else if (req.body.name === 'job') {
    entity = await Job.findOne({
      _id: req.body.entity,
      comp_id: req.decodedData.id,
    });
  } else if (req.body.name === 'profile') {
    req.body.name = req.decodedData.id;
    entity = await Job.findOne({
      comp_id: req.decodedData.id,
    });
  }
  if (!entity)
    return next(
      new AppError('entity with this id not found in your account', 404)
    );
  if ('sponsorExpiresAt' in entity && entity.sponsorExpiresAt > Date.now()) {
    return next(new AppError('You entity is already set to sponsored', 400));
  }
  const package = await SubBilling.create({
    type: 'SPONSORED',
    isBase: false,
    entity: { entityId: entity._id, name: req.body.name, period },
    price: budget,
    currency: 'inr',
    isActive: false,
    isReccuring: false,
    expiresAt: today,
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: budget * 100,
    currency: 'inr',
    payment_method: req.body.paymentMethod,
    customer: req.stripeUser.stripeCxId,
  });
  const confirmPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    {
      payment_method: req.body.paymentMethod,
    }
  );
  if (confirmPaymentIntent.status !== 'succeeded') {
    return next(
      new AppError('something went wrong, payment is not successfull', 503)
    );
  }
  package.isActive = true;
  await package.save();
  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethod
  );
  const order = await Order.create({
    packages: [package._id],
    type: 'SPONSORED',
    price: budget,
    user: req.decodedData.id,
    paid: true,
    paymentId: paymentIntent.id,
    paymentMethod: req.body.paymentMethod,
    last4: paymentMethod.card.last4,
  });
  sponsorEvent.emit('sponsorEntity', entity, budget, period);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: { order, package },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const documentCount = await Order.countDocuments({
    user: req.decodedData.id,
  });
  const features = new APIFeatures(
    Order.find({ user: req.decodedData.id }),
    req.query
  )
    .filter()
    .sort()
    .fields()
    .paginate();
  let orders = await features.query.populate({
    path: 'packages',
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    totalPages:
      documentCount % limit === 0
        ? parseInt(documentCount / limit, 10)
        : parseInt(documentCount / limit, 10) + 1,
    results: orders.length,
    currentPage,
    data: orders,
  });
});

exports.getOneOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    user: req.decodedData.id,
    _id: req.params.orderId,
  }).populate('packages');
  // const user = await User.findById(order.user).populate('companyData');
  console.log(order);
  if (!order) return next(new AppError('Order with this ID not found', 404));
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: order,
  });
});

// exports.generatePdfInvoice = catchAsync(async (req, res, next) => {
//   const order = await Order.findById(req.query.orderId).populate([
//     {
//       path: 'packages',
//     },
//     { path: 'user', model: 'user', populate: { path: 'companyData' } }
//   ]);
//   console.log(order);
//   const html = pug.renderFile(`${assets}/invoice.pug`, {
//     order,
//   });
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.setContent(html, {
//     waitUntil: 'domcontentloaded',
//   });
//   const pdfBuffer = await page.pdf({
//     format: 'A4',
//   });
//   await browser.close();
//   res.setHeader('Content-Type', 'application/pdf');
//   res.send(pdfBuffer);
// });
