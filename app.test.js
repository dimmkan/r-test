const request = require('supertest');
const app = require('./app');

describe('Tests', function () {
    it('Should return array', function (done) {
        request(app)
            .get('/api/goods/grouped')
            .expect(200)
            .expect(function (response) {
                Array.isArray(response);
            })
            .end(done)
    })

    it('Should return array', function (done) {
        request(app)
            .get('/api/categories')
            .expect(200)
            .expect(function (response) {
                Array.isArray(response);
            })
            .end(done)
    })
})