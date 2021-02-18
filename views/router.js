import express from 'express'
import location from '../controllers/locationController.js'
//! Import all our controllers here
//! For example
// import userControllers from '../controllers/userControllers.js'
// import locationControllers from '../controllers/locationControllers.js'
import locationComment from '../controllers/locationCommentControllers.js'
import userComment from '../controllers/locationCommentControllers.js'
import eventComment from '../controllers/locationCommentControllers.js'
import events from '../controllers/eventControllers.js'

import singleUserController from '../controllers/singleUserController.js'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import secureRoute from '../middleware/secureRoute.js'


const router = express.Router()

//* Routes go here
//! For example
// router.route('/register')
//   .post(userController.register)
router.route('/location')
  .get(location.getAllLocation)
  .post(location.makeLocation)

router.route('/location/:id')
  .get(location.getSingleLocation)
  .put(secureRoute, location.updateLocation)
  .delete(secureRoute, location.deleteLocation)

router.route('/location/:name')
  .get(location.getLocationByName)

router.route('/events')
  .get(events.getEvents)
  .post(secureRoute, events.postEvent)

router.route('/location/:locationId')
  .post(secureRoute, locationComment.createLocationComment)

router.route('/user/:userId')
  .post(secureRoute, userComment.createUserComment)

router.route('/event/:eventId')
  .post(secureRoute, eventComment.createEventComment)

router.route('/location/:locationId/comment/:commentId')
  .put(secureRoute, locationComment.updateLocationComment)
  .delete(secureRoute, locationComment.deleteLocationComment)

router.route('/user/:userId/comment/:commentId')
  .put(secureRoute, userComment.updateUserComment)
  .delete(secureRoute, userComment.deleteUserComment)

router.route('/event/:eventId/comment/:commentId')
  .put(secureRoute, eventComment.updateEventComment)
  .delete(secureRoute, userComment.deleteUserComment)
router.route('/register')
  .post(register.register)

router.route('/login')
  .post(login.login)

router.route('/user/:id')
  .get(singleUserController.getSingleUser)
  .put(secureRoute, singleUserController.updateSingleUser)
  .delete(secureRoute, singleUserController.deleteSingleUser)

export default router