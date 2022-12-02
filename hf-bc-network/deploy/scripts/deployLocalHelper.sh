#!/bin/bash
# set -euo pipefail

# install and instantiate chaincode
# if executed without parameters, this script will install
# sample chaincode named marbles02 from hyperledger fabric samples

CHANNEL_NAME="$1"
CC_CHAIN_NAME="$2"
CC_SRC_PATH="$3"
CC_RUNTIME_LANGUAGE="$4"
VERSION="$5"
DELAY="$6"
MAX_RETRY="$7"
VERBOSE="$8"
# Set defaults
: ${CHANNEL_NAME:="commonchannel"}
: ${CC_RUNTIME_LANGUAGE:="golang"}
: ${VERSION:="1"}
: ${DELAY:="5"}
: ${MAX_RETRY:="5"}
: ${VERBOSE:="false"}

if [[ "$CC_CHAIN_NAME" == "" || "$CHANNEL_NAME" == "" || "$CC_SRC_PATH" == "" ]]; then
  echo "required parameters missing"
  echo "CC_CHAIN_NAME: $CC_CHAIN_NAME "
  echo "CHANNEL_NAME: $CHANNEL_NAME "
  echo "CC_SRC_PATH: $CC_SRC_PATH"
  exit 0
fi

PACKAGE_LABEL=${CC_CHAIN_NAME}_${VERSION}

# import utils 
. envVar.sh

packageChaincode() {
  ORG=$1
  setGlobals $ORG
  set -x
  docker exec $PEER_CLI peer lifecycle chaincode package ${CC_CHAIN_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${PACKAGE_LABEL} >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode packaging on peer0.org${ORG} has failed"
  echo "===================== Chaincode is packaged on peer0.org${ORG} ===================== "
  echo
}

# installChaincode PEER ORG
installChaincode() {
  ORG=$1
  setGlobals $ORG
  set -x
  docker exec $PEER_CLI peer lifecycle chaincode install ${CC_CHAIN_NAME}.tar.gz >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode installation on peer0.org${ORG} has failed"
  echo "===================== Chaincode is installed on peer0.org${ORG} ===================== "
  echo
}

# queryInstalled PEER ORG
queryInstalled() {
  ORG=$1
  setGlobals $ORG
  set -x
  docker exec $PEER_CLI peer lifecycle chaincode queryinstalled >&log.txt
  res=$?
  set +x
  cat log.txt
	PACKAGE_ID=$(sed -n "/${PACKAGE_LABEL}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
  verifyResult $res "Query installed on peer0.org${ORG} has failed"
  echo PackageID is ${PACKAGE_ID}
  echo "===================== Query installed successful on peer0.org${ORG} on channel ===================== "
  echo
}

# approveForMyOrg VERSION PEER ORG
approveForMyOrg() {
  ORG=$1
  setGlobals $ORG
  set -x
  # docker exec $PEER_CLI peer lifecycle chaincode approveformyorg -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} --version ${VERSION} --init-required --package-id ${PACKAGE_ID} --sequence ${VERSION} >&log.txt
  docker exec $PEER_CLI peer lifecycle chaincode approveformyorg -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} --version ${VERSION} --package-id ${PACKAGE_ID} --sequence ${VERSION} >&log.txt
  set +x
  cat log.txt
  verifyResult $res "Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME' ===================== "
  echo
}

# checkCommitReadiness VERSION PEER ORG
checkCommitReadiness() {
  ORG=$1
  shift 1
  setGlobals $ORG
  echo "===================== Checking the commit readiness of the chaincode definition on peer0.org${ORG} on channel '$CHANNEL_NAME'... ===================== "
	local rc=1
	local COUNTER=1
	# continue to poll
  # we either get a successful response, or reach MAX RETRY
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
    sleep $DELAY
    echo "Attempting to check the commit readiness of the chaincode definition on peer0.org${ORG} secs"
    set -x
    # docker exec $PEER_CLI peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} --version ${VERSION} --sequence ${VERSION} --output json --init-required >&log.txt
    docker exec $PEER_CLI peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} --version ${VERSION} --sequence ${VERSION} --output json >&log.txt
    res=$?
    set +x
    let rc=0
    for var in "$@"
    do
      grep "$var" log.txt &>/dev/null || let rc=1
    done
		COUNTER=$(expr $COUNTER + 1)
	done
  cat log.txt
  if test $rc -eq 0; then
    echo "===================== Checking the commit readiness of the chaincode definition successful on peer0.org${ORG} on channel '$CHANNEL_NAME' ===================== "
  else
    echo "!!!!!!!!!!!!!!! After $MAX_RETRY attempts, Check commit readiness result on peer0.org${ORG} is INVALID !!!!!!!!!!!!!!!!"
    echo
    exit 1
  fi
}

