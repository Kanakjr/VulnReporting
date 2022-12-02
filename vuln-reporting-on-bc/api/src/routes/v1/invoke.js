'use strict';
const ipfsHashOnly = require('ipfs-only-hash');
const express = require('express');
const router = express.Router();
const { responseError, getInvokeOrg } = require('./requestUtil');
const appConfig = require('../../config');
const common = require('../../controllers/utils/common');
const invokeHelper = require("../../controllers/chaincode-invoke-helper");
const cryptoHelper = require("../../controllers/crypto-helper");
const fs = require('fs');
const path = require('path');
const { handleQueryRequests } = require('../../controllers/query-controller');



router.post('/init-ledger', async function (req, res) {
    let org = getInvokeOrg(req);
    initLedger(org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'init-ledger successful',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error init-ledger',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error init-ledger")
        })

});

////////////////  Report  ////////////////////////////////

router.post('/add-report', async function (req, res) {
    let org = getInvokeOrg(req);
    if (!org) {
        return res.status(500).json({ error: "org property not set in headers" });
    }
    if (!req.body.reportID || req.body.reportID == "") {
        return responseError(res, null, "empty reportID")
    }
    processNewReport(req, org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'report added successfully',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error adding report',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error adding report")
        })

});

router.post('/update-report', async function (req, res) {
    let org = getInvokeOrg(req);
    if (!org) {
        return res.status(500).json({ error: "org property not set in headers" });
    }
    if (!req.body.reportID || req.body.reportID == "") {
        return responseError(res, null, "empty reportID")
    }
    processUpdateReport(req, org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'report updated successfully',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error updating report',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error updating report")
        })

});

////////////////  Policy  ////////////////////////////////

router.post('/add-policy', async function (req, res) {
    let org = getInvokeOrg(req);
    if (!org) {
        return res.status(500).json({ error: "org property not set in headers" });
    }
    if (!req.body.policyID || req.body.policyID == "") {
        return responseError(res, null, "empty PolicyID")
    }
    processNewPolicy(req, org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'policy added successfully',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error adding policy',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error adding policy")
        })

});

router.post('/update-policy', async function (req, res) {
    let org = getInvokeOrg(req);
    if (!org) {
        return res.status(500).json({ error: "org property not set in headers" });
    }
    if (!req.body.policyID || req.body.policyID == "") {
        return responseError(res, null, "empty policyID")
    }
    processUpdatePolicy(req, org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'policy updated successfully',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error updating policy',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error updating policy")
        })

});

////////////////  Reward  ////////////////////////////////

router.post('/add-reward', async function (req, res) {
    let org = getInvokeOrg(req);
    if (!org) {
        return res.status(500).json({ error: "org property not set in headers" });
    }
    if (!req.body.rewardID || req.body.rewardID == "") {
        return responseError(res, null, "empty rewardID")
    }
    processNewReward(req, org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'reward added successfully',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error adding reward',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error adding reward")
        })

});

router.post('/update-reward', async function (req, res) {
    let org = getInvokeOrg(req);
    if (!org) {
        return res.status(500).json({ error: "org property not set in headers" });
    }
    if (!req.body.rewardID || req.body.rewardID == "") {
        return responseError(res, null, "empty rewardID")
    }
    processUpdateReward(req, org)
        .then((results) => {
            if (results) {
                res.status(200).json({
                    status: true,
                    message: 'reward updated successfully',
                    data: results
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'error updating reward',
                    data: results
                });
            }
        })
        .catch((err) => {
            console.log("error: ", err);
            responseError(res, err, "error updating reward")
        })

});

