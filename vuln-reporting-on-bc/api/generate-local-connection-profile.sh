#!/bin/bash
set -euo pipefail

## A helper script to generate connection profiles for api


# Ensure this script executes within the subfolder where it is located.
SCRIPTSMAINPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTSMAINPATH

PROJECTPARENTPATH=$(cd ../..; pwd -P)
HFNETWORKPATH=$PROJECTPARENTPATH/hf-bc-network
DEPLOYPATH=$HFNETWORKPATH/deploy
DEVPROFILEPATH=$SCRIPTSMAINPATH/data/profiles/dev

# echo "DEVPROFILEPATH: $DEVPROFILEPATH DEPLOYPATH: $DEPLOYPATH"

function generateAndCopyProfileFiles() {
    local deployScriptPath="$DEPLOYPATH/scripts"
    echo "deployScriptPath: $deployScriptPath"
    cd $deployScriptPath
    declare -a orgs=("org1" "org2" "org3" "org4")
    if [ ! -d $DEVPROFILEPATH ]; then
        mkdir -p $DEVPROFILEPATH
    fi
    for org in "${orgs[@]}"
    do
        # generate connection profile file for each org
        ./org-connection-profile.sh $org
        # copy the connection profile file to apis subfolder
        orgprofilepath="$DEPLOYPATH/$org/_connection-profiles/connection-$org.json"
        cp -rf $orgprofilepath $DEVPROFILEPATH

    done
    
    echo "profile files generated ..."
    cd $SCRIPTSMAINPATH
}
generateAndCopyProfileFiles
