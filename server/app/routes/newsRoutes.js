const { Router } = require('express');
const {
  readImagesAndVideos,
  uploadImagesAndVideos,
} = require('../config/middlewares/formDataHandler');
const { isAuth, checkAuth } = require('../controller/user');
const newsController = require('../controller/newsController');

const router = Router();

router
  .route('/')
  .post(isAuth, newsController.premiumNewsValidator, newsController.createNews)
  .get(newsController.queryForAll, newsController.getAllNews);

router
  .route('/company')
  .get(isAuth, newsController.queryForCompany, newsController.getAllNews);

router
  .route('/:newsId')
  .get(checkAuth, newsController.getOneNews)
  .patch(isAuth, newsController.updateNews)
  .delete(isAuth, newsController.deleteNews);

router
  .route('/:newsId/toggle-status')
  .post(isAuth, newsController.toggleStatus);

router.route('/:newsId/likes').post(isAuth, newsController.addRemoveLike);

router.route('/:newsId/comments').post(isAuth, newsController.createComment);

router
  .route('/:newsId/comments/:commentId')
  .delete(isAuth, newsController.deleteComment);

module.exports = router;
