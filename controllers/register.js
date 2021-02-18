import User from '../models/user.js'

async function register() {
  if (req.body.isAdmin) {
    delete req.body.isAdmin
  }
  const body = req.body
  try {
    const user = await User.create(body)
    resizeBy.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

export default {
  register
}
