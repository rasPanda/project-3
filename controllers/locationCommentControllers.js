import Location from '../models/location.js'

function unauthorised(res) {
  return res.status(401).send({ message: 'Unauthorised' })
}

function notFound(res) {
  return res.status(404).send({ message: 'Location not found' })
}

async function createLocationComment(req, res, next) {
  const commentData = req.body
  commentData.user = req.currentUser
  const id = req.params.id
  try {
    const location = await Location.findById(id)
    if (!location) {
      notFound(res)
    }
    location.comments.push(commentData)
    const updatedLocation = await location.save()
    res.status(201).send(updatedLocation)
  } catch (err) {
    next(err)
  }
}

async function updateLocationComment(req, res, next) {
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId, id } = req.params
  try {
    const location = await Location.findById(id).populate('user').populate('comments.user')
    if (!location) {
      notFound(res)
    }
    const comment = location.comments.id(commentId)
    if (!currentUser.isAdmin && !comment.user.equals(currentUser._id)) {
      unauthorised(res)
    }
    comment.set(commentData)
    const updatedLocation = await location.save()
    res.status(200).send(updatedLocation)
  } catch (err) {
    next(err)
  }
}

async function deleteLocationComment(req, res, next) {
  const currentUser = req.currentUser
  const { commentId, id } = req.params
  try {
    const location = await Location.findById(id).populate('user').populate('comments.user')
    if (!location) {
      notFound(res)
    }
    const comment = location.comments.id(commentId)
    if (!currentUser.isAdmin && !comment.user.equals(currentUser._id)) {
      unauthorised(res)
    }
    await comment.remove()
    const updatedLocation = await location.save()
    res.status(202).send(updatedLocation)
  } catch (err) {
    next(err)
  }
}

export default {
  createLocationComment,
  updateLocationComment,
  deleteLocationComment
}