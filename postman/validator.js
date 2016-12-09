module, exports = function(req) {
    var valid;
    if (req.from == null || req.from == '') {
        valid = false;
    } else if (req.to == null || req.to == '') {
        valid = false;
    } else {
        valid = true;
    }
    return valid;
}