const assert = require('assert');
const error = require('../classes/error');

class studentenhuis {
    constructor(naam, adres, userId, next){
        this.error = true;
        try {
            assert(typeof (naam) === 'string', 'naam must be a string.');
            assert(typeof (adres) === 'string', 'adres must be a string.');
            assert(typeof (userId) === 'string', 'userId must be a string');
            assert(isNaN(userId) === false, 'userId must be anumber');
            assert(userId.indexOf('-') === -1, 'userId can\'t be negative');
            assert(userId.indexOf('.') === -1, 'userId can\'t be a decimal');
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