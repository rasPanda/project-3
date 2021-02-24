/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

// * Mocha ☕️

describe('Testing GET Event', () => {
  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  it('should return a 200 response', done => {
    api.get('/api/event')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })


  it('should return an array of 6 Event', done => {
    api.get('/api/event')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.eq(6)
        done()
      })
  })

  it('Should be able to register user, then login as new user, then create and  and delete event ', done => {
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



            api.post('/api/event')
              .set('Authorization', `Bearer ${res.body.token}`)
              .send(
                {
                  name: 'Test',
                  location: {
                    lat: 51.483857,
                    long: -0.084035
                  },
                  image: 'https://images.unsplash.com/photo-1568711146297-b8674c3c11b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                  time: 'Saturday 20th March at 3pm',
                  details: 'meeting at the near pub,  then walking  to the spot ',
                  attendees: [],
                  comments: []
                }
              )
              .end((err, res) => {
                expect(res.body).to.be.a('object')
                // done()

                api.delete(`/api/event/${res.body._id}`)
                  .set('Bearer', `${res.body.token}`)
                  .end((err, res) => {
                    expect(res.body).to.be.a('object')
                    done()
                  })
              })
          })
      })
  })

})