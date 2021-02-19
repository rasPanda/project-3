import Location from '../models/location.js'
//populate comment


//list of all Locations
async function getAllLocation(_req, res, next) {
  try {
    const locationList = await Location.find().populate('comments.user').populate('user')
    res.send(locationList)
  } catch (err) {
    next(err)
  }
}


// create location
async function makeLocation(req, res, next) {
  const body = req.body
  body.user = req.currentUser
  try {
    const newLocation = await Location.create(body)
    res.status(201).send(newLocation)
  } catch (err) {
    next(err)
  }
}

//find one location by id
async function getSingleLocation(req, res, next) {
  const locationId = req.params.id
  try {
    const location = await Location.findById(locationId).populate('comments.user').populate('user')
    res.send(location)
  } catch (err) {
    next(err)
  }
}
// finding location by name
async function getLocationByName(req, res, next) {
  try {
    const location = await Location.find( { name: { $regex: req.params.name, $options: 'i' } } ).populate('comments.user').populate('user')
    res.send(location)
  } catch (err) {
    next(err)
  }
}

//udpate single location
async function updateLocation(req, res, next) {
  const locationId = req.params.id
  const body = req.body
  const currentUser = req.currentUser
  try {
    const locationToUpdate = await Location.findById(locationId)
    if (!locationToUpdate.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    locationToUpdate.set(body)
    locationToUpdate.save()
  } catch (err) {
    next(err)
  }
}

//delete location 
async function deleteLocation(req, res, next) {
  const locationId = req.params.id
  const currentUser = req.currentUser
  try {
    const locationToDelete = await Location.findById(locationId)
    if (!locationToDelete.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    await locationToDelete.deleteOne()
    res.send(locationToDelete)
  } catch (err) {
    next(err)
  }
}


export default {
  getAllLocation,
  makeLocation,
  getSingleLocation,
  updateLocation,
  deleteLocation,
  getLocationByName
}