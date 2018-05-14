let express = require('express');
let router = express.Router();
let studentenhuis_controllers = require('../controllers/studentenhuis_controllers');
let auth = require("../auth/authentication");

router.post('/api/studentenhuis', studentenhuis_controllers.createStudentenhuis);
router.get('/api/studentenhuis', studentenhuis_controllers.getStudentenhuis);
router.get('/api/studentenhuis/:huisId', studentenhuis_controllers.getStudentenhuisById);
router.put('/api/studentenhuis/:huisId', studentenhuis_controllers.putStudentenhuis);
router.delete('/api/studentenhuis/:huisId', studentenhuis_controllers.deleteStudentenhuis);

module.exports = router;