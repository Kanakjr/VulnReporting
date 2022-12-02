'using strict';
const common = require('./utils/common');
const logger = require("./utils/logging").getLogger("chaincode-query-helper");
const networkClient = require('./fabric2.2/network-client.js');
const appConfig = require('../config');

function fetchQueryResults(payload,userData,requestType) {
    return new Promise( async(resolve, reject) => {
        if(!payload) {
            return reject(new Error("missing data to process!"));
        }
        if(!userData) {
            return reject(new Error("User profile data not found")); 
        }
        try {
            // defines the payload envelop to be used in chaincode invocation.
            let requestData = {
                chaincodeId: appConfig.chaincodeId,
                fcn: payload.queryFunction,
                args: [JSON.stringify(payload.query)],
                channelName: appConfig.channelName
            }
            let results = await queryChaincode(requestData, userData);
            resolve(results);

        } catch (error) {
            logger.error(`error processing ${requestType}:`,error)
            common.parsePeerErrorMsg(reject,error)
        }
        
    });
}
async function queryChaincode(requestData,userData) {
    // helper function to submit transaction request to chaincode
    let results = await networkClient.query(requestData,userData.userName,userData.connectionProfilePath)
    return results;
}
module.exports = {
    // fetchTrainingSettings,
    fetchQueryResults
};