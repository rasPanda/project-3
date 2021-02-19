import dotenv from 'dotenv'
dotenv.config()

const environment = process.env.NODE_ENV || 'development'
export const dbURI = environment === 'production'
  ? process.env.MONGODB_URI
<<<<<<< HEAD
  : `mongodb://localhost/pingpongdb-${environment}`
=======
  : `monogdb://localhost/pingpongdb-${environment}`
>>>>>>> development

// export const dbURI = 'mongodb://localhost/pingpongdb'
export const port = 8000
// export const secret = 'sklghkdflasghkahhl;adfkhl23589sgjk34khk3b5kjh34kbt34jkbhj345jhg34j5hg3hjvbfthj345g3hjbf34hjghj3bfhj3gfhj3gh;rklh'
export const secret = process.env.SECRET

