/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

describe('Testing comments', () => {

  beforeEach(done => {
    setup(done)
  })

  afterEach(done => {
    tearDown(done)
  })

  it('should login, search for user Carl, post a comment, and delete the comment', done => {
    api.post('/api/login')
      .send({
        email: 'joe@joe.com',
        password: 'joe'
      })

      .end((err, res) => {
        expect(res.status).to.eq(202)
        expect(res.body.token).to.be.a('string')
        const token = res.body.token

        api.get('/api/user/search/carl')
          .end((err, res) => {
            expect(res.status).to.eq(200)
            expect(res.body[0].username).to.eq('carl')
            const carlId = res.body[0]._id

            api.post(`/api/user/${carlId}`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                text: 'Hi Carl!'
              })
              .end((err, res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.be.a('object')
                const commentId = res.body.comments[0]._id

                api.delete(`/api/user/${carlId}/comment/${commentId}`)
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res.status).to.eq(202)
                    expect(res.body).to.be.a('object')
                    done()
                  })
              })
          })
      })
  })


  it('should login, create a new location, post a comment and delete the comment', done => {
    api.post('/api/login')
      .send({
        email: 'joe@joe.com',
        password: 'joe'
      })

      .end((err, res) => {
        expect(res.status).to.eq(202)
        expect(res.body.token).to.be.a('string')
        const token = res.body.token

        api.post('/api/location')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'New location',
            image: 'https://image.com',
            location: {
              lat: 51.483857,
              long: -0.084035
            },
            address: '1 roadymcroadface',
            facilities: {
              numberOfTables: 3,
              description: 'Three tables, beautifully new'
            },
            comments: []

          })
          .end((err, res) => {
            expect(res.status).to.eq(201)
            expect(res.body).to.be.a('object')
            const locationId = res.body._id

            api.post(`/api/location/${locationId}`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                text: 'Great new location!'
              })
              .end((err, res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.be.a('object')
                const commentId = res.body.comments[0]._id

                api.delete(`/api/location/${locationId}/comment/${commentId}`)
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res.status).to.eq(202)
                    expect(res.body).to.be.a('object')
                    done()
                  })
              })
          })
      })
  })

  it('should login, find an event, post a comment and delete the comment', done => {
    api.post('/api/login')
      .send({
        email: 'joe@joe.com',
        password: 'joe'
      })

      .end((err, res) => {
        expect(res.status).to.eq(202)
        expect(res.body.token).to.be.a('string')
        const token = res.body.token

        api.get('/api/event')
          .end((err, res) => {
            expect(res.status).to.eq(200)
            const eventId = res.body[0]._id

            api.post(`/api/event/${eventId}`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                text: 'Can\'t wait!'
              })
              .end((err, res) => {
                expect(res.status).to.eq(201)
                expect(res.body).to.be.a('object')
                const commentId = res.body.comments[0]._id

                api.delete(`/api/event/${eventId}/comment/${commentId}`)
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                    expect(res.status).to.eq(202)
                    expect(res.body).to.be.a('object')
                    done()
                  })
              })
          })
      })
  })

})
