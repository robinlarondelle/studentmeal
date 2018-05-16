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

describe('Maaltijd API POST', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a maaltijd when posting a valid object', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("ID");
                res.body.should.have.property("Naam");
                res.body.should.have.property("Beschrijving");
                res.body.should.have.property("Ingredienten");
                res.body.should.have.property("Allergie");
                res.body.should.have.property("Prijs");
                expect(res.body.ID).to.be.a("number");
                expect(res.body.Naam).to.be.a("string");
                expect(res.body.Beschrijving).to.be.a("string");
                expect(res.body.Ingredienten).to.be.a("string");
                expect(res.body.Allergie).to.be.a("string");
                expect(res.body.Prijs).to.be.a("number");
            });
        done()
    });

    it('should return an error when posting an invalid naam', (done) => {
        let maaltijd = {
            "beschrijving" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an invalid beschrijving', (done) => {
        let maaltijd = {
            "naam" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an invalid ingredienten', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd")
            .send(maaltijd)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an invalid allergie', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an invalid prijs', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "allergie" : "string"
        };
        chai.request(server)
            .post("/api/studentenhuis/1/maaltijd")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting a invalid huisId', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .post("/api/studentenhuis/100000000/maaltijd")
            .send(maaltijd)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });
});

describe('Maaltijd API GET ALL', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return an array of maaltijden', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
            });
        done()
    });

    it('should return an error when getting an invalid huisId', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/10000000/maaltijd")
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

describe('Maaltijd API GET ONE', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a maaltijd when providing a valid huisId and maaltijdId', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd/1")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("ID");
                res.body.should.have.property("Naam");
                res.body.should.have.property("Beschrijving");
                res.body.should.have.property("Ingredienten");
                res.body.should.have.property("Allergie");
                res.body.should.have.property("Prijs");
                expect(res.body.ID).to.be.a("number");
                expect(res.body.Naam).to.be.a("string");
                expect(res.body.Beschrijving).to.be.a("string");
                expect(res.body.Ingredienten).to.be.a("string");
                expect(res.body.Allergie).to.be.a("string");
                expect(res.body.Prijs).to.be.a("number");
            });
        done()
    });

    it('should return an error when getting an invalid huisId', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/10000000/maaltijd/1")
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

    it('should return an error when getting an invalid maaltijdId', (done) => {
        chai.request(server)
            .get("/api/studentenhuis/1/maaltijd/10000000")
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

describe('maaltijd API PUT', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a maaltijd with ID when posting a valid object', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(200);
                res.body.should.have.property("ID");
                res.body.should.have.property("Naam");
                res.body.should.have.property("Beschrijving");
                res.body.should.have.property("Ingredienten");
                res.body.should.have.property("Allergie");
                res.body.should.have.property("Prijs");
                expect(res.body.ID).to.be.a("number");
                expect(res.body.Naam).to.be.a("string");
                expect(res.body.Beschrijving).to.be.a("string");
                expect(res.body.Ingredienten).to.be.a("string");
                expect(res.body.Allergie).to.be.a("string");
                expect(res.body.Prijs).to.be.a("number");
            });
        done()
    });

    it('should return an error when posting an ivalid naam', (done) => {
        let maaltijd = {
            "beschrijving" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an ivalid beschrijving', (done) => {
        let maaltijd = {
            "naam" : "string",
            "ingredienten" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an ivalid ingredienten', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "allergie" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an ivalid allergie', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an ivalid huisId', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1000000/maaltijd/1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting an ivalid maaltijdId', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/10000000")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting a negative maaltijdId', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/1/maaltijd/-1")
            .send(maaltijd)
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(412);
                res.body.should.have.property("message");
                res.body.should.have.property("code");
                res.body.should.have.property("datetime");
            });
        done()
    });

    it('should return an error when posting a negative huisId', (done) => {
        let maaltijd = {
            "naam" : "string",
            "beschrijving" : "string",
            "ingredienten" : "string",
            "prijs" : 0
        };
        chai.request(server)
            .put("/api/studentenhuis/-1/maaltijd/1")
            .send(maaltijd)
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

describe('Maaltijd API DELETE', () => {
    // it('should throw an error when using invalid JWT token', (done) => {
    //     //
    //     // Hier schrijf je jouw testcase.
    //     //
    //     done()
    // });

    it('should return a message when deleting a valid object', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/1/maaltijd/20")
            .send()
            .set('authorization', token)
            .end((err, res) =>  {
                res.should.have.status(404);
                res.body.should.have.property("message");
            });
        done()
    });

    it('should return an error when deleting a invalid huisId', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/100000000/maaltijd/20")
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

    it('should return an error when deleting a invalid huisId', (done) => {
        chai.request(server)
            .delete("/api/studentenhuis/1/maaltijd/10000000")
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