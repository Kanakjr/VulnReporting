#!/bin/bash
set -euo pipefail
DOCKER_NETWORK_NAME="bc_net"

# Ensure this script executes within the subfolder where it is located.
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH
PROJECTPATH=$(cd ..; pwd -P)

function verifyCryptoMaterials() {
    local networkPath="$PROJECTPATH/network"
    if [[ ! -d "$networkPath/crypto-config/ordererOrganizations/" || ! -d "$networkPath/crypto-config/peerOrganizations/" ]]; then
        generateMaterials
    fi
    if [[ ! -f "$networkPath/channel-artifacts/genesis.block" ]]; then
        generateMaterials
    else
        echo "crypto materials exists"
    fi
}
function generateMaterials() {
    echo "generate crypto materials"
    local networkPath="$PROJECTPATH/network"
    cd $networkPath/fabric-config
    ./generate-network-materials.sh
    cd $SCRIPTPATH
}
# Bring up local network
function up() {
    verifyCryptoMaterials
    # create docker network or ignore error if it exists
    docker network create $DOCKER_NETWORK_NAME || true
    declare -a orgs=("orderer" "org1" "org2" "org3" "org4") # ("orderer" "org1" "org2" "org3" "org4")
    for org in "${orgs[@]}"
    do
        ./scripts/org-up.sh $org
        sleep 5
    done
}
# Bring down local network
function down() {
    declare -a orgs=("orderer" "org1" "org2" "org3" "org4") # ("orderer" "org1" "org2" "org3" "org4")
    for org in "${orgs[@]}"
    do
        ./scripts/org-down.sh $org
    done
    # delete docker network
    docker network rm $DOCKER_NETWORK_NAME
}
function printHelp() {
    echo "USAGE: ./manage-local-network.sh mode "
    echo "where mode value is either up or down "
}
# Parse commandline args
if [[ $# -lt 1 ]] ; then
  printHelp
  exit 0
else
  MODE=$1
  shift
fi

if [ "$MODE" == "up" ]; then
    up
elif [ "$MODE" == "down" ]; then
    down
else
    echo "Unknown mode"
    printHelp
    exit 0
fi