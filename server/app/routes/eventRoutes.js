const Router = require('express').Router;
const { isAuth, checkAuth } = require('../controller/user');
const eventController = require('../controller/eventController');

const router = Router();

router
  .route('/')
  .get(eventController.queryForAll, eventController.getAllEvents)
  .post(
    isAuth,
    eventController.premiumEventValidator,
    eventController.createEvent
  );

router
  .route('/company')
  .get(isAuth, eventController.queryForCompany, eventController.getAllEvents);

router
  .route('/:eventId')
  .get(checkAuth, eventController.getOneEvent)
  .patch(isAuth, eventController.updateEvent)
  .delete(isAuth, eventController.deleteEvent);

router
  .route('/:eventId/toggle-status')
  .post(isAuth, eventController.toggleStatus);

router.route('/:eventId/likes').post(isAuth, eventController.addRemoveLikes);
router.route('/:eventId/comment').post(isAuth, eventController.createComment);
router
  .route('/:eventId/comment/:commentId')
  .delete(isAuth, eventController.deleteComment);

module.exports = router;
