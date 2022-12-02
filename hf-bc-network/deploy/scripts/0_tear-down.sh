#!/bin/bash
set -euo pipefail

# 
#  Brings down existing network
# 

# import common vars
. common.sh

# Tear down running network
function networkDown() {

  if [[ $MYORGPATH != "" && $ORGNAME != "" ]]; then
    # import org specific vars
    . $MYORGPATH/_common/$ORGNAME-common.sh
    echo "Bring down $ORGNAME containers ..."
    if [ DOCKER_COMPOSE_FILE == "" ]; then
      echo "Missing Docker Compose File for $ORGNAME."
      exit 1
    fi
    docker-compose -f $MYORGPATH/$DOCKER_COMPOSE_FILE down --volumes --remove-orphans
    # #Cleanup the containers
    clearContainers
    # #Cleanup images
    removeUnwantedImages
  fi
}

# Obtain CONTAINER_IDS and remove them
# This function is called when you bring a network down
function clearContainers() {
  infoln "Removing remaining containers"
  local nameFilter=""
  if [ "$ORGNAME" == "orderer" ]; then
     nameFilter='orderer.*'
  else
    nameFilter=$(echo 'dev-peer*.'$ORGNAME'*')
  fi
  docker rm -f $(docker ps -aq --filter label=service=hyperledger-fabric) 2>/dev/null || true
  docker rm -f $(docker ps -aq --filter name=$nameFilter) 2>/dev/null || true
}

# Delete any images that were generated as a part of this setup
# specifically the following images are often left behind:
# This function is called when you bring the network down
function removeUnwantedImages() {
  infoln "Removing generated chaincode docker images"
  local nameFilter=""
  if [ "$ORGNAME" == "orderer" ]; then
     nameFilter='orderer.*'
  else
    nameFilter=$(echo 'dev-peer*.'$ORGNAME'*')
  fi
  docker image rm -f $(docker images -aq --filter reference=$nameFilter) 2>/dev/null || true
}
networkDown