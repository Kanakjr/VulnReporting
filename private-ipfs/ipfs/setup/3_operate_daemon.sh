#!/bin/bash

# import common
. common.sh
function startDaemon() {
    if [ "LIBP2P_FORCE_PNET" != "1" ]; then
        echo "force private net"
        export LIBP2P_FORCE_PNET=1
    fi
    ipfs daemon &
}
function stopDaemon() {
    if [ "LIBP2P_FORCE_PNET" != "1" ]; then
        export LIBP2P_FORCE_PNET=1
    fi
    ipfs shutdown
}
function printHelp() {
    local msg=$1
    echo 
    echo "Usage ./3_operate_daemon.sh mode"
    echo "Where mode is one of: "
    echo "start"
    echo "stop"
    echo
}
mode=$1
shift
if [ "$mode" == "" ]; then
    # echo 
    printHelp "Operating mode missing"
    exit 1
else
    if [ "$mode" == "mode" ]; then
        echo "value $mode not valid"
        exit 1
    fi
    if [ "$mode" == "start" ]; then
        echo "Operating Mode: $mode"
        setEnvVars
        startDaemon
        exit 0
    fi
    if [ "$mode" == "stop" ]; then
        echo "Operating Mode: $mode"
        setEnvVars
        stopDaemon
        exit 0
    else
        printHelp
    fi

fi
