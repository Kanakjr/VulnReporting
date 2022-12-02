#!/bin/bash
set -euo pipefail

# 
#  Bring up the docker containers for Org as defined in docker-compose file
#  
#

# import common vars
. common.sh

function dockerUp() {
    # 
    if [[ $MYORGPATH != "" && $ORGNAME != "" ]]; then
        # import org specific vars
        . $MYORGPATH/_common/$ORGNAME-common.sh
        echo "Bring up $ORGNAME containers ..."
        docker-compose -f $MYORGPATH/${DOCKER_COMPOSE_FILE} up -d
        
        if [[ $ORGNAME == "orderer" ]]; then
            echo "Sleeping for 15 secs to allow Orderer Rafter cluster to boot up"
            sleep 15
        fi
    fi
    
}
dockerUp