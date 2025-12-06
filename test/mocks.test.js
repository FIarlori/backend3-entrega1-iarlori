import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;
const request = supertest(app);

describe('Mocks Router Tests', () => {
    describe('GET /api/mocks/mockingpets', () => {
        it('should return 100 mock pets by default', async () => {
            const response = await request.get('/api/mocks/mockingpets');
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.payload).to.be.an('array');
            expect(response.body.payload).to.have.lengthOf(100);
        });

        it('should return specified number of mock pets', async () => {
            const response = await request.get('/api/mocks/mockingpets?count=10');
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.lengthOf(10);
        });
    });

    describe('GET /api/mocks/mockingusers', () => {
        it('should return 50 mock users by default', async () => {
            const response = await request.get('/api/mocks/mockingusers');
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.payload).to.be.an('array');
            expect(response.body.payload).to.have.lengthOf(50);
            expect(response.body.payload[0]).to.have.property('role');
            expect(response.body.payload[0].pets).to.be.an('array').that.is.empty;
        });

        it('should return specified number of mock users', async () => {
            const response = await request.get('/api/mocks/mockingusers?count=5');
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.lengthOf(5);
        });
    });

    describe('POST /api/mocks/generateData', () => {
        it('should generate and insert users and pets into database', async () => {
            const testData = {
                users: 5,
                pets: 3
            };

            const response = await request
                .post('/api/mocks/generateData')
                .send(testData);

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.results.users.inserted).to.equal(5);
            expect(response.body.results.pets.inserted).to.equal(3);
        });

        it('should return error if no parameters provided', async () => {
            const response = await request
                .post('/api/mocks/generateData')
                .send({});

            expect(response.status).to.equal(400);
            expect(response.body.status).to.equal('error');
        });
    });
});