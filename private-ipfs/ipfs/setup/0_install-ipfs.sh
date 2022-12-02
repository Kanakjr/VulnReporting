#!/bin/bash

# ensure this script will run on the context of the subfolder where it belongs
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH
# Downloads and install ipfs
function downloadAndInstall() {
    curl $BINARY_URL -o $BINARY_NAME
    tar -xvzf $BINARY_NAME
    cd go-ipfs
    bash install.sh
    #check install 
    ipfs --version
    # clean up the downloaded tar file
    rm $BINARY_NAME
}
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    BINARY_URL=https://github.com/ipfs/go-ipfs/releases/download/v0.5.0/go-ipfs_v0.5.0_linux-amd64.tar.gz
    BINARY_NAME=go-ipfs_v0.5.0_linux-amd64.tar.gz
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    BINARY_URL=https://dist.ipfs.io/go-ipfs/v0.5.0/go-ipfs_v0.5.0_darwin-amd64.tar.gz
    BINARY_NAME=go-ipfs_v0.5.0_darwin-amd64.tar.gz
else
    echo "expecting linux or mac; got '$OSTYPE'."
    exit 1
fi
# exit on error
set -e
downloadAndInstall
