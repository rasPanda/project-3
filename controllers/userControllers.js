import User from '../models/user.js'


//* A controller to get all users

async function getUsers (_req, res, next) {
  try {
    const userList = await User.find()
      .populate('user')
      .populate('comments.user')
    res.status(200).send(userList)
  } catch (err) {
    next(err)
  }
}

async function searchUsers (req, res, next) {
  try {
    const userList = await User.find( { username: { $regex: req.params.name, $options: 'i' } } )
      .populate('user')
      .populate('comments.user')
    res.status(200).send(userList)
  } catch (err) {
    next(err)
  }
}

export default {
  getUsers,
  searchUsers
}