const express = require('express');
const Job = require('../models/job');
const favJobController = require('../controller/favJobsController');
const userController = require('../controller/user');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.use(userController.isAuth);

router.route('/').post(catchAsync(async(req, res, next) => {
  if(req.decodedData.user_type === 2) req.body.company = req.decodedData.id;
  if(req.decodedData.user_type === 1) req.body.candidate = req.decodedData.id;
  const job = await Job.findById(req.body.job);
  req.body.jobPostedBy = job.comp_id;
  next();
}), favJobController.createFavJobs).get(favJobController.getAllFavJobs);

router.route('/:favJobId').get(favJobController.getOneFavJob).patch(favJobController.deleteFavJob);

module.exports = router;