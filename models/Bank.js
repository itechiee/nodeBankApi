var db=require('../db');

var Bank = {
    getAbout:function(callback) {
        return db.query("CALL `FetchOnlineApplicationField`(?, ?)",['About', ''], callback);
    }
}

module.exports = Bank;