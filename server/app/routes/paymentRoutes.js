const { Router } = require('express');
const { isAuth, allowedTo } = require('../controller/user');
const stripeController = require('../controller/stripeController');
const billingController = require('../controller/billingController');

const router = Router();

router
  .route('/add-billing')
  .post(
    isAuth,
    stripeController.retriveStripeData,
    billingController.subscribeToPremium
  );

// router.route('/get-invoice').get(billingController.generatePdfInvoice);

router.route('/delete-billing').post(isAuth, billingController.deleteBilling);
router
  .route('/sponsor-entity')
  .post(
    isAuth,
    stripeController.retriveStripeData,
    billingController.sponsorEntity
  );

router
  .route('/customers')
  .post(stripeController.createStripeCustomer)
  .patch(stripeController.updateStripeCustomer);
  
router
  .route('/customers/payment-methods')
  .post(
    isAuth,
    stripeController.retriveStripeData,
    stripeController.createPaymentMethod
  )
  .get(
    isAuth,
    stripeController.retriveStripeData,
    stripeController.getPaymentMethodsOfCustomer
  );

router
  .route('/customers/payment-methods/:paymentMethod')
  .delete(
    isAuth,
    stripeController.retriveStripeData,
    stripeController.deletePaymentMethod
  );

router.post('/create-subscription', stripeController.createSubscription);
router.post('/create-payment-method', stripeController.createPaymentMethod);
router.post('/create-invoice', stripeController.createInvoice);
router.post('/create-payment-intent', stripeController.createPaymentIntent);
router.post('/catch-event', stripeController.catchStripeEvent);

module.exports = router;
