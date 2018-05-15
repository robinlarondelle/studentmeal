const assert = require('assert');
const error = require('../classes/error');

class maaltijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs, huisId){
        try {
            assert(typeof (naam) === 'string', 'naam must be a string.');
            assert(typeof (beschrijving) === 'string', 'beschrijving must be a string.');
            assert(typeof (ingredienten) === 'string', 'ingredienten must be a string');
            assert(typeof (allergie) === 'string', 'allergie must be a string');
            assert(typeof (prijs) === 'string', 'prijs must be a string');
            assert(prijs.indexOf('-') === -1, 'prijs can\'t be negative');
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
        this.beschrijving = beschrijving;
        this.ingredienten = ingredienten;
        this.allergie = allergie;
        this.prijs = prijs;
        this.studentenhuis = studentenhuis;
    }
}

module.exports = maaltijd;