import express from 'express'
import location from '../controllers/locationController.js'
import locationComment from '../controllers/locationCommentControllers.js'
import userComment from '../controllers/userCommentControllers.js'
import eventComment from '../controllers/eventCommentControllers.js'
import events from '../controllers/eventControllers.js'
import singleUserController from '../controllers/singleUserController.js'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import secureRoute from '../middleware/secureRoute.js'
import userControllers from '../controllers/userControllers.js'
import singleEventControllers from '../controllers/singleEventControllers.js'
import attendee from '../controllers/attendeeControllers.js'

const router = express.Router()

router.route('/location/:id/comment/:commentId')
  .put(secureRoute, locationComment.updateLocationComment)
  .delete(secureRoute, locationComment.deleteLocationComment)

router.route('/user/:id/comment/:commentId')
  .put(secureRoute, userComment.updateUserComment)
  .delete(secureRoute, userComment.deleteUserComment)

router.route('/event/:id/comment/:commentId')
  .put(secureRoute, eventComment.updateEventComment)
  .delete(secureRoute, eventComment.deleteEventComment)

router.route('/location')
  .get(location.getAllLocation)
  .post(secureRoute, location.makeLocation)

router.route('/location/:id')
  .get(location.getSingleLocation)
  .put(secureRoute, location.updateLocation)
  .delete(secureRoute, location.deleteLocation)
  .post(secureRoute, locationComment.createLocationComment)

router.route('/location/search/:name')
  .get(location.getLocationByName)

router.route('/event')
  .get(events.getEvents)
  .post(secureRoute, events.postEvent)

router.route('/register')
  .post(register.register)

router.route('/login')
  .post(login.login)

router.route('/user')
  .get(userControllers.getUsers)

router.route('/user/:id')
  .get(singleUserController.getSingleUser)
  .put(secureRoute, singleUserController.updateSingleUser)
  .delete(secureRoute, singleUserController.deleteSingleUser)
  .post(secureRoute, userComment.createUserComment)

router.route('/user/search/:name')
  .get(userControllers.searchUsers)

router.route('/event/:id/attendee')
  .post(secureRoute, attendee.addAttendee)
  .delete(secureRoute, attendee.deleteAttendee)

router.route('/event/:id')
  .get(singleEventControllers.getSingleEvent)
  .put(secureRoute, singleEventControllers.updateSingleEvent)
  .delete(secureRoute, singleEventControllers.deleteSingleEvent)
  .post(secureRoute, eventComment.createEventComment)



export default router