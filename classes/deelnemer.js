const assert = require('assert');
const error = require('../classes/error');

class deelnemer {
    constructor(huisId, maaltijdId, userId){
        try {
            assert(typeof (huisId) === 'string', 'huisId must be a string.');
            assert(isNaN(huisId) === false, 'huisId must be a number');
            assert(huisId.indexOf('-') === -1, 'huisId can\'t be negative');
            assert(huisId.indexOf('.') === -1, 'huisId can\'t be a decimal');
            assert(typeof (maaltijdId) === 'string', 'maaltijdId must be a string.');
            assert(isNaN(maaltijdId) === false, 'maaltijdId must be anumber');
            assert(maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
            assert(typeof (userId) === 'string', 'userId must be a string');
            assert(isNaN(userId) === false, 'userId must be anumber');
            assert(userId.indexOf('-') === -1, 'userId can\'t be negative');
            assert(userId.indexOf('.') === -1, 'userId can\'t be a decimal');
        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }
        this.huisId = huisId;
        this.maaltijdId = maaltijdId;
        this.userId = userId;
    }
}

module.exports = deelnemer;