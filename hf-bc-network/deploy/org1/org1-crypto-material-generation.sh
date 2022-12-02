#!/bin/bash

# 
#  A helper script to trigger cyrpto material generation.  This script file 
#  is referenced in org1-initiate-network.sh and has dependency on environment variables defined in .env file.
#  
#

PUASE=5
# Parse .env file
set -o allexport
eval $(grep -v '^#' .env | sed 's/^/export /')
set +o allexport

if test $GENERATE_MATERIAL -eq 1; then
    
    # current org1 working folder
    org1Path=$PWD
    
    # switch working folder to fabric-config
    cd ../../network/fabric-config/
    fabconfigPath=$PWD
    echo " fabric config path $fabconfigPath"
    
    echo "*********************************************************************"
    echo "*   executing fabric-config/generate-network-materials.sh script    *"
    echo "*********************************************************************"
    ./generate-network-materials.sh
    echo "Sleeping for $PUASE seconds "
    sleep $PUASE

    if test $IS_PROD -eq 1; then

        # copy bin to orderer
        echo "copy bin to orderer"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/bin  $ORDERER_SERVER_HOST:$NETWORK_HOME_FOLDER/
        # copy bin to org2
        echo "copy bin to org2"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/bin  $ORG_2_SERVER_HOST:$NETWORK_HOME_FOLDER/
        # copy bin to org3
        echo "copy bin to org3"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/bin  $ORG_3_SERVER_HOST:$NETWORK_HOME_FOLDER/

        # copy orderer crypto materials
        echo "copy crypto materials to orderer"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/crypto-config/ordererOrganizations  $ORDERER_SERVER_HOST:$NETWORK_HOME_FOLDER/crypto-config
        echo "copy channel-artifacts to orderer"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/channel-artifacts/channel.tx $ORDERER_SERVER_HOST:$NETWORK_HOME_FOLDER/channel-artifacts
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/channel-artifacts/genesis.block  $ORDERER_SERVER_HOST:$NETWORK_HOME_FOLDER/channel-artifacts
        
        # copy crypto-config to org2
        echo "copy crypto materials to org2"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org2.example.com  $ORG_2_SERVER_HOST:$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/crypto-config/ordererOrganizations  $ORG_2_SERVER_HOST:$NETWORK_HOME_FOLDER/crypto-config
        echo "copy channel-artifacts to org2"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/channel-artifacts/Org2MSPanchors.tx  $ORG_2_SERVER_HOST:$NETWORK_HOME_FOLDER/channel-artifacts
        
        # copy crypto-config to org3
        echo "copy crypto materials to org3"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org3.example.com  $ORG_3_SERVER_HOST:$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/crypto-config/ordererOrganizations  $ORG_3_SERVER_HOST:$NETWORK_HOME_FOLDER/crypto-config
        echo "copy channel-artifacts to org3"
        scp -r -i $SSH_KEY_PATH $NETWORK_HOME_FOLDER/channel-artifacts/Org3MSPanchors.tx  $ORG_3_SERVER_HOST:$NETWORK_HOME_FOLDER/channel-artifacts
    else
        echo "is local, skipping copying material"
    fi
    # switch back to org1 working folder
    cd $org1Path
else 
     echo "skipping material generation ..."   
fi