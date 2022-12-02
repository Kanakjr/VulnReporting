'use strict';

const express = require('express');
const router = express.Router();
const { handleQueryRequests } = require('../../controllers/query-controller');
const appConfig = require('../../config');
const fs = require('fs');
const path = require('path');
const cryptoHelper = require("../../controllers/crypto-helper");


router.post('/fetch-reports', async function (req, res) {
    processFetchReports(req)
        .then((results) => {
            if (results) {
                // Try Decrypting Report here - TODO
                // let report1 = results[0]
                // let policyID = report1['policy']
                // let encryptedkey = report1['documentKey']
                // let documentHash = report1['documentHash']
                // let encryptedData = getDataFromIPFSHash(documentHash)
                // decryptReportFile(encryptedData, encryptedkey, policyID)
                res.status(200).json({
                    status: true,
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error fetching reports',
                    data: []
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            res.status(500).json({ error: "error fetching reports" });
        })
});

router.post('/fetch-policy', async function (req, res) {
    processFetchPolicy(req)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error fetching policies',
                    data: []
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            res.status(500).json({ error: "error fetching policies" });
        })
});

router.post('/fetch-reward', async function (req, res) {
    processFetchReward(req)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error fetching rewards',
                    data: []
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            res.status(500).json({ error: "error fetching reward" });
        })
});

async function processFetchReports(req) {
    let requestPayload = {
        org: getQueryOrg(req)
    }
    requestPayload.selectors = {}
    requestPayload.selectors = req.body;
    return handleQueryRequests(requestPayload, appConfig.requestsType.fetchReports);
}

async function processFetchPolicy(req) {
    let requestPayload = {
        org: getQueryOrg(req)
    }
    requestPayload.selectors = {}
    requestPayload.selectors = req.body;
    return handleQueryRequests(requestPayload, appConfig.requestsType.fetchPolicy);
}

async function processFetchReward(req) {
    let requestPayload = {
        org: getQueryOrg(req)
    }
    requestPayload.selectors = {}
    requestPayload.selectors = req.body;
    return handleQueryRequests(requestPayload, appConfig.requestsType.fetchReward);
}

function getQueryOrg(req) {
    // Determines organization that triggered the request.
    // expected header values are one of server, client1, client2, client3
    // if not set, we default to server organization
    return req.headers["org"] ? req.headers["org"] : "server";
}

function decryptReportFile(encryptedData, encryptedkey, policyID) {
    // Load privatekey from file
    let policyKey = path.join(process.cwd(), 'data', 'policy', policyID + '.key');
    let privateKey = fs.readFileSync(policyKey);
    let decryptedData = cryptoHelper.hybridDecrypt(encryptedData, privateKey, encryptedkey)
    return decryptedData
}

module.exports = router;