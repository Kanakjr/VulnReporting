#!/bin/bash

# Script to generate network crypto materials
# for Hyperledger fabric 2.2

CHANNEL_NAME=commonchannel
ORDERER_PROFILE=FourOrgsOrdererGenesis # this value is defined in configtx.yaml file proviles section
CHANNEL_PROFILE=FourOrgsChannel # this value is defined in configtx.yaml file proviles section
NETWORK_MEMBER_COUNT=4 # current this network is configured to support 4 members

function cleanup() {
    echo
    echo "Removing any existing channel artifacts ..."
    rm ../channel-artifacts/*.tx
    rm ../channel-artifacts/*.block
    echo "Removing any existing crypto materials ..."
    rm -R ../crypto-config/ordererOrganizations
    rm -R ../crypto-config/peerOrganizations
    echo
}
function generateCryptoConfig() {
    echo "Generating crypto materials ..."
    ../bin/cryptogen generate --config crypto-config.yaml --output=../crypto-config
}
function generateGenesisAndChannelTransaction() {
    echo
    echo "#################################################################"
    echo "#######    Generating Genesis block   ##########"
    echo "#################################################################"
    ../bin/configtxgen -profile $ORDERER_PROFILE -channelID sys-channel -outputBlock ../channel-artifacts/genesis.block
    echo
    echo "#################################################################"
    echo "#######    Generating Channel transaction for '$CHANNEL_NAME' ###"
    echo "#################################################################"
    ../bin/configtxgen -profile $CHANNEL_PROFILE -outputCreateChannelTx ../channel-artifacts/channel.tx -channelID $CHANNEL_NAME
}
function generateAnchorPeerUpdateFiles() {
    local i=1
    local orgName=""
    local anchorFilePath=""
    while [ $i -le $NETWORK_MEMBER_COUNT ]
    do
            orgName=$(echo Org"$i"MSP)
            anchorFilePath=$(echo ../channel-artifacts/"$orgName"anchors.tx)
            echo
            echo "#################################################################"
            echo "#######    Generating anchor peer update for $orgName   ##########"
            echo "#################################################################"
            if [[ "$orgName" != "" && "$anchorFilePath" != "" ]]; then
                ../bin/configtxgen -profile $CHANNEL_PROFILE -outputAnchorPeersUpdate $anchorFilePath -channelID $CHANNEL_NAME -asOrg $orgName
            fi
            echo
            i=$(($i+1))
    done
}

cleanup # delete existing files
generateCryptoConfig # generate genesis block file
generateGenesisAndChannelTransaction # generate default channel transaction
generateAnchorPeerUpdateFiles # anchor peer files