async function initLedger(org) {
    let { publicKey, privateKey } = cryptoHelper.generateKeyPair()
    let policy1 = {
        org: org,
        chainPayload: {
            policyID: "policy001", name: "Apple iphone policy",
            owner: "apple", product: "iphone13", description: "Apache Log4j vulnerable to RCE",
            disclosurePeriod: 45, reward: 1000, publicKey: publicKey
        }
    }
    let report1 = {
        org: org,
        chainPayload: {
            reportID: "report001", name: "Apache_Log4j", owner: "User1",
            documentHash: "some-hash-1234", policy: "policy001", status: "OPEN",
            description: "Apache Log4j vulnerable to RCE"
        }
    }
    let report2 = {
        org: org,
        chainPayload: {
            reportID: "report002", name: "ProxyLogon", owner: "User2",
            documentHash: "some-hash-4444", policy: "policy001", status: "OPEN",
            description: "ProxyLogon affect Microsoft Exchange email servers"
        }
    }
    let result = []
    result.push(await newPolicyRequest(policy1, privateKey))
    result.push(await newReportRequest(report1))
    result.push(await newReportRequest(report2))
    return result
}

////////////////  Report  ////////////////////////////////

async function processNewReport(req, org) {
    let cvssscore = req.body.cvssscore;
    if (typeof cvssscore === 'string' || cvssscore instanceof String) {
        cvssscore = parseInt(cvssscore);
    }
    let settingsData = {
        org: org,
        chainPayload: {
            reportID: req.body.reportID,
            name: req.body.name,
            owner: req.body.owner,
            // documentHash: req.body.documentHash,
            policy: req.body.policy,
            description: req.body.description,
            reference: req.body.reference,
            cvss: req.body.cvss,
            cvssscore: cvssscore,
            cwe: req.body.cwe,
            status: "OPEN",
        }
    }
    if (!req.files || !req.files.assets) {
        return newReportRequest(settingsData)
    }
    ///// - TODO
    let policy = await getPolicyPublickey(req)
    if (policy.length == 1) {
        let publicKey = policy[0].publicKey
        let [encryptedData, encryptedkey] = cryptoHelper.hybridEncrypt(req.files.assets.data, publicKey)

        req.files.assets.data = encryptedData
        settingsData.chainPayload.documentKey = encryptedkey

        // testing - decryption /// 
        // let policyID = policy[0].id
        // req.files.assets.data = decryptReportFile(encryptedData, encryptedkey, policyID)

        return addModelDataAndAssets(settingsData, appConfig.requestsType.newReport, req.files)
    }
    else {
        console.error('Policy not found for policyID %s', req.body.policy)
    }

}

function decryptReportFile(encryptedData, encryptedkey, policyID) {
    // Load privatekey from file
    let policyKey = path.join(process.cwd(), 'data', 'policy', policyID + '.key');
    let privateKey = fs.readFileSync(policyKey);
    let decryptedData = cryptoHelper.hybridDecrypt(encryptedData, privateKey, encryptedkey)
    return decryptedData
}

async function getPolicyPublickey(req) {
    let requestPayload = {
        org: req.headers["org"] ? req.headers["org"] : "server"
    }
    requestPayload.selectors = { policyID: req.body.policy }
    return handleQueryRequests(requestPayload, appConfig.requestsType.fetchPolicy);
}


function newReportRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                org: data.org,
                modelData: data.chainPayload
            }
            let dt = await addToChain(item, appConfig.requestsType.newReport);
            return resolve(dt.data);
        } catch (err) {
            return reject(err);
        }
    });
}

async function processUpdateReport(req, org) {
    let settingsData = {
        org: org,
        chainPayload: {
            reportID: req.body.reportID,
            // name: req.body.name,
            // owner: req.body.owner,
            documentHash: req.body.documentHash,
            policy: req.body.policy,
            description: req.body.description,
            reference: req.body.reference,
            cvss: req.body.cvss,
            cvssscore: req.body.cvssscore,
            cwe: req.body.cwe,
            status: req.body.status
        }
    }
    return updateReportRequest(settingsData)
}

function updateReportRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                org: data.org,
                modelData: data.chainPayload
            }
            let dt = await addToChain(item, appConfig.requestsType.updateReport);
            return resolve(dt.data);
        } catch (err) {
            return reject(err);
        }
    });
}

////////////////  Policy  ////////////////////////////////

async function processNewPolicy(req, org) {

    // TODO - Pubilc key implementation
    let { publicKey, privateKey } = cryptoHelper.generateRSAKeyPair()
    ///////////////////////////////////

    var disclosurePeriod = req.body.disclosurePeriod;
    var reward = req.body.reward;
    var priority = req.body.priority;
    if (typeof disclosurePeriod === 'string' || disclosurePeriod instanceof String) { disclosurePeriod = parseInt(disclosurePeriod) }
    if (typeof reward === 'string' || reward instanceof String) { reward = parseInt(reward) }
    if (typeof priority === 'string' || priority instanceof String) { priority = parseInt(priority) }

    let settingsData = {
        org: org,
        chainPayload: {
            policyID: req.body.policyID,
            name: req.body.name,
            owner: req.body.owner,
            product: req.body.product,
            description: req.body.description,
            disclosurePeriod: disclosurePeriod,
            reward: reward,
            priority: priority,
            scope: req.body.scope,
            publicKey: publicKey,
        }
    }
    return newPolicyRequest(settingsData, privateKey)
}

function newPolicyRequest(data, privateKey) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                org: data.org,
                modelData: data.chainPayload
            }
            let dt = await addToChain(item, appConfig.requestsType.newPolicy);
            dt.data.privateKey = privateKey
            const policyKey = path.join(process.cwd(), 'data', 'policy', dt.data.id + '.key');
            fs.writeFileSync(policyKey, privateKey);
            return resolve(dt.data);
        } catch (err) {
            return reject(err);
        }
    });
}

async function processUpdatePolicy(req, org) {
    let settingsData = {
        org: org,
        chainPayload: {
            policyID: req.body.policyID,
            // name: req.body.name,
            // owner: req.body.owner,
            product: req.body.product,
            description: req.body.description,
            disclosurePeriod: req.body.disclosurePeriod,
            reward: req.body.reward,
            priority: req.body.priority,
            scope: req.body.scope,
        }
    }
    return updatePolicyRequest(settingsData)
}

function updatePolicyRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                org: data.org,
                modelData: data.chainPayload
            }
            let dt = await addToChain(item, appConfig.requestsType.updatePolicy);
            return resolve(dt.data);
        } catch (err) {
            return reject(err);
        }
    });
}

////////////////  Reward  ////////////////////////////////

async function processNewReward(req, org) {
    let settingsData = {
        org: org,
        chainPayload: {
            rewardID: req.body.rewardID,
            amount: req.body.amount,
            issuer: req.body.issuer,
            reportOwner: req.body.reportOwner,
        }
    }
    return newRewardRequest(settingsData)
}

function newRewardRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                org: data.org,
                modelData: data.chainPayload
            }
            let dt = await addToChain(item, appConfig.requestsType.newReward);
            return resolve(dt.data);
        } catch (err) {
            return reject(err);
        }
    });
}

async function processUpdateReward(req, org) {
    let settingsData = {
        org: org,
        chainPayload: {
            rewardID: req.body.rewardID,
            amount: req.body.amount,
            issuer: req.body.issuer,
            reportOwner: req.body.reportOwner,
        }
    }
    return updateRewardRequest(settingsData)
}

function updateRewardRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                org: data.org,
                modelData: data.chainPayload
            }
            let dt = await addToChain(item, appConfig.requestsType.updateReward);
            return resolve(dt.data);
        } catch (err) {
            return reject(err);
        }
    });
}

///////////////// IPFS ////////////////////////////////////////

// function addFileToIpfs(files) {
//     return new Promise(async (resolve, reject) => {
//         if (!files || !files.assets) {
//             return reject('No files to process, ensure files are uploaded with property name "assets"')
//         }
//         let assets = Array.isArray(files.assets) ? files.assets : [files.assets]
//         let ipfs = await common.getIpfsClient();
//         if (!ipfs) {
//             return reject('No Ipfs peers to utilize')
//         }

//         let promises = [];
//         try {
//             let itemToProcess = await groupAssets(assets, ipfs);
//             // add file(s) to ipfs on success log to blockchain
//             promises.push(addFileBufferToIpfs(itemToProcess, ipfs));
//             Promise.all(promises)
//                 .then(async (promisesResults) => {
//                     return promisesResults[0]
//                 })
//                 .catch((err) => {
//                     return reject(err);
//                 });
//         } catch (err) {
//             return reject(err);
//         }
//     });
// }

