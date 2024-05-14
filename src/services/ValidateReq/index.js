const ValidateReq = (req = null, requiredKeys = []) => {

    // Verifies if parameters exist
    if(req == null || req.body == null || requiredKeys.length == 0) { return false }

    // Verifies if requisition body have required keys
    let allGood = true
    requiredKeys.forEach(key => {
        if(req.body[key] == null || req.body[key] == undefined) { allGood = false; }
    });
    if(!allGood){ return false; }

    return true;
}
module.exports = ValidateReq