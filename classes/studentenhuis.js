const assert = require('assert');
const error = require('../classes/error');

class studentenhuis {
    constructor(naam, adres, userId, next){
        this.error = true;
        try {
            assert(typeof (naam) === 'string', 'naam must be a string.');
            assert(typeof (adres) === 'string', 'adres must be a string.');
        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }
        this.naam = naam;
        this.adres = adres;
        this.userId = userId;
        this.error = false;
    }
}

module.exports = studentenhuis;