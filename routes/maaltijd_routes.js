let express = require('express');
let router = express.Router();
let maaltijd_controllers = require('../controllers/maaltijd_controllers');
let auth = require("../auth/authentication");

router.post('/api/studentenhuis/:huisId/maaltijd', maaltijd_controllers.createMaaltijd);
router.get('/api/studentenhuis/:huisId/maaltijd', maaltijd_controllers.getMaaltijd);
router.get('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijd_controllers.getMaaltijdById);
router.put('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijd_controllers.putMaaltijd);
router.delete('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijd_controllers.deleteMaaltijd);

module.exports = router;