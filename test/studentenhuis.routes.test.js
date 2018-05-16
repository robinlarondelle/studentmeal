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

describe('Studentenhuis API POST', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a studentenhuis when posting a valid object', (done) => {
        let studentenhuis = {
            "naam": "string",
            "adres": "string"
        };

        chai.request(server)
            .post("/api/studentenhuis")
            .send(studentenhuis)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("ID");
                res.body.should.have.property("Naam");
                res.body.should.have.property("Adres");
                res.body.should.have.property("Contact");
                res.body.should.have.property("Email");
                expect(res.body.ID).to.be.a("number");
                expect(res.body.Naam).to.be.a("string");
                expect(res.body.Adres).to.be.a("string");
                expect(res.body.Contact).to.be.a("string");
                expect(res.body.Email).to.be.a("string");
            });
        done()
    });

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            "adres": "string"
        };

        chai.request(server)
            .post("/api/studentenhuis")
            .send(studentenhuis)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            "naam": "string"
        };

        chai.request(server)
            .post("/api/studentenhuis")
            .send(studentenhuis)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });
});

describe('Studentenhuis API GET all', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     done()
    // });

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(server)
            .get("/api/studentenhuis")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
            });
        done()
    })
});

describe('Studentenhuis API GET one', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("ID");
                res.body.should.have.property("Naam");
                res.body.should.have.property("Adres");
                res.body.should.have.property("Contact");
                res.body.should.have.property("Email");
                expect(res.body.ID).to.be.a("number");
                expect(res.body.Naam).to.be.a("string");
                expect(res.body.Adres).to.be.a("string");
                expect(res.body.Contact).to.be.a("string");
                expect(res.body.Email).to.be.a("string");
            });
        done()
    });

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/10000000")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    })
});

describe('Studentenhuis API PUT', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        let studentenhuis = {
            "naam": "string",
            "adres": "string"
        };

        chai.request(server)
            .put("/api/studentenhuis/1")
            .send(studentenhuis)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("ID");
                res.body.should.have.property("Naam");
                res.body.should.have.property("Adres");
                res.body.should.have.property("Contact");
                res.body.should.have.property("Email");
                expect(res.body.ID).to.be.a("number");
                expect(res.body.Naam).to.be.a("string");
                expect(res.body.Adres).to.be.a("string");
                expect(res.body.Contact).to.be.a("string");
                expect(res.body.Email).to.be.a("string");
            });
        done()
    });

    it('should throw an error when naam is missing', (done) => {
        let studentenhuis = {
            "adres": "string"
        };

        chai.request(server)
            .put("/api/studentenhuis/1")
            .send(studentenhuis)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should throw an error when adres is missing', (done) => {
        let studentenhuis = {
            "naam": "string"
        };

        chai.request(server)
            .put("/api/studentenhuis/1")
            .send(studentenhuis)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    })
});

describe('Studentenhuis API DELETE', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a message when deleting a valid object', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/1")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("message");
            });
        done()
    });

    it('should return an error when deleting a invalid object', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/100000000")
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
});