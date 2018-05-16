const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mocha = require('mocha');
const expect = chai.expect;
const should = chai.should();
const auth = require('../auth/authentication');

chai.should();
chai.use(chaiHttp);

let token = auth.encodeToken(1, 'meeltje@mail.com');
console.log('TOKEN:' +  token);

describe('Deelnemer API POST', () => {


    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return an error when posting an invalid huisID', (done) => {
        chai.request(server)
            .post("/api/studentenhuis/100000000/maaltijd/1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an invalid maaltijdId', (done) => {
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd/1000000/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });
});

describe('Deelnemer API GET', () => {
    it('should return an array of deelnemers when valid info is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd/1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
            });
        done()
    });

    it('should return an error when an invalid huisId is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1000000/maaltijd/1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when an invalid maaltijdId is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd/10000000/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when a negative maaltijdId is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd/-1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
               ;
            });
        done()
    });

    it('should return an error when a negative huisId is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/-1/maaltijd/1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
            });
        done()
    });

    it('should return an error when a decimal huisId is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/0.1/maaltijd/1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
            });
        done()
    });

    it('should return an error when a decimal maaltijdId is provided', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd/0.1/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
            });
        done()
    });
});

describe('Maaltijd API DELETE', () => {
    it('should return an error when provided an invalid huisId', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/10000000000/maaltijd/30/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
            });
        done()
    });

    it('should return an error when provided an invalid maaltijdId', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/1/maaltijd/1000000000000/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
            });
        done()
    });

    it('should return an error when provided a negative huisId', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/-1/maaltijd/20/deelnemers")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
            });
        done()
    });
});