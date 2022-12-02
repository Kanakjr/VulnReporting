const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') })
let configObject = {
    "ipfsPrimaryHost": process.env.ipfsPrimaryHost,
    "mode": process.env.mode || 'dev',
    "enrollmentAdmin": process.env.enrollmentAdmin || "admin",
    "enrollmentPwd": process.env.enrollmentAdmin || "adminpw",
    "channelName": process.env.channelName || "commonchannel", // mychannel commonchannel
    "chaincodeId": process.env.chaincodeId || "vulnreporting",
    // Report
    "chaincodeQueryReports": process.env.chaincodeQueryReports || "FetchReports",
    "chaincodeAddReport": process.env.chaincodeAddReport || "PublishReport",
    "chaincodeUpdateReport": process.env.chaincodeUpdateReport || "UpdateReport",
    // Policy
    "chaincodeQueryPolicy": process.env.chaincodeQueryPolicy || "FetchPolicy",
    "chaincodeAddPolicy": process.env.chaincodeAddPolicy || "PublishPolicy",
    "chaincodeUpdatePolicy": process.env.chaincodeUpdatePolicy || "UpdatePolicy",
    // Reward
    "chaincodeQueryReward": process.env.chaincodeQueryReward || "FetchReward",
    "chaincodeAddReward": process.env.chaincodeAddReward || "PublishReward",
    "chaincodeUpdateReward": process.env.chaincodeUpdateReward || "UpdateReward",


    requestsType: {
        // Report
        fetchReports: "fetch-reports",
        newReport: "add-report",
        updateReport: "update-report",
        // Policy
        fetchPolicy: "fetch-policy",
        newPolicy: "add-policy",
        updatePolicy: "update-policy",
        // Reward
        fetchReward: "fetch-reward",
        newReward: "add-reward",
        updateReward: "update-reward",

    },
    recordDocType: {
        DocTypeReport: "report",
        DocTypePolicy: "policy",
        DocTypeReward: "reward",
    },
}

module.exports = configObject;