#!/bin/bash

## A helper script to get latest chaincode deployed.
# This script will:
# 1. stop blockchain network if already running
# 2. copy the latest chaincode project files to destination path
# 3. start the blockchain network
# 4. deploy the chaincode

# TODO: We will need some updates to scripts to support chaincode version upgrades


# Ensure this script executes within the subfolder where it is located.
CHAINCODEMAINPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $CHAINCODEMAINPATH

PROJECTPARENTPATH=$(cd ../..; pwd -P)
HFNETWORKPATH=$PROJECTPARENTPATH/hf-bc-network
DEPLOYPATH=$HFNETWORKPATH/deploy
CHAINCODE_NAME="vulnreporting"
CHAINCODE_PATH="$CHAINCODEMAINPATH/$CHAINCODE_NAME"

function copyChaincode() {
    if [ ! -d "$CHAINCODE_PATH" ]; then
        echo "project chaincode directory not found."
        exit 0
    fi
    # bring down the network if running
    getnetwork down
    cd $CHAINCODEMAINPATH
    local destination="$HFNETWORKPATH/chaincode"
    # remove specified chaincode folder in
    # destination path and proceed if missing
    rm -rf $destination/$CHAINCODE_NAME || true
    # copy latest chaincode to destination
    cp -R $CHAINCODE_PATH $destination
}
function getnetwork() {
    cd $DEPLOYPATH
    ./manage-local-network.sh $1
}

function triggerDeployment() {
    cd $DEPLOYPATH
    getnetwork up
    cd scripts
    echo "trigger chaincode deployment"
    ./deployLocalchaincode.sh
    echo "we are done ..."
    cd $CHAINCODEMAINPATH
}

## copy chaincode files to destination
copyChaincode

## trigger deployment to local hyperledger nodes
triggerDeployment