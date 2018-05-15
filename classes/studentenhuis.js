const assert = require('assert');
const error = require('../classes/error');

class studentenhuis {
    constructor(naam, adres, userId, huisId, next){
        try {
            assert(typeof (naam) === 'string', 'naam must be a string.');
            assert(typeof (adres) === 'string', 'adres must be a string.');
            assert(typeof (userId) === 'string', 'userId must be a string');
            assert(isNaN(userId) === false, 'userId must be anumber');
            assert(userId.indexOf('-') === -1, 'userId can\'t be negative');
            assert(userId.indexOf('.') === -1, 'userId can\'t be a decimal');
            assert(typeof (huisId) === 'string', 'huisId must be a string');
            assert(isNaN(huisId) === false, 'huisId must be a number');
            assert(huisId.indexOf('-') === -1, 'huisId can\'t be negative');
            assert(huisId.indexOf('.') === -1, 'huisId can\'t be a decimal');
        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }
        this.naam = naam;
        this.adres = adres;
        this.userId = userId;
        this.huisId = huisId;
    }
}

module.exports = studentenhuis;