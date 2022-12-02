#!/bin/bash


# import common
. common.sh

function generatePrivateSwarmKey() {
    echo "go get a library to generate the swarm key"
    go get -u github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen
    # go install -u github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen
    # local ROOT_IPFS_PATH="$( cd ..; pwd -P )"
    if [ ! -d "$CUSTOM_IPFS_PATH" ]; then
        # create working directory
        mkdir $CUSTOM_IPFS_PATH
    fi
    local SWARM_KEY_FILE=$CUSTOM_IPFS_PATH/swarm.key
    echo "generate a swarm key, this is needed for private IPFS to work"
    #$GOPATH/bin/ipfs-swarm-key-gen > $SWARM_KEY_FILE
    if [ ! -f "$SWARM_KEY_FILE" ]; then
        echo "unable to generate swarm.key file. private IPFS can't be configured without this file."
        exit 1
    fi
}
function initIpfs() {
    # Initialize ipfs on specified path.
    ipfs init
    #VERY IMPORTANT:  Remove the public bootstraps.  
    #IPFS setup should remain private
    ipfs bootstrap rm --all
    #set private bootstrap
    peerInfo=$(ipfs id)
    peerId=$(getPeerInfo  '.ID')
    if [ "$PRIVATE_BOOTSTRAP_IP" == "" ]; then
        PRIVATE_BOOTSTRAP_IP=127.0.0.1 #default to localhost
    fi
    if [ "$PRIVATE_BOOTSTRAP_PEER_ID" == "" ]; then
        PRIVATE_BOOTSTRAP_PEER_ID=$peerId #default to the newly added peer id
    fi
    echo "PRIVATE_BOOTSTRAP_IP=$PRIVATE_BOOTSTRAP_IP"
    ipfs bootstrap add /ip4/$PRIVATE_BOOTSTRAP_IP/tcp/4401/ipfs/$PRIVATE_BOOTSTRAP_PEER_ID
    #ipfs bootstrap list
}
function addUtilityUIToIpfs() {
    # navigate back to parent folder
    local ROOT_IPFS_PATH="$( cd ..; pwd -P )"
    
    # Add the IPFS webui, useful to verify the instance is working okay and can view the files/folders added
    # Unless the utility-ui content has changed, the expected hash should be 
    # Qma3H1mV9eShPSzbL74WwUFTJes8YN517JizdetSGrMZR3
    
    ipfs add -r $ROOT_IPFS_PATH/utility-ui
    echo "utility-ui folder added to ipfs."
    echo "Utility ui URL: http://127.0.0.1:8080/ipfs/Qma3H1mV9eShPSzbL74WwUFTJes8YN517JizdetSGrMZR3"
    
    echo "start the ipfs daemon"
    if [ "LIBP2P_FORCE_PNET" != "1" ]; then
        echo "force private net"
        export LIBP2P_FORCE_PNET=1
    fi
    # Start the ipfs daemon in the background
    ipfs daemon &
  
}

#given a json input, return value of specified attribute
function getPeerInfo() {
    echo ${peerInfo} | jq -r ${1}
}

setEnvVars
generatePrivateSwarmKey
initIpfs
addUtilityUIToIpfs
echo "sleep for 5 secs"
sleep 5
# configure cors - will ensure the utility ui will work properly
. 2_config-cors.sh 


