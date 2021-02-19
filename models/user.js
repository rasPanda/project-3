import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import commentSchema from './comment.js'


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  isAdmin: { type: Boolean },
  //nested schema 
  comments: [commentSchema],
  image: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, required: true }

})

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'This must match your password')
    }
    next()
  })
userSchema.plugin(uniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

export default mongoose.model('User', userSchema)
