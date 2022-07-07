const express = require('express');
const { isAuth } = require('../controller/user');
// const User = require('../models/user');
// const Service = require('../models/service');
// const Product = require('../models/productModel');
// const interestedList = require('../models/interestList');

//CONTROLLERS
const interestedController = require('../controller/interestedListController');

const router = express.Router();

router
  .route('/:type')
  .post(isAuth, interestedController.addRemoveInterested)
  .get(isAuth, interestedController.getAllIntList);

router
  .route('/one/:interestId')
  .delete(isAuth, interestedController.deleteIntItem);

module.exports = router;
