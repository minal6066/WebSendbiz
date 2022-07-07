const { Router } = require('express');
const { getAllJobTitles } = require('../controller/jobTitleController');
const { isAuth } = require('../controller/user');

const router = Router();

router.route('/').get(isAuth, getAllJobTitles);

module.exports = router;
