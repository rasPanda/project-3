import User from '../models/user.js'

function unauthorised(res) {
  return res.status(401).send({ message: 'Unauthorised' })
}

function notFound(res) {
  return res.status(404).send({ message: 'User not found' })
}

async function createUserComment(req, res, next) {
  const commentData = req.body
  commentData.user = req.currentUser
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (!user) {
      notFound(res)
    }
    user.comments.push(commentData)
    const updatedUser = await user.save()
    res.status(201).send(updatedUser)
  } catch (err) {
    next(err)
  }
}

async function updateUserComment(req, res, next) {
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId, id } = req.params
  try {
    const user = await User.findById(id).populate('user').populate('comments.user')
    if (!user) {
      notFound(res)
    }
    const comment = user.comments.id(commentId)
    if (!currentUser.isAdmin && !comment.user.equals(currentUser._id)) {
      unauthorised(res)
    }
    comment.set(commentData)
    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch (err) {
    next(err)
  }
}

async function deleteUserComment(req, res, next) {
  const currentUser = req.currentUser
  const { commentId, id } = req.params
  try {
    const user = await User.findById(id).populate('user').populate('comments.user')
    if (!user) {
      notFound(res)
    }
    const comment = user.comments.id(commentId)
    if (!currentUser.isAdmin && !comment.user.equals(currentUser._id)) {
      unauthorised(res)
    }
    await comment.remove()
    const updatedUser = await user.save()
    res.status(202).send(updatedUser)
  } catch (err) {
    next(err)
  }
}

export default {
  createUserComment,
  updateUserComment,
  deleteUserComment
}