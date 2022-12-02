#!/bin/bash
set -euo pipefail

## Parse commandline args
if [[ $# -lt 1 ]] ; then
  echo "parameters not set, we will use default channel 'commonchannel' and chaincode 'federatedlearning'"
  echo "usage: ./deployChainCode.sh channel-name chaincode-name"
else
  CHANNEL_NAME="$1"
  CC_CHAIN_NAME="$2"
  VERSION="$3"
  shift
fi

## Set defaults
: ${CC_RUNTIME_LANGUAGE:="golang"}
: ${VERSION:="1"}
: ${DELAY:="5"}
: ${MAX_RETRY:="5"}
: ${VERBOSE:="false"}
: ${CHANNEL_NAME:="commonchannel"}
: ${CC_CHAIN_NAME:="vulnreporting"}

CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/$CC_CHAIN_NAME"


./deployLocalHelper.sh $CHANNEL_NAME $CC_CHAIN_NAME $CC_SRC_PATH $CC_RUNTIME_LANGUAGE $VERSION $DELAY $MAX_RETRY $VERBOSE 


