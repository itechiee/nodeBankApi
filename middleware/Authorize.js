var db=require('../db');



exports.Signature = function(req, res, next) {
         let err = {
            ORDER_ID:req.body.MERCHANT_TRANID,
            TXN_ID: '',
            TXN_STATUS: 'FAIL',
            TXN_DATE: new Date().toISOString()
        };

       return db.query('select count(AuthId) as api_allow from authentication where Signature = ?', 
            req.body.TXN_SIGNATURE, function(dberror, dbresult){
                if(dberror) {
                    err.RESPONSE_CODE_DESCRIPTION = dberror;
                    err.RESPONSE_CODE = 1002;                    
                    return res.status(500).json({ status: 500, error: err, response: null });
                }

              if(dbresult[0].api_allow <= 0) {   
                    err.RESPONSE_CODE_DESCRIPTION = 'Invalid signature';
                    err.RESPONSE_CODE = 1003;            
                    return res.status(403).json({ status: 403, error: err, response: null });
              }

               next(); 
      });
       
};

exports.CardValidation = function(req, res, next) {
         let err = {
            ORDER_ID:req.body.MERCHANT_TRANID,
            TXN_ID: '',
            TXN_STATUS: 'FAIL',
            TXN_DATE: new Date().toISOString()
        };

       return db.query('select count(CardId) as card_allow from card_detail where card_number = ? and card_name = ? and expiry_date = ? and card_type = ? and CVV = ? and card_issuer_country = ?', 
            [
                req.body.USER_CARD_NUMBER,
                req.body.USER_CARD_NAME,
                req.body.USER_EXPIRY_DATE,
                req.body.USER_CARD_TYPE,
                req.body.USER_CVV,
                req.body.CARD_ISSUED_COUNTRY
            ],  function(dberror, dbresult){
                if(dberror) {
                    err.RESPONSE_CODE_DESCRIPTION = dberror;
                    err.RESPONSE_CODE = 1004;                        
                    return res.status(500).json({ status: 500, error: err, response: null });
                }
                
                if(dbresult[0].card_allow <= 0) {   
                    err.RESPONSE_CODE_DESCRIPTION = 'Invalid Card details';
                    err.RESPONSE_CODE = 1005;            
                    return res.status(403).json({ status: 403, error: err, response: null });
                } 
                next();
      });        
};

// var Authorize = {

//     let err = {
//                 ORDER_ID:req.body.MERCHANT_TRANID,
//                 TXN_ID: '',
//                 TXN_STATUS: 'FAIL',
//                 TXN_DATE: new Date().toISOString()
//             };
//     Signature: (req, res, next) {
//         db.query('select count(AuthId) as api_allow from authentication where Signature = ?', req.body.TXN_SIGNATURE, function(dberror, dbresult){
//         if(dberror) {
//             err.RESPONSE_CODE_DESCRIPTION = dberror;
//             err.RESPONSE_CODE = 1003;
                    
//             return res.status(500).json({ status: 500, error: err, response: null });
//           }

//           if(dbresult[0].api_allow <= 0) {   

//             err.RESPONSE_CODE_DESCRIPTION = 'Invalid signature';
//             err.RESPONSE_CODE = 1001;
            
//             return res.status(403).json({ status: 403, error: err, response: null });
//             // next(err); 
//           }         
//     }
// }

// module.exports = Authorize;

// exports.authorize = (req, res, next) => {

//     let err = {
//                 ORDER_ID:req.body.MERCHANT_TRANID,
//                 TXN_ID: '',
//                 TXN_STATUS: 'FAIL',
//                 TXN_DATE: new Date().toISOString()
//             };

//         var qry = db.query('select count(AuthId) as api_allow from authentication where Signature = ?', req.body.TXN_SIGNATURE, function(dberror, dbresult){
//         if(dberror) {
//             err.RESPONSE_CODE_DESCRIPTION = dberror;
//             err.RESPONSE_CODE = 1003;
                    
//             return res.status(500).json({ status: 500, error: err, response: null });
//           }

//           if(dbresult[0].api_allow <= 0) {   

//             err.RESPONSE_CODE_DESCRIPTION = 'Invalid signature';
//             err.RESPONSE_CODE = 1001;
            
//             return res.status(403).json({ status: 403, error: err, response: null });
//             // next(err); 
//           }          
//     }); 

//     return db.query('select count(CardId) as card_allow from card_detail where card_number = ? and card_name = ? and expiry_date = ? and card_type = ? and CVV = ? and card_issuer_country = ?', 
//         [
//             req.body.USER_CARD_NUMBER,
//             req.body.USER_CARD_NAME,
//             req.body.USER_EXPIRY_DATE,
//             req.body.USER_CARD_TYPE,
//             req.body.USER_CVV,
//             req.body.CARD_ISSUED_COUNTRY
//         ], 
//         function(dberror, dbresult){
//         if(dberror) {      
//             err.RESPONSE_CODE_DESCRIPTION = dberror;
//             err.RESPONSE_CODE = 1004;
//             return res.status(500).json({ status: 500, error: err, response: null });
//           }

//           if(dbresult[0].card_allow <= 0) { 
            
//             // next(err); 
//             err.RESPONSE_CODE_DESCRIPTION = 'Invalid Card details';
//             err.RESPONSE_CODE = 1005;
//             return res.status(500).json({ status: 500, error: err, response: null });
//           }          
//     }); 

//     next();
// }; 
