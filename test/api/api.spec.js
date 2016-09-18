import chai, {expect, request} from 'chai'
import chaihttp from 'chai-http'
import app from '../../api/api'

chai.use(chaihttp)

describe('api', function () {
  it('404 on /', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.have.status(404)
        return done()
      })
  })

  it('404 on /foobar', function (done) {
    request(app)
      .get('/foobar')
      .end(function (err, res) {
        expect(err).to.have.status(404)
        return done()
      })
  })
  it('404 on /api', function (done) {
    request(app)
      .get('/api')
      .end(function (err, res) {
        expect(err).to.have.status(404)
        return done()
      })
  })
  it('404 on /tweet', function (done) {
    request(app)
      .get('/tweet')
      .end(function (err, res) {
        expect(err).to.have.status(404)
        return done()
      })
  })

  it('405 on POST /tweets', function (done) {
    request(app)
      .post('/tweets')
      .end(function (err, res) {
        expect(err).to.have.status(405)
        return done()
      })
  })

  it('405 on PUT /tweets', function (done) {
    request(app)
      .put('/tweets')
      .end(function (err, res) {
        expect(err).to.have.status(405)
        return done()
      })
  })

  it('405 on DELETE /tweets', function (done) {
    request(app)
      .delete('/tweets')
      .end(function (err, res) {
        expect(err).to.have.status(405)
        return done()
      })
  })

  it('return 10 tweets on GET /tweets', function (done) {
    request(app)
      .get('/tweets')
      .end(function (err, res) {
        if (err) return done(err)

        expect(res).to.have.status(200)
        expect(res).to.have.ownProperty('body')
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length(10)
        return done()
      })
  })
})
