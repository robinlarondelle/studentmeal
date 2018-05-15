const assert = require('assert');
const error = require('../classes/error');

class studentenhuis {
    constructor(naam, adres, userId, next){
        try {
            assert(typeof (naam) === 'string', 'naam must be a string.');
            assert(typeof (adres) === 'string', 'adres must be a string.');
            assert(typeof (userId) === 'string', 'userId must be a string');

        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        this.naam = naam;
        this.adres = adres;
        this.userId = userId;
        this.contact = null;
        this.email = null;
        this.id = null;
    }

    setContact(contact){
        this.contact = contact;
    }

    setEmail(email){
        this.email = email;
    }

    setId(id){
        this.id = id;
    }
}

module.exports = studentenhuis;