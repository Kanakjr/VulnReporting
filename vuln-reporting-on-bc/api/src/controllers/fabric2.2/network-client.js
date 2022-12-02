'use strict';
const {Gateway,Wallets, X509WalletMixin} =  require('fabric-network');
const fs = require('fs');
const path = require('path');
const log = require("../utils/logging").getLogger("network-client");

module.exports = (function() {
    return {
        submitTransaction: function(requestData,userName, connProfileFilePath) {
            return submitTransactionToLedger(requestData,userName, connProfileFilePath)
        },
        query: function(requestData,userName, connProfileFilePath) {
            return queryLedger(requestData,userName, connProfileFilePath)
        }
    }
})()
function getConnectionDetails(userName,connProfileFilePath) {
    return new Promise( async (resolve, reject) => {
        let wallet, connProfile;
        try {
            wallet = await getWallet(userName)
        } catch (error) {
            log.error(`error caught trying to get wallet for ${userName} `, error);
            return reject(error);
        }
        if(!wallet) {
            let walletErrMsg = `unable to initialize the wallet for user ${userName} `
            log.error(walletErrMsg, walletErrMsg);
            return reject(new Error(walletErrMsg));
        }
        try {
            connProfile = await getConnectionProfile(connProfileFilePath)
        } catch (error) {
            log.error(`error caught trying to get connection profile for ${userName} `, error);
            return reject(error);
        }
        if(!connProfile) {
            let errMsg = `unable to initialize connection profile ${connProfile} `
            log.error(errMsg);
            return reject(new Error(errMsg));
        }
        let results = {
            wallet: wallet,
            connProfile: connProfile
        }
        resolve(results);
    });
}
function submitTransactionToLedger(requestData,userName, connProfileFilePath) {
    log.info("==== submitTransactionToLedger start =====");
    return new Promise( async (resolve, reject) => {
        let wallet, connProfile;
        try {
            let profileData = await getConnectionDetails(userName, connProfileFilePath);
            wallet = profileData.wallet;
            connProfile = profileData.connProfile;
        } catch (error) {
            return reject(error);
        }
        const gateway = new Gateway();
        let result;
        let transactionError;
        try {
            log.info("==== gateway.connect starts =====");
            let connectOptions = {
                identity: userName, wallet: wallet,  
                discovery: { 
                    enabled: true, 
                    asLocalhost: true
                }
            }
            await gateway.connect(connProfile,connectOptions);
            log.info("==== gateway.connect ends =====");
        } catch (error) {
            log.info("==== gateway.connect error =====");
            log.error(error);
            return reject(error);
        }
        console.log("requestData.chaincodeId: ", requestData.chaincodeId, " requestData.channelName: ", requestData.channelName);
        try {
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(requestData.channelName);
            // Get the contract from the network.
            const contract = network.getContract(requestData.chaincodeId);
            log.info("==== submitTransaction starts =====");
            result = await contract.submitTransaction(requestData.fcn, ...requestData.args);
            log.info("==== submitTransaction ends =====");

        } catch (error) {
            log.info("==== caught error =====");
            log.error(error)
            transactionError=error
        }
        // Disconnect from the gateway.
        await gateway.disconnect();
        if(transactionError) {
            log.error("transaction error caught ... ", transactionError)
            let err = {
                message: transactionError.message,
                endosementErrors:[]
            }
            if (Array.isArray(transactionError.endorsements)) {
                transactionError.endorsements.forEach(endosementErr => {
                    if(!endosementErr.peer) {
                        // if no peer this indicates connection failure e.g network timeout
                        err.endosementErrors.push({
                            message: endosementErr.message,
                            connectFailed: endosementErr.connectFailed
                        })
                    } else {
                        err.endosementErrors.push({
                            message: endosementErr.message,
                            status: endosementErr.status,
                            targetPeer: endosementErr.peer.name
                        })
                    }
                });
            }
            reject(err);
        } else {
            log.info('Transaction has been submitted to blockchain network successfully');
            try {
                let jsonObj =  JSON.parse(result.toString('utf8'));
                resolve(jsonObj)
            } catch (error) {
                log.warn("expecting response object to be json object.")
                resolve(result.toString('utf8'))
            }
        }
        log.info("==== submitTransactionToLedger ends =====");
    });
}

function queryLedger(requestData,userName, connProfileFilePath) {
    log.info("==== queryLedger start =====");
    return new Promise( async (resolve, reject) => {
        let wallet, connProfile;
        try {
            let profileData = await getConnectionDetails(userName, connProfileFilePath);
            wallet = profileData.wallet;
            connProfile = profileData.connProfile;
        } catch (error) {
            return reject(error);
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        try {
            log.info("==== gateway.connect starts =====");
            let connectOptions = {
                identity: userName, wallet: wallet,  
                discovery: { 
                    enabled: true,
                    asLocalhost: true
                }
            }
            await gateway.connect(connProfile,connectOptions);
            log.info("==== gateway.connect ends =====");
        } catch (error) {
            log.info("==== gateway.connect error =====");
            log.error(error);
            return reject(error);
        }
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(requestData.channelName);
        // Get the contract from the network.
        const contract = network.getContract(requestData.chaincodeId);
        log.info("==== evaluateTransaction start =====");
        const result = await contract.evaluateTransaction(requestData.fcn, ...requestData.args);
        log.info("==== evaluateTransaction end =====");

        // Disconnect from the gateway.
        await gateway.disconnect();
        try {
            let resStr = result.toString('utf8');
            let jsonObj = resStr ? JSON.parse(result.toString('utf8')) : [];
            resolve(jsonObj)
        } catch (error) {
            log.warn("expecting response object to be json object ", error)
            resolve(result.toString('utf8'))
        }
        log.info("==== queryLedger end =====");
        
    });
    

}
async function getWallet(userName) {
    return new Promise( async (resolve, reject) => {
        const walletPath = path.join(process.cwd(), 'data', 'userwallets');
        let wallet = await Wallets.newFileSystemWallet(walletPath);
        const userExists = await wallet.get(userName);
        if(userExists) {
            resolve(wallet);
            return;
        } else {
            log.error(`no wallet for user ${userName}`);
            return reject(error);
        }
    });
}
function getConnectionProfile(connProfileFilePath) {
    console.log("connProfileFilePath: ", connProfileFilePath);
    return new Promise( async (resolve, reject) => {
        try {
            const contents = fs.readFileSync(connProfileFilePath, 'utf8');
            const ccp = JSON.parse(contents);
            resolve(ccp);
        } catch (error) {
            reject(error);
        }
    });
}
