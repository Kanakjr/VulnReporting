'use strict';

function responseError(res,err,defaultMsg) {
    if(!err) {
        return res.status(500).json({ errorMsg: defaultMsg });
    }
    if (typeof(err) == "object") {
        res.status(500).json(
            {  errorMsg: defaultMsg,
               chaincodeErr: err.chaincodeMsg
            }
        );
    } else {
        res.status(500).json({ errorMsg: defaultMsg });
    }
}
function getInvokeOrg(req, defaultOption) {
    if (defaultOption) {
        return req.headers["org"] ? req.headers["org"] : defaultOption;
    }
    return req.headers["org"];
}

module.exports = {
    responseError,
    getInvokeOrg
};