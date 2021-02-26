import User from '../models/user.js'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import nodeMailer from 'nodemailer'
import { API_KEY } from '../config/environment.js'

const transporter = nodeMailer.createTransport(sendgridTransport({
  auth: {
    api_key: API_KEY
  }
}))

async function register(req, res, next) {
  if (req.body.isAdmin) {
    delete req.body.isAdmin
  }
  const body = req.body
  try {
    const user = await User.create(body)
    res.send(
      transporter.sendMail({
        to: body.email,
        from: 'parkpong63@gmail.com',
        subject: 'Registeration successful',
        html: `<h2>Dear ${body.username},</h2> <br><h3> thank your for your registration with us.</h3>
        <img width="100vw" src="https://images.unsplash.com/photo-1611251126118-b1d4f99600a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"/>
        `
      }))
    
  } catch (err) {
    next(err)
  
  }
}

export default {
  register
}
