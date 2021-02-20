/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

xdescribe('Testing locations', () => {

  beforeEach(done => {
    setup(done)
  })

  afterEach(done => {
    tearDown(done)
  })

  it('should return a 200 response', done => {
    api.get('/api/location')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array of locations', done => {
    api.get('/api/location')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.eq(5)
        done()
      })
  })

  it('should login, create and delete a new location', done => {
    api.post('/api/login')
      .send({
        email: 'joe@joe.com',
        password: 'joe'
      })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        console.log(res.body.token)
        api.post('/api/location')
          .set('Authorization', `Bearer ${res.body.token}`)
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
            api.delete(`/api/location/${res.body._id}`)
              .set('Authorization', `Bearer ${res.body.token}`)
              .end((err, res) => {
                console.log('hello world')
                console.log(err, res)
                expect(res.body).to.be.a('object')
                done()
              })
          })
      })
  })
})
