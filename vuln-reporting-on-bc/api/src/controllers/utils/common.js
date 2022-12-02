'use strict';
const ipfsClient = require('ipfs-http-client');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
let filePath = path.join(process.cwd(), 'data', 'ipfs-peers.json')
const ipfsPeerData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const appConfig = require("../../config");
const dataFolder = path.join(process.cwd(), 'data');
const profilesFolder = path.join(dataFolder, 'profiles', `${appConfig.mode}`);
const userMapFilePath = path.join(dataFolder, 'org-user-map.json');
const userMapData = JSON.parse(fs.readFileSync(userMapFilePath, 'utf8'))

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //minimum: inclusive, maximum: exclusive
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateSha256Hash(data) {
    return new Promise((resolve, reject) => {
        if (!data) {
            resolve(null);
        }
        const hash = crypto.createHash('sha256');
        try {
            hash.update(data);
            let hashValue = hash.digest('hex');
            resolve(hashValue);
        } catch (error) {
            console.log('hashFileContents: error ', error);
            reject(error);
        }
    })
}
async function getIpfsClient() {
    if (!ipfsPeerData) {
        console.log('no peer data');
        return null;
    }
    let peerData = ipfsPeerData[appConfig.mode];
    if (!peerData || peerData.peers.length < 1) {
        console.log('no data for config mode: ', appConfig.mode, " ipfsPrimaryHost is: ", appConfig.ipfsPrimaryHost);
        return null;
    }
    let index = getRandomInt(1, peerData.peers.length);
    let peer = peerData.peers[index - 1];
    if (peer) {
        peer.client = ipfsClient(peer.apiUri);
        return peer;
    }
    console.log('peer not found ...');
    return null;
}

function getOrgConnectionProfile(org) {
    let id = org.toLowerCase();
    let profile = {
        "orgId": `${id}`,
        "path": `${profilesFolder}/connection-${id}.json`
    };
    return profile;
}
function getOrgMap() {
    let map = {
        "vendor1": "Org1",
        "vendor2": "Org2",
        "vendor3": "Org3",
        "vendor4": "Org4",
    }
    return map;
}
function getOrgProfileForTrainingClient(trainingClientName) {
    let cmap = getOrgMap();
    let orgId = cmap[trainingClientName];
    let orgProfile = getOrgConnectionProfile(orgId);
    orgProfile.userName = userMapData[orgId.toLowerCase()];
    return orgProfile;
}
function parsePeerErrorMsg(reject, error) {
    let msgKey = 'message='
    if (error.message.includes(msgKey)) {
        // hyperledger api returns an error string which contains error
        // messages from peer(s)
        let errors = error.message.split('\n');
        let msgs = errors[1].split(msgKey);
        let errMsg = {
            peerMsg: errors[0].replace('Errors:', ''),
            chaincodeMsg: msgs[1]
        }
        reject(errMsg)
    } else {
        reject(error.message);
    }
}
module.exports = {
    getRandomInt,
    generateSha256Hash,
    getIpfsClient,
    getOrgConnectionProfile,
    getOrgProfileForTrainingClient,
    parsePeerErrorMsg
};