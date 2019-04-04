var express = require('express');
var router = express.Router();
var bankController = require('../controllers/bankController');
var Validation = require('../validations/validation');
var Authorize = require('../middleware/Authorize');

router.post('/payment',Validation.PaymentValidation, 
	Authorize.Signature,
	Authorize.CardValidation, 
	bankController.Payment);
// router.post('/payment',Validation.PaymentValidation, bankController.Payment);


module.exports = router;
