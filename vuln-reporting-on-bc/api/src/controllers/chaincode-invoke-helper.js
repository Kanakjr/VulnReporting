'use strict';


const logger = require("./utils/logging").getLogger("chaincode-invoke-helper");
const moment = require('moment');
const appConfig = require('../config.js');
const networkClient = require('./fabric2.2/network-client.js');
const { v4: uuidv4 } = require('uuid')
const { parsePeerErrorMsg } = require('./utils/common');

function handleChaincodeRequest(item, userData, requestType) {
    return new Promise(async (resolve, reject) => {
        if (!item) {
            return reject(new Error("missing data to process!"));
        }
        if (!userData) {
            return reject(new Error("User data not found"));
        }

        try {
            // defines the payload envelop to be used in chaincode invocation.
            let requestData = {
                chaincodeId: appConfig.chaincodeId,
                fcn: '',
                args: [],
                channelName: appConfig.channelName
            }
            item.timestamp = moment().unix();
            let payload;
            switch (requestType) {

                /////// Report ///////
                case appConfig.requestsType.newReport:
                    requestData.fcn = appConfig.chaincodeAddReport
                    payload = await reportChaincodePayload(item);
                    break;
                case appConfig.requestsType.updateReport:
                    requestData.fcn = appConfig.chaincodeUpdateReport
                    payload = await reportChaincodePayload(item);
                    break;

                /////// Policy ///////
                case appConfig.requestsType.newPolicy:
                    requestData.fcn = appConfig.chaincodeAddPolicy
                    payload = await policyChaincodePayload(item);
                    break;
                case appConfig.requestsType.updatePolicy:
                    requestData.fcn = appConfig.chaincodeUpdatePolicy
                    payload = await policyChaincodePayload(item);
                    break;

                /////// Reward ///////
                case appConfig.requestsType.newReward:
                    requestData.fcn = appConfig.chaincodeAddReward
                    payload = await rewardChaincodePayload(item);
                    break;
                case appConfig.requestsType.updateReward:
                    requestData.fcn = appConfig.chaincodeUpdateReward
                    payload = await rewardChaincodePayload(item);
                    break;

                /////////////////////
                default:
                    return reject(`Unexpected request type ${requestType}`)
            }
            let hrstart = process.hrtime()
            requestData.args = [JSON.stringify(payload)];
            let invokeHrstart = process.hrtime()
            let results = await invokeChaincode(requestData, userData);
            let invokeHrend = process.hrtime(invokeHrstart)
            let hrend = process.hrtime(hrstart);
            logger.info('Invoke Chaincode Execution time (hr): %ds %d ms', invokeHrend[0], invokeHrend[1] / 1000000)
            logger.info('Execution time (hr): %ds %d ms', hrend[0], hrend[1] / 1000000)
            let msg = {
                data: {
                    ...results.data
                }
            }
            if (results.nextRoundSettings) {
                msg.nextRoundSettings = results.nextRoundSettings
            }
            return resolve(msg);

        } catch (error) {
            logger.error(`error processing ${requestType}:`, error)
            parsePeerErrorMsg(reject, error)
        }
    })

}

async function reportChaincodePayload(item) {
    let payload = {
        timestamp: moment().unix(),
        userId: item.modelData.userId,
        report: {
            id: uuidv4(),
            ...item.modelData,
        },
    }
    return payload
}

async function policyChaincodePayload(item) {
    let payload = {
        timestamp: moment().unix(),
        userId: item.modelData.userId,
        policy: {
            id: uuidv4(),
            ...item.modelData,
        },
    }
    return payload
}

async function rewardChaincodePayload(item) {
    let payload = {
        timestamp: moment().unix(),
        userId: item.modelData.userId,
        reward: {
            id: uuidv4(),
            ...item.modelData,
        },
    }
    return payload
}

async function invokeChaincode(requestData, userData) {
    // helper function to submit transaction request to chaincode
    let results = await networkClient.submitTransaction(requestData, userData.userName, userData.connectionProfilePath)
    return results;
}

module.exports = {
    handleChaincodeRequest
};