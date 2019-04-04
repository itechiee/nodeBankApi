const { check, validationResult  } = require('express-validator/check');

exports.PaymentValidation = (req, res, next) => {
    req.check('MERCHANT_ACC_NO', 'The MERCHANT_ACC_NO field is required').notEmpty();
    req.check('MERCHANT_ACC_NO', 'The MERCHANT_ACC_NO field should be numeric').isNumeric();
    req.check('MERCHANT_TRANID', 'The MERCHANT_TRANID field is required').notEmpty();
    req.check('AMOUNT', 'The AMOUNT field is required').notEmpty();
    req.check('AMOUNT', 'The AMOUNT field should be numeric').isNumeric();
    req.check('TXN_SIGNATURE', 'The TXN_SIGNATURE field is required').notEmpty();
    req.check('RETURN_URL', 'The RETURN_URL field is required').notEmpty();

    req.check('USER_CARD_NUMBER', 'The USER_CARD_NUMBER field is required').notEmpty();
    req.check('USER_CARD_NUMBER', 'The USER_CARD_NUMBER field should be numeric').isNumeric();
    req.check('USER_CARD_NAME', 'The USER_CARD_NAME field is required').notEmpty();
    req.check('USER_EXPIRY_DATE', 'The USER_EXPIRY_DATE field is required').notEmpty();
    req.check('USER_EXPIRY_DATE', 'The USER_EXPIRY_DATE field is invalid').isISO8601();
    req.check('USER_CARD_TYPE', 'The USER_CARD_TYPE field is required').notEmpty();
    req.check('USER_CVV', 'The USER_CVV field is required').notEmpty();
    req.check('CARD_ISSUED_COUNTRY', 'The CARD_ISSUED_COUNTRY field is required').notEmpty();

    var errors = req.validationErrors();
    // console.log(errors);
    if (errors.length > 0) {
        let validationErr = {
                        errcode: 1001,
                        status: 403,
                        message: errors
                    }; 

        next(validationErr);
    }
    next();          
};