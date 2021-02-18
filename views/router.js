import express from 'express'
import location from '../controllers/locationController.js'
//! Import all our controllers here
//! For example
// import userControllers from '../controllers/userControllers.js'
// import locationControllers from '../controllers/locationControllers.js'
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
  .delegates(secureRoute, location.deleteLocation)

router.route('/location/:name')
  .get(location.getLocationByName)



export default router