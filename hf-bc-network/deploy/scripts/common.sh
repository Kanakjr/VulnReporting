
. util.sh

verifyResult() {
  if [ $1 -ne 0 ]; then
    echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
    echo
    exit 1
  fi
}
printHelp () {
    echo "USAGE: org-up.sh orgName"
    echo "where orgName is in the format such as org1, org2, org3, etc"
}


DEPLOYPATH=$(cd ..; pwd -P)
PROJECTPATH=$(cd ../..; pwd -P)
#set the org path based on parameters passed
MYORGPATH=$DEPLOYPATH/$ORGNAME

CHANNEL_NAME=commonchannel
DELAY=5
COUNTER=1
MAX_RETRY=10
CORE_PEER_TLS_ENABLED=true
CC_VERSION=1
CC_LANGUAGE=golang
CC_SRC_PATH="github.com/chaincode/vulnreporting"
CC_CHAIN_NAME=vulnreporting
PUASE=5

export IMAGE_TAG=2.2.5
export CA_IMAGE_TAG=1.5.2
export SYS_CHANNEL=sys-channel
export PROJECT_NAME=bcproject
export NETWORK_NAME=bc_net
export CORE_PEER_TLS_ENABLED=true
export NETWORK_HOME_FOLDER=$PROJECTPATH/network
export ORG1_COUCHDB_PORT=5984
export ORG1_PEER1_PORT=7051
export ORG1_CA_PORT=8054
export ORG2_COUCHDB_PORT=6984
export ORG2_PEER1_PORT=8051
export ORG2_CA_PORT=9054
export ORG3_PEER1_PORT=9051
export ORG3_COUCHDB_PORT=7984
export ORG3_CA_PORT=10054
export ORG4_PEER1_PORT=10051
export ORG4_COUCHDB_PORT=8984
export ORG4_CA_PORT=11054
# operations ports
export ORG1_OPS_PORT=9443
export ORG2_OPS_PORT=9445
export ORG3_OPS_PORT=9447
export ORG4_OPS_PORT=9449
export ORDERER1_OPS_PORT=9450
export ORDERER2_OPS_PORT=9451
export ORDERER3_OPS_PORT=9452