function addModelDataAndAssets(data, requestType, files) {
    return new Promise(async (resolve, reject) => {
        if (!files || !files.assets) {
            return reject('No files to process, ensure files are uploaded with property name "assets"')
        }
        let assets = Array.isArray(files.assets) ? files.assets : [files.assets]
        let ipfs = await common.getIpfsClient();
        if (!ipfs) {
            return reject('No Ipfs peers to utilize')
        }

        let promises = [];
        try {
            let itemToProcess = await groupAssets(assets, ipfs);
            // add file(s) to ipfs on success log to blockchain
            promises.push(addFileBufferToIpfs(itemToProcess, ipfs));
            Promise.all(promises)
                .then(async (promisesResults) => {
                    let item = {
                        org: data.org,
                        modelData: data.chainPayload,
                        assetDetails: promisesResults[0]
                    }
                    if (requestType == appConfig.requestsType.newReport) {
                        item.modelData.documentHash = promisesResults[0]['assets'][0]['ipfsHash']
                    }
                    let dt = await addToChain(item, requestType);
                    return resolve(dt.data);
                })
                .catch((err) => {
                    return reject(err);
                });
        } catch (err) {
            return reject(err);
        }
    });
}

async function groupAssets(assets, ipfs) {
    return new Promise(async (resolve, reject) => {
        let itemResults = {
            items: [],
            assetMap: {},
        }
        await assets.forEach(async (asset) => {
            let ipfsHash = await generateIPFSHash(asset.data);
            let sha256Hash = await common.generateSha256Hash(asset.data);
            let assetMeta = {
                fileName: asset.name,
                mimetype: asset.mimetype,
                size: asset.size,
                ipfsHash: ipfsHash,
                sha256Hash: sha256Hash,
                fileHost: ipfs.hostIp,
            };
            itemResults.items.push({ path: asset.name, content: asset.data });
            itemResults.assetMap[asset.name] = assetMeta;
        });
        resolve(itemResults);
    });
}

async function generateIPFSHash(data) {
    try {
        const hash = await ipfsHashOnly.of(data)
        return hash
    } catch (error) {
        console.log('error getting ipfs hash: ', error);
        return null;
    }
}

async function addFileBufferToIpfs(itemToProcess, ipfsPeer) {
    return new Promise(async (reslove, reject) => {
        try {
            let results = {
                parentDir: '',
                assets: []
            }
            let index = 0;
            for await (const item of ipfsPeer.client.addAll(itemToProcess.items, { pin: true, wrapWithDirectory: true })) {
                if (item.path) {
                    let assetDetails = itemToProcess.assetMap[item.path];
                    let ipfsHash = item.cid.toString();
                    let uri = `${ipfsPeer.locatorUrl}/ipfs/${ipfsHash}`;
                    if (assetDetails) {
                        assetDetails.uri = uri;
                        results.assets.push(assetDetails);
                    }

                }
                // when wrapWithDirectory option is true; ipfs returns the directory item
                // as the last item after the file(s) have been processed
                if (index === itemToProcess.items.length) {
                    let ipfsHash = item.cid.toString();
                    let uri = `${ipfsPeer.locatorUrl}/ipfs/${ipfsHash}`;
                    results.parentDir = {
                        id: ipfsHash,
                        uri: uri
                    }
                }
                index++;
            }
            return reslove(results);
        } catch (error) {
            reject(error);
        }
    });
}

///////////////////////////////////////////////////////////////

async function addToChain(payload, requestType) {
    let org = payload.modelData.org ? payload.modelData.org : payload.org
    let orgProfile = common.getOrgProfileForTrainingClient(org);
    if (orgProfile.userName) {
        let userData = {
            userName: orgProfile.userName,
            connectionProfilePath: orgProfile.path
        }
        payload.modelData.userId = orgProfile.userName
        let results = await invokeHelper.handleChaincodeRequest(payload, userData, requestType);
        return results;
    } else {
        return "Unable to fetch user details";
    }
}

module.exports = router;