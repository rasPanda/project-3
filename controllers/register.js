import User from '../models/user.js'

async function register(req, res, next) {
  if (req.body.isAdmin) {
    delete req.body.isAdmin
  }
  const body = req.body
  try {
    const user = await User.create(body)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

export default {
  register
}
