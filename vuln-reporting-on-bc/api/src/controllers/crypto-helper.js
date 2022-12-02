'use strict';
const crypto = require("crypto");

const AES_algorithm = "aes-256-cbc";

function generateRSAKeyPair() {
    // The `generateKeyPairSync` method accepts two arguments:
    // 1. The type ok keys we want, which in this case is "rsa"
    // 2. An object with the properties of the key
    // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    //     // The standard secure default length for RSA keys is 2048 bits
    //     modulusLength: 2048,
    // });
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    return { publicKey, privateKey }
}

function RSAEncrypt(data, publicKey) {
    let encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(data)
    );
    // The encrypted data is in the form of bytes, so we print it in base64 format
    // so that it's displayed in a more readable form
    encryptedData = encryptedData.toString("base64")
    // console.log("encypted data: ", cypherText);
    return encryptedData
}

function RSADecrypt(encryptedData, privateKey) {
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            // In order to decrypt the data, we need to specify the
            // same hashing function and padding scheme that we used to
            // encrypt the data in the previous step
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(encryptedData, 'base64')
    );
    // The decrypted data is of the Buffer type, which we can convert to a
    // string to reveal the original data
    // console.log("decrypted data: ", decryptedData.toString());
    return decryptedData.toString()
}

function AESEncrypt(data) {
    // secret key generate 32 bytes of random data
    const securityKey = crypto.randomBytes(32);
    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16);
    // the cipher function
    const cipher = crypto.createCipheriv(AES_algorithm, securityKey, initVector);
    // encrypt the message: input encoding,output encoding
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return [encryptedData, securityKey.toString('base64') + '||' + initVector.toString('base64')]
}

function AESDecrypt(encryptedData, combinedkey) {
    let [securityKey, initVector] = combinedkey.split("||");
    securityKey = Buffer.from(securityKey, "base64");
    initVector = Buffer.from(initVector, "base64");
    // the decipher function
    const decipher = crypto.createDecipheriv(AES_algorithm, securityKey, initVector);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData
}

function hybridEncrypt(data, publicKey) {
    let [encryptedData, combinedkey] = AESEncrypt(data)
    let encryptedkey = RSAEncrypt(combinedkey, publicKey)
    return [encryptedData, encryptedkey]
}

function hybridDecrypt(encryptedData, privateKey, encryptedkey) {
    let combinedkey = RSADecrypt(encryptedkey, privateKey)
    let decryptedData = AESDecrypt(encryptedData, combinedkey)
    return decryptedData
}

module.exports = {
    generateRSAKeyPair,
    RSAEncrypt,
    RSADecrypt,
    AESEncrypt,
    AESDecrypt,
    hybridEncrypt,
    hybridDecrypt
};

//////////// RSA // ////////////////////////////////////
// data = "hello kanak"
// let { publicKey, privateKey } = generateRSAKeyPair()
// console.log("publicKey: ", publicKey);
// console.log("privateKey: ", privateKey);

// cypherText = publicEncrypt(data, publicKey)
// console.log("encrypted data: ", cypherText);
// decryptedData = publicDecrypt(cypherText, privateKey)
// console.log("decrypted data: ", decryptedData);

//////////////// AES ////////////////////////////////////////
// let data = "hello kanak"

// let [encryptedData, combinedkey] = AESEncrypt(data)
// console.log("Encrypted message: " + encryptedData);
// console.log("combinedkey: " + combinedkey);

// let decryptedData = AESDecrypt(encryptedData, combinedkey)
// console.log("Decrypted message: " + decryptedData);

//////////////// Hybrid ////////////////////////////////////////
// let data = "hello kanak"
// let { publicKey, privateKey } = generateRSAKeyPair()

// let [encryptedData, encryptedkey] = hybridEncrypt(data, publicKey)
// console.log("Encrypted message: " + encryptedData);
// console.log("encryptedkey: " + encryptedkey);

// let decryptedData = hybridDecrypt(encryptedData, privateKey, encryptedkey)
// console.log("Decrypted message: " + decryptedData);