import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function login(req, res, next) {
  const password = req.body.password
  console.log('password', password)
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log('Logged in user: ')
    console.log(user)

    if (!user || !user.validatePassword(password)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    console.log('user has validated')

    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '12h' }
    )

    res.status(202).send({ token, message: 'Login successful' })
  } catch (err) {
    next(err)
  }
}

export default {
  login
}
