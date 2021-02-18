import express from 'express'
import singleUserController from '../controllers/singleUserController.js'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import secureRoute from '../middleware/secureRoute.js'


const router = express.Router()


router.route('/register')
  .post(register.register)

router.route('/login')
  .post(login.login)

router.route('/user/:id')
  .get(singleUserController.getSingleUser)
  .put(secureRoute, singleUserController.updateSingleUser)
  .delete(secureRoute, singleUserController.deleteSingleUser)

export default router