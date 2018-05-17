/*
 *  Dit is de deelnemrs_routes.js
 *  Dit is in feite het doorgeefluik van de applicatie.
 *  In de deelnemers_controllers.js wordt beschreven hoe elke methode
 *  afgehandeld moet worden.
 * 
 *  Door: Sjoerd Schepers & Robin La Rondelle
 */


//imports
let express = require('express');
let router = express.Router();
let deelnemers_controller = require('../controllers/deelnemers_controllers');

//Wanneer een post request komt met onderstaande URL dan wordt hij doorgestuurd naar de createDeelnemer functie
router.post('/api/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemers_controller.createDeelnemer);

//Wanneer een post request komt met onderstaande URL dan wordt hij doorgestuurd naar de getDeelnemer functie
router.get('/api/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemers_controller.getDeelnemer);

//Wanneer een post request komt met onderstaande URL dan wordt hij doorgestuurd naar de deleteDeelnemer functie
router.delete('/api/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemers_controller.deleteDeelnemer);

//Exporteer de router
module.exports = router;