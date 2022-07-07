const { Router } = require('express');
const { isAuth } = require('../config/middlewares/authorization');
const {
  getAllOrders,
  getOneOrder,
} = require('../controller/billingController');

const router = Router();

router.get('/', isAuth, getAllOrders);
router.get('/:orderId', isAuth, getOneOrder);

module.exports = router;
