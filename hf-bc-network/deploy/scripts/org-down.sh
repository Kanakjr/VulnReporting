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

# Parse .env file
set -o allexport
eval $(grep -v '^#' $MYORGPATH/.env | sed 's/^/export /')
set +o allexport

./0_tear-down.sh
