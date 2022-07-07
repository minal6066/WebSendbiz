const { Router } = require('express');
const { isAuth } = require('../controller/user');
const entityCategoryController = require('../controller/entityCategoryController');

const router = Router();

router
  .route('/:type')
  .get(isAuth, entityCategoryController.getAllCategoriesByType);

module.exports = router;
