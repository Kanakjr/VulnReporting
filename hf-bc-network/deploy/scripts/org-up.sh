#!/bin/bash
set -euo pipefail

# 
#  This is the main script to start up the network.
#  NOTE: Existing containers are removed first.
#

# Ensure this script executes within the subfolder where it is located.

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

echo "*********************************************"
echo " $ORGNAME - executing 0_tear-down.sh script  "
echo "*********************************************"
./0_tear-down.sh

echo "*********************************************"
echo " $ORGNAME - executing 1_start-up.sh script   "
echo "*********************************************"
./1_start-up.sh

if [[ $ORGNAME != "orderer" ]]; then
    echo "************************************************************"
    echo " $ORGNAME - executing 2_create-and-join-channel.sh script   "
    echo "************************************************************"
    ./2_create-and-join-channel.sh
fi
