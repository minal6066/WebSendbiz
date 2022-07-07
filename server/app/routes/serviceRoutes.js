const express = require('express');
const { isAuth, restrictTo, checkAuth } = require('../controller/user');

const {
  createService,
  getAllServices,
  getOneService,
  deleteService,
  queryForAll,
  queryForCompany,
  updateService,
  toggleInActive,
  premiumServiceValidator,
  getServiceWithSponsored
} = require('../controller/serviceController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(isAuth, restrictTo(1), premiumServiceValidator, createService)
  .get(queryForAll, getServiceWithSponsored);

router
  .route('/company')
  .get(isAuth, restrictTo(1), queryForCompany, getAllServices);

router
  .route('/:serviceId')
  .get(checkAuth, queryForAll, getOneService)
  .patch(isAuth, updateService)
  .delete(isAuth, restrictTo(1), deleteService);

// router
//   .route('/:serviceId/media')
//   .post(isAuth, readImagesAndVideos, uploadImagesAndVideos, uploadServiceMedia);

router.route('/:serviceId/toggle-status').post(isAuth, toggleInActive);

// router.route('/:serviceId/media/:mediaId').delete(isAuth, deleteServiceMedia);
router
  .route('/:serviceId/company')
  .get(isAuth, restrictTo(1), queryForCompany, getOneService);

module.exports = router;
