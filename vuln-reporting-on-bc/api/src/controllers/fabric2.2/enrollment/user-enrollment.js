'use strict';

const FabricCAServices = require('fabric-ca-client');
const {Gateway,Wallets, X509WalletMixin } = require('fabric-network');
const {createWallet, identityExists} = require('./enrollment-util.js');
const fs = require('fs');
const path = require('path');
const appConfig = require('../../../config');


/**
 * 
 * @param {*} adminUsrName - desired username for the admin user  eg 'admin'
 * @param {*} userPasswd - enrollment password'
 * @param {*} orgMspId - Org MSP ID for which new user belongs e.g 'Org1MSP'
 * @param {*} caDomain - Certificate authority domain e.g 'ca.org1.example.com'
 * @param {*} connectionProfilePath  - Absolute path to connection profile path '/.../connection-org1.json'
 */

function enrollAdmin(adminUsrName,orgMspId,caDomain,connectionProfilePath) {
    return new Promise( async (resolve, reject) => {
        const ccpPath = path.resolve(connectionProfilePath);
        const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
        const ccp = JSON.parse(ccpJSON);
        

        try {
            // Create a new CA client for interacting with the CA.
            const caInfo = ccp.certificateAuthorities[caDomain];
            const caTLSCACerts = caInfo.tlsCACerts.pem;
            const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
            
            // Create a new file system based wallet for managing identities.
            const wallet = await createWallet(Wallets, true);
            // Check to see if we've already enrolled the admin user.
            const adminExists = await identityExists(wallet,adminUsrName);
            let msg = ''
            if (adminExists) {
                msg = `An identity for the admin user "${adminUsrName}" already exists in the wallet`;
                return reject(msg)
            }

            // Enroll the admin user, and import the new identity into the wallet.
            const enrollment = await ca.enroll({ enrollmentID: appConfig.enrollmentAdmin, enrollmentSecret: appConfig.enrollmentPwd });
            const x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: orgMspId,
                type: 'X.509',
            };
            await wallet.put(adminUsrName, x509Identity);
            msg = `Successfully enrolled admin user "${adminUsrName}" and imported it into the wallet`;
            console.log(msg);
            return resolve(msg);
            
        } catch (error) {
            let msg = `Failed to enroll admin user "${adminUsrName}": ${error}`;
            console.error(msg);
            reject(msg);
        }
        
    })
    

}
function registerAndEnrollUser(adminUsrName,userId,orgMspId,affiliation,caDomain,connectionProfilePath) {
	return new Promise( async (resolve, reject) => {
        
        try {
		
            const ccpPath = path.resolve(connectionProfilePath);
            const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
            const ccp = JSON.parse(ccpJSON);
            // get filesystem wallet or create new if not available
            const wallet = await createWallet(Wallets, true);
            let msg=''
            // Check to see if we've already enrolled the user
            const userIdentity = await identityExists(wallet,userId);
            if (userIdentity) {
                msg=`An identity for the user ${userId} already exists in the wallet`;
                return reject(msg);
            }
    
            // Must use an admin to register a new user
            const adminIdentity = await wallet.get(adminUsrName);
            if (!adminIdentity) {
                msg=`An identity for the admin user does not exist in the wallet. Enroll the admin user before retrying`;
                console.log(msg);
                return reject(msg);
            }
    
            // build a user object for authenticating with the CA
            const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
            const adminUser = await provider.getUserContext(adminIdentity, adminUsrName);
    
            // Create a new CA client for interacting with the CA.
            const caInfo = ccp.certificateAuthorities[caDomain];
            const caTLSCACerts = caInfo.tlsCACerts.pem;
            const caClient = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
            
            // Register the user, enroll the user, and import the new identity into the wallet.
            // if affiliation is specified by client, the affiliation value must be configured in CA
            const secret = await caClient.register({
                affiliation: affiliation,
                enrollmentID: userId,
                role: 'client'
            }, adminUser);
            const enrollment = await caClient.enroll({
                enrollmentID: userId,
                enrollmentSecret: secret
            });
            // console.log("=============== user: =====================")
            // console.log("user enrollment: ", enrollment);
            // console.log("user enrollment.certificate: ", enrollment.certificate);
            // console.log("user enrollment.key: ", enrollment.key)
            // console.log("=============== end user: =====================")
            const x509Identity = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: orgMspId,
                type: 'X.509',
            };
            await wallet.put(userId, x509Identity);
            msg=`Successfully registered and enrolled user ${userId} and imported it into the wallet`;
            console.log(msg);
            return resolve(msg);
        
        } catch (error) {
            let msg = `Failed to register user "${userId}" with error: ${error}`;
            console.error(msg);
            reject(msg);
        }
    
    })
    
};
module.exports = {
    enrollAdmin,
    registerAndEnrollUser
};
