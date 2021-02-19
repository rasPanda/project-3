import User from '../models/user.js'

async function getSingleUser(req, res, next) {
  const id = req.params.id
  // will id be 'id' or '_id' ?
  try {
    const singleUser = await User.findById(id).populate('comments.user')
    res.send(singleUser)
  } catch (err) {
    next(err)
  }
}

async function updateSingleUser(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser
  const body = req.body

  try {
    const userToUpdate = await User.findById(id)
    // check if user exists
    if (!userToUpdate) {
      return res.send({ message: 'No user found with that ID' })
    }

    // check if the user is the same as the user being edited
    if (!currentUser.isAdmin && !userToUpdate._id.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthroized' })
    }

    userToUpdate.set(body)
    userToUpdate.save()

    res.send(userToUpdate)
  } catch (err) {
    next(err)
  }
}

async function deleteSingleUser(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser

  try {
    const userToRemove = await User.findById(id)
    // ------------------------ ? check _id here! ? -------------------------------------------- //
    if (!currentUser.isAdmin && !currentUser._id.equals(userToRemove._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await userToRemove.deleteOne()
    res.send(userToRemove)
  } catch (err) {
    next(err)
  }
}

export default {
  getSingleUser,
  updateSingleUser,
  deleteSingleUser
}