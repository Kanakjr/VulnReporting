# ensure this script will run on context of the subfolder where it belongs
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH

#setEnvVars - reads .env file and exports ENV vars
function setEnvVars() {
    local envFile=".env"
    if [ ! -f "$envFile" ]; then
        echo "expected file '$envFile' does not exist."
        echo "create an .env as described in the readme file"
        exit 1
    fi
    # Parse .env file
    set -o allexport
    eval $(grep -v '^#' $envFile | sed 's/^/export /')
    set +o allexport
    if [ "$CUSTOM_IPFS_PATH" == "" ]; then
        echo "Refusing to init ipfs with default settings, please set a custom path on the env file"
        echo "Custom path entry should be:"
        echo "CUSTOM_IPFS_PATH=$( cd ..; pwd -P )/.ipfs"
        #append an entry to the env file
        echo "CUSTOM_IPFS_PATH=$( cd ..; pwd -P )/.ipfs" >> .env
        echo "-> Custom path has been added to .env file, review it then retry init-ipfs script"
        exit 1
    fi
    echo "CUSTOM_IPFS_PATH: $CUSTOM_IPFS_PATH"
    export IPFS_PATH=$CUSTOM_IPFS_PATH
    #force private network
    export LIBP2P_FORCE_PNET=1
}