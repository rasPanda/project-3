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


  it('should return an array of 1 Event', done => {
    api.post('/api/login')
      .send({
        email: 'joe@joe.com',
        password: 'joe'
      })
      .end((err, res) => {
        expect(res.status).to.eq(202)


        api.post('/api/event')
          .set('Authorization', `Bearer ${res.body.token}`)
          .send(
            {
              name: 'King Pong',
              location: {
                lat: 51.483857,
                long: -0.084035
              },
              user: {
                username: 'peter',
                email: 'peter@peter.com',
                password: 'peter',
                passwordConfirmation: 'peter',
                image: 'petersFace.com',
                bio: 'Lorem ipsum, caecalius est in horto',
                location: 'A city somewhere nowhere'
              }
              ,
              image: 'https://images.unsplash.com/photo-1568711146297-b8674c3c11b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              time: 'Saturday 20th March at 3pm',
              details: 'meeting at the near pub,  then walking  to the spot ',
              attendees: [],
              results: [{}],
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

