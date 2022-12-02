#!/bin/bash

# import common
. common.sh
function setCors() {
    if [ "$ALLOW_ORIGINS" == "" ]; then
        echo "ALLOW_ORIGINS is not set on .env file, using the default values."
        ALLOW_ORIGINS='"http://127.0.0.1:5501","http://127.0.0.1:8080", "http://localhost:3003", "http://127.0.0.1:3003"'
    fi
    set -e
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[$ALLOW_ORIGINS]"
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
    echo "IPFS API CORS headers configured for $ALLOW_ORIGINS"
    echo "IPFS daemon restart required ..."
    ipfs shutdown
    echo "sleeping for 5 seconds"
    sleep 5
    echo "restarting ipfs"
    if [ "LIBP2P_FORCE_PNET" != "1" ]; then
        echo "force private net"
        export LIBP2P_FORCE_PNET=1
    fi
    ipfs daemon &
}
setEnvVars
setCors