# commitChaincodeDefinition VERSION PEER ORG (PEER ORG)...
commitChaincodeDefinition() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of docker exec $PEER_CLI peer and org parameters "

  # while 'docker exec cli peer chaincode' command can get the orderer endpoint from the
  # docker exec cli peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  set -x
  # docker exec $PEER_CLI peer lifecycle chaincode commit -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} $PEER_CONN_PARMS --version ${VERSION} --sequence ${VERSION} --init-required >&log.txt
  docker exec $PEER_CLI peer lifecycle chaincode commit -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} $PEER_CONN_PARMS --version ${VERSION} --sequence ${VERSION} >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode definition commit failed on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode definition committed on channel '$CHANNEL_NAME' ===================== "
  echo
}

# queryCommitted ORG
queryCommitted() {
  ORG=$1
  setGlobals $ORG
  EXPECTED_RESULT="Version: ${VERSION}, Sequence: ${VERSION}, Endorsement Plugin: escc, Validation Plugin: vscc"
  echo "===================== Querying chaincode definition on peer0.org${ORG} on channel '$CHANNEL_NAME'... ===================== "
	local rc=1
	local COUNTER=1
	# continue to poll
  # we either get a successful response, or reach MAX RETRY
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
    sleep $DELAY
    echo "Attempting to Query committed status on peer0.org${ORG}, Retry after $DELAY seconds."
    set -x
    docker exec $PEER_CLI peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_CHAIN_NAME} >&log.txt
    res=$?
    set +x
		test $res -eq 0 && VALUE=$(cat log.txt | grep -o '^Version: [0-9], Sequence: [0-9], Endorsement Plugin: escc, Validation Plugin: vscc')
    test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
		COUNTER=$(expr $COUNTER + 1)
	done
  echo
  cat log.txt
  if test $rc -eq 0; then
    echo "===================== Query chaincode definition successful on peer0.org${ORG} on channel '$CHANNEL_NAME' ===================== "
		echo
  else
    echo "!!!!!!!!!!!!!!! After $MAX_RETRY attempts, Query chaincode definition result on peer0.org${ORG} is INVALID !!!!!!!!!!!!!!!!"
    echo
    exit 1
  fi
}
chaincodeInvokeInit() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of docker exec $PEER_CLI peer and org parameters "

  local CC_INVOKE_PARAMS='{"Args":["AddTestRecord","{\"userId\":\"test-123\",\"id\":\"80260aeb-d91e-4f67-894b-54c4ac068e88\"}"]}'

  # while 'docker exec cli peer chaincode' command can get the orderer endpoint from the
  # docker exec cli peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  set -x
  # docker exec $PEER_CLI peer chaincode invoke -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_CHAIN_NAME} $PEER_CONN_PARMS --isInit -c $CC_INVOKE_PARAMS >&log.txt
  docker exec $PEER_CLI peer chaincode invoke -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_CHAIN_NAME} $PEER_CONN_PARMS -c $CC_INVOKE_PARAMS >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Invoke execution on $PEERS failed "
  echo "===================== Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME' ===================== "
  echo
}

function packageAndInstall() {
    for orgNum in 1 2 3 4
      do
          echo "Package the chaincode on org$orgNum cli"
          packageChaincode $orgNum

          ## Install chaincode on peer
          echo "Installing chaincode on peer0.org$orgNum ..."
          installChaincode $orgNum
          echo "Sleep for ${DELAY}"
          sleep $DELAY

          echo "Query whether the chaincode is installed on org$orgNum"
          queryInstalled $orgNum
          
          echo "Sleep for ${DELAY}"
          sleep $DELAY
      done
}
function approvalAndReadinessCheck() {
    for orgNum in 1 2 3 4
      do
          echo "Approve chaincode for org $orgNum"
          approveForMyOrg $orgNum
      done
    echo "Sleep for ${DELAY}"
    sleep $DELAY
    for orgNum in 1 2 3 4
      do
        echo "check whether the chaincode definition is ready to be committed on org $orgNum"
        checkCommitReadiness $orgNum
      done
    echo "Sleep for ${DELAY}"
    sleep $DELAY
    
}
function commitDefinitionAndQuery() {
    commitChaincodeDefinition 1 2 3 4
    for orgNum in 1 2 3 4
      do
        echo "query org $orgNum to see that the definition committed successfully"
        queryCommitted $orgNum
      done
}
function initChaincodeForOrg() {
    for orgNum in 1 2 3 4
    do
      echo "init chaincode on $orgNum"
      chaincodeInvokeInit $orgNum
    done
    
}

# Chaincode deployment phase 1
packageAndInstall

# Chaincode deployment phase 2
approvalAndReadinessCheck

# Chaincode deployment phase 3
commitDefinitionAndQuery

# # ## Init the chaincode
# initChaincodeForOrg