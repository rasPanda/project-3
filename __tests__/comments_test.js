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
            comments: [],
            events: {}
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

  // it('should login, create a new event, post a comment and delete the comment', done => {
  //   api.post('/api/login')
  //     .send({
  //       email: 'joe@joe.com',
  //       password: 'joe'
  //     })

  //     .end((err, res) => {
  //       expect(res.status).to.eq(202)
  //       expect(res.body.token).to.be.a('string')
  //       const token = res.body.token

  //       api.post('/api/event')
  //         .set('Authorization', `Bearer ${token}`)
  //         .send({
  //           name: 'King test',
  //           location: {
  //             name: 'New location',
  //             image: 'https://image.com',
  //             location: {
  //               lat: 51.483857,
  //               long: -0.084035
  //             },
  //             address: '1 roadymcroadface',
  //             facilities: {
  //               numberOfTables: 3,
  //               description: 'Three tables, beautifully new'
  //             },
  //             comments: [],
  //             events: {}
  //           },
  //           image: 'https://images.unsplash.com/photo-1568711146297-b8674c3c11b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  //           time: 'Saturday 20th March at 3pm',
  //           details: 'meeting at the near pub,  then walking  to the spot ',
  //           attendees: [],
  //           results: [{}],
  //           comments: []
  //         })
  //         .end((err, res) => {
  //           console.log(res.status)
  //           console.log(res)
  //           expect(res.status).to.eq(201)
  //           expect(res.body).to.be.a('object')
  //           const eventId = res.body._id

  //           api.post(`/api/event/${eventId}`)
  //             .set('Authorization', `Bearer ${token}`)
  //             .send({
  //               text: 'Can\'t wait!'
  //             })
  //             .end((err, res) => {
  //               expect(res.status).to.eq(201)
  //               expect(res.body).to.be.a('object')
  //               const commentId = res.body.comments[0]._id

  //               api.delete(`/api/location/${eventId}/comment/${commentId}`)
  //                 .set('Authorization', `Bearer ${token}`)
  //                 .end((err, res) => {
  //                   expect(res.status).to.eq(202)
  //                   expect(res.body).to.be.a('object')
  //                   done()
  //                 })
  //             })
  //         })
  //     })
  // })

})
