#!/bin/bash



function generateOrgConnectionProfile() {

    if [[ $MYORGPATH != "" && $ORGNAME != "" && $ORGNAME != "orderer" ]]; then
        # import org specific vars
        . $MYORGPATH/_common/$ORGNAME-common.sh
        # import profile generator util
        . ../cp-templates/cprofile-generator-util.sh
        
        PEERPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/$ORGNAME.example.com/tlsca/tlsca.$ORGNAME.example.com-cert.pem
        CAPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/$ORGNAME.example.com/ca/ca.$ORGNAME.example.com-cert.pem

        if [ ! -d "$MYORGPATH/_connection-profiles" ]; then
            echo " make working dir "
            mkdir $MYORGPATH/_connection-profiles
        fi
        echo "$(json_ccp $ORG $P0HOST $P0PORT $CAHOST $CAPORT $PEERPEM $CAPEM)" > $MYORGPATH/_connection-profiles/connection-$ORGNAME.json
        echo "$(yaml_ccp $ORG $P0HOST $P0PORT $CAHOST $CAPORT $PEERPEM $CAPEM)" > $MYORGPATH/_connection-profiles/connection-$ORGNAME.yaml
    fi
}
function printHelp() {
    echo "please provide org id. "
    echo "usage: ./org-connection-profile.sh orgname"
    echo "where orgname is one of org1 org2 org3 org4"
}

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH

# Parse commandline args
if [[ $# -lt 1 ]] ; then
  printHelp
  exit 0
else
  ORGNAME=$1
  shift
fi

export ORGNAME=$ORGNAME
# import common file
. common.sh

# # Parse .env file
set -o allexport
eval $(grep -v '^#' $MYORGPATH/.env | sed 's/^/export /')
set +o allexport

generateOrgConnectionProfile