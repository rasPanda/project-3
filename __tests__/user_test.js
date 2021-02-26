/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

describe('Testing USER', () => {

  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  it('Should be able to register a new user', done => {
    api.post('/api/register')
      .send({
        username: 'peter',
        email: 'peter@peter.com',
        password: 'peter',
        passwordConfirmation: 'peter',
        image: 'petersFace.com',
        bio: 'Lorem ipsum, caecalius est in horto',
        location: 'A city somewhere nowhere'
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('peter')
        done()
      })
  })

  it('Should be able to register user, then login a new user and delete that user', done => {
    api.post('/api/register')
      .send({
        username: 'simon',
        email: 'simon@simon.com',
        password: 'simon',
        passwordConfirmation: 'simon',
        image: 'simonsFace.com',
        bio: 'Lorem ipsum, caecalius est in horto',
        location: 'A city somewhere nowhere'
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('simon')

        api.post('/api/login')
          .send({
            email: 'simon@simon.com',
            password: 'simon'
          })
          .end((err, res) => {
            expect(res.status).to.eq(202)
            expect(res.body.token).to.be.a('string')

            api.delete(`/api/user/${res.body._id}`)
              .set('Authorization', `Bearer ${res.body.token}`)
              .end((err, res) => {
                expect(res.body).to.be.a('Object')
                done()
              })
          })
      })
  })

  it('Should be able to register user, then login a new user and UPDATE that user', done => {
    api.post('/api/register')
      .send({
        username: 'simon',
        email: 'simon@simon.com',
        password: 'simon',
        passwordConfirmation: 'simon',
        image: 'simonsFace.com',
        bio: 'Lorem ipsum, caecalius est in horto',
        location: 'A city somewhere nowhere'
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('simon')

        api.post('/api/login')
          .send({
            email: 'simon@simon.com',
            password: 'simon'
          })
          .end((err, res) => {
            expect(res.status).to.eq(202)
            expect(res.body.token).to.be.a('string')

            api.put(`/api/user/${res.body._id}`)
              .set('Authorization', `Bearer ${res.body.token}`)
              .send({
                username: 'james'
              })
              .end((err, res) => {
                expect(res.body).to.be.a('Object')
                done()
              })
          })
      })
  })
})
