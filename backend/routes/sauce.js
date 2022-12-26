const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')



router.get("/", auth, sauceCtrl.getAllSauces);
// router.post('/', auth, sauceCtrl.createSauce);
// router.get('/:id', auth, sauceCtrl.getOneSauce);
// router.put('/:id', auth, sauceCtrl.modifySauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);
// like a sauce
// dislike a sauce

module.exports = router;