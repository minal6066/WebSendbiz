const Stripe = require('stripe');
const Billing = require('../models/billingModel');
const Order = require('../models/orderModel');
const SubBilling = require('../models/subBillingModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Company = require('../models/company');
const Service = require('../models/service');
const AppError = require('../utils/appError');
const StripeCx = require('../models/customerStripeModel');

const stripe = Stripe(process.env.SECRET_KEY);

exports.retriveStripeData = catchAsync(async (req, res, next) => {
  let stripeCx;
  stripeCx = await StripeCx.findOne({ user: req.decodedData.id });
  if (!stripeCx) {
    const customer = await stripe.customers.create({
      name: req.decodedData.email.split('@')[0],
      email: req.decodedData.email,
      metadata: {
        id: req.decodedData.id,
      },
    });
    stripeCx = await StripeCx.create({
      stripeCxId: customer.id,
      user: req.decodedData.id,
    });
  }
  req.stripeUser = stripeCx;
  next();
});

exports.createStripeCustomer = catchAsync(async (req, res, next) => {
  const customer = await stripe.customers.create({
    name: req.body.name,
    email: req.body.email,
    metadata: {
      id: 1,
    },
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    data: customer,
  });
});

exports.updateStripeCustomer = catchAsync(async (req, res, next) => {
  let object = {};
  Object.keys(req.body).forEach((key) => {
    if (key === 'customer') return;
    object[key] = req.body[key];
  });
  console.log(object);
  const customer = await stripe.customers.update(req.body.customer, object);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: customer,
  });
});

exports.getPaymentMethodsOfCustomer = catchAsync(async (req, res, next) => {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: req.stripeUser.stripeCxId,
    type: 'card',
    limit: 100,
  });
  let respData = [];
  paymentMethods.data.forEach((paymentMethod) => {
    req.stripeUser.paymentMethods.forEach((val) => {
      if (val.card !== paymentMethod.id) return;
      respData.push({
        id: paymentMethod.id,
        card: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
        defaultCard: val.defaultCard,
      });
    });
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    results: respData.length,
    data: respData,
  });
});

exports.attachPaymentMethod = catchAsync(async (req, res, next) => {
  const paymentMethod = await stripe.paymentMethods.attach(
    req.body.payment_method,
    { customer: req.body.customer }
  );
  console.log(paymentMethod);
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'payment method added successfully',
  });
});

exports.createSubscription = catchAsync(async (req, res, next) => {
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customer,
    items: [{ price: req.body.price }],
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'subscription created successfully',
    data: subscription,
  });
});

exports.createPaymentMethod = catchAsync(async (req, res, next) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: req.body.card,
      exp_month: req.body.expMonth,
      exp_year: req.body.expYear,
      cvc: req.body.cvc,
    },
  });
  const attachMethod = await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: req.stripeUser.stripeCxId,
  });
  let defaultCard = false;
  if (req.stripeUser.paymentMethods.length === 0) defaultCard = true;
  const stripeCx = await StripeCx.findByIdAndUpdate(
    req.stripeUser._id,
    {
      $push: { paymentMethods: [{ card: attachMethod.id, defaultCard }] },
    },
    { new: true, runValidators: true }
  );
  console.log(stripeCx);
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'payment method saved',
    data: stripeCx,
  });
});

exports.deletePaymentMethod = catchAsync(async (req, res, next) => {
  await stripe.paymentMethods.detach(req.params.paymentMethod);
  const stripeCx = await StripeCx.findById(req.stripeUser._id);
  const deletedCardIndex = stripeCx.paymentMethods.findIndex(
    (val) => val.card === req.params.paymentMethod
  );
  if (deletedCardIndex !== -1) {
    stripeCx.paymentMethods.splice(deletedCardIndex, 1);
    await stripeCx.save();
  }
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: stripeCx,
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  const invoice = await stripe.invoices.create({
    customer: 'cus_J2FgXGmdonqzka',
    subscription: 'sub_J2FjtyzGXbplIM',
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    data: invoice,
  });
});

exports.createPaymentIntent = catchAsync(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    data: paymentIntent,
  });
});

exports.catchStripeEvent = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  switch (req.body.type) {
    case 'payment_intent.succeeded':
      const order = await Order.findOne({
        paymentId: req.body.data.object.id,
      }).populate('packages');
      if (order.type === 'Premium') {
        const premiumPackageIndex = order.packages.findIndex(
          (package) => package.isBase === true
        );
        let package;
        if (premiumPackageIndex !== -1) {
          package = await SubBilling.findById(
            order.packages[premiumPackageIndex]._id
          );
          console.log(package);
          package.isActive = true;
          await package.save();
          const userBilling = await Billing.findById(package.billingId);
          userBilling.startDate = new Date(Date.now());
          const currentDate = new Date(Date.now());
          currentDate.setMonth(currentDate.getMonth() + 1);
          userBilling.endDate = currentDate;
          await userBilling.save();
          console.log('billing updated');
        }
        switch (package.type) {
          case 'Premium':
            const user = await User.findById(package.entity.entityId);
            console.log(user);
            if (user.user_type === 2) {
              const company = await Company.findOne({ comp_id: user._id });
              company.isPremium = true;
              await company.save();
            }
        }
        order.paid = true;
        await order.save();
        console.log(order);
        console.log('order saved successfully');
      }
      if (order.type === 'Sponsored') {
        await Promise.all(
          order.packages.map(async (package) => {
            const subBilling = await SubBilling.findOneAndUpdate(
              { _id: package._id },
              { isActive: true },
              { new: true, runValidators: true }
            );
            console.log(subBilling);
            let entity;
            if (package.entity.name === 'service') {
              entity = await Service.findById(package.entity.entityId);
              entity.totalCount = package.price * 3;
              entity.isSponsored = true;
              entity.perDayCount = parseInt(
                (package.price * 3) / package.entity.period,
                10
              );
              entity.sponsorExpiresAt = package.expiresAt;
              await entity.save();
            }
          })
        );
        order.paid = true;
        await order.save();
        console.log(order);
      }
      break;
  }
  res.status(200).send('ok');
});
