import { expect } from chai
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'

dscribe('Testing REGISTER', () => {
  beforeEach(done => {
    setup(done)
  })
  afterEach(done => {
    tearDown(done)
  })

  // ------------------------ REGISTER -------------------------- //
  it('Should be able to register a new user', done => {
    applicationCache.post('/api/register')
      .send({
        username: 'peter',
        email: 'peter@peter.com',
        password: 'peter'
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('peter')
        done()
      })
  })

  it('Should be able to register user, then login a new user', done => {
    applicationCache.post('/api/register')
    .send({
      username: 'simon',
      email: 'simon@simon.com',
      password: 'simon'
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
            done()
          })
    })
  })

  // it('Should be able to delete a user', done => {
  //   api.delete('/api/delete')
  // })

})