var valid = require('validator');


var errorDef = {
    empty: " is required to send emails",
    inValid: " is Invalid"
};

var errorFormater = function(param, err, value) {
    this.param = param;
    this.mesg = err;
    this.value = value;
}

module.exports = function(data) {
    var error = false;
    var allErrors = { err: error, des: [] };

    if (valid.isEmpty(data.subject)) {
        allErrors.error = true;
        var msg = "Email Subject " + errorDef.empty;
        var emptyErr = new errorFormater("subject", msg, data.subject);
        allErrors.des.push(emptyErr);
    }

    if (valid.isEmpty(data.from)) {
        allErrors.error = true;
        var msg = "From Email " + errorDef.empty;
        var emptyErr = new errorFormater("from", msg, data.from);
        allErrors.des.push(emptyErr);
    } else if (!valid.isEmail(data.from)) {
        allErrors.error = true;
        var msg = "From Email " + errorDef.inValid;
        var invalidErr = new errorFormater("from", msg, data.from);
        allErrors.des.push(invalidErr);
    }
    return allErrors;

};