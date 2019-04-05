var db=require('../db');
var request = require('request');

exports.Payment = function(req, res, next) {
  let txnId = Math.random().toString(36).substring(2);
   db.query('insert into transaction (txn_id, order_id, txn_status, response_code, response_code_description) values(?,?,?,?,?)', 
      [
          txnId,
          req.body.MERCHANT_TRANID,
          'success',
          0,
          'Approved'          
      ], 
      function(dberror, dbresult){
        if(dberror) {   
            let err = {
                status: 403,
                message: dberror
            };     
            next(err);  
          }
          
          let successMsg = {
              ORDER_ID:req.body.MERCHANT_TRANID,
              RESPONSE_CODE: 0,
              TXN_ID: txnId,
              TXN_STATUS: 'SUCCESS',
              TXN_DATE: new Date().toISOString(),
              RESPONSE_CODE_DESCRIPTION: 'Approved'
          }    
          request.post({url:'http://localhost/checkout/callback', formData: successMsg}, function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            return res.status(200).json({ status: 200, error: null, response: successMsg });
          });
          
    });
};