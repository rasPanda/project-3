/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

describe('Testing GET locations', () => {
  
  beforeEach(done => {
    setup(done)
  })

  afterEach(done => {
    tearDown(done)
  })

  it('should return a 200 response', done => {
    applicationCache.get('/api/location')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  

})