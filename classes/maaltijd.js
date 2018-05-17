const assert = require('assert');
const error = require('../classes/error');

class maaltijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs, huisId, userId, next){
        this.error = true;
        try {
            assert(typeof (naam) === 'string', 'naam must be a string.');
            assert(typeof (beschrijving) === 'string', 'beschrijving must be a string.');
            assert(typeof (ingredienten) === 'string', 'ingredienten must be a string');
            assert(typeof (allergie) === 'string', 'allergie must be a string');
            assert(typeof (prijs) === 'number', 'prijs must be a number');
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
        this.huisId = huisId;
        this.userId = userId;
        this.error = false;
    }
}

module.exports = maaltijd;