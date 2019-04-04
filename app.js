var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db=require('./db');
var indexRouter = require('./routes/index');
require('dotenv').config();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use(process.env.ROUTE_PREFIX, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  	db.query('insert into transaction(order_id, txn_status, response_code, response_code_description) values(?, ?, ?, ?)', 
  			[
  				req.body.MERCHANT_TRANID,
  				'failed',
  				(err.errcode || 1000),
  				err.message
  			], 
		function(dberror, dbresult){
        if(dberror) {      
            console.log(dberror);
          }        
    }); 

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
    	ORDER_ID:req.body.MERCHANT_TRANID,
    	RESPONSE_CODE: (err.errcode || 1000),
    	TXN_ID: '',
    	TXN_STATUS: 'FAIL',
    	TXN_DATE: new Date().toISOString(),
    	RESPONSE_CODE_DESCRIPTION: err.message
    },
    status: err.status,
    response: null
  });
});

module.exports = app;
