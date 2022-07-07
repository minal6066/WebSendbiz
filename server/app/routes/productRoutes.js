const express = require('express');
const { isAuth, restrictTo, checkAuth } = require('../controller/user');
const productController = require('../controller/productController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    isAuth,
    restrictTo(1),
    productController.premiumProductValidator,
    productController.createProduct
  )
  .get(productController.getProductWithSponsored);

router.route('/company').get(isAuth, productController.getAllProductsByCompany);

router
  .route('/:productId')
  .get(checkAuth, productController.getOneProduct)
  .patch(isAuth, productController.updateProduct)
  .delete(isAuth, productController.deleteProduct);

router
  .route('/:productId/toggle-status')
  .post(isAuth, productController.toggleStatus);

// router
//   .route('/:productId/media')
//   .post(
//     isAuth,
//     readImagesAndVideos,
//     uploadImagesAndVideos,
//     productController.uploadProductMedia
//   );

// router
//   .route('/:productId/media/:mediaId')
//   .delete(isAuth, productController.deleteProductMedia);

module.exports = router;
