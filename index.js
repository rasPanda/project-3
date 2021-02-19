import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import connectToDb from './lib/connectToDb.js'
console.log(connectToDb)
import errorHandler from './middleware/errorHandler.js'

//* This is our index file. It imports the necessary files and functions 
//* And connects our express server to our mongo database and creates the routes

const app = express()

async function startServer() {
  await connectToDb()
  console.log('Successfully connected to mongo')
  app.use(express.json())
  app.use(logger)
  app.use('/api', router)
  app.use(errorHandler)
  app.listen(8000, () => console.log('Up and Running on Port 8000'))
}

startServer()