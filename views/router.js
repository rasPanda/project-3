import express from 'express'
//! Import all our controllers here
//! For example
// import userControllers from '../controllers/userControllers.js'
// import locationControllers from '../controllers/locationControllers.js'
import secureRoute from '../middleware/secureRoute.js'
import userControllers from '../controllers/userControllers.js'
import singleEventControllers from '../controllers/singleEventControllers.js'

const router = express.Router()

//* Routes go here
//! For example
// router.route('/register')
//   .post(userController.register)


router.route('/users')
  .get(userControllers.getUsers)

router.route('/users/search/:name')
  .get(userControllers.searchUsers)

router.route('/events/:id')
  .get(singleEventControllers.getSingleEvent)
  .put(secureRoute, singleEventControllers.updateSingleEvent)
  .delete(secureRoute, singleEventControllers.deleteSingleEvent)



export default router