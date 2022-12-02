const fs = require('fs');
const path = require('path');


exports.createWallet = async (Wallets, useFileSystem) => {
	// Creates a new  wallet that will be utilized for managing identities.
	let wallet;
	const walletPath = path.join(process.cwd(), 'data', 'userwallets');
	if (useFileSystem && walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};
exports.identityExists = async(wallet,userId) => {
    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(userId);
    if (identity) {
        console.log(`An identity for the ${userId} already exists in the wallet`);
        return true;
    }
    return false;
}