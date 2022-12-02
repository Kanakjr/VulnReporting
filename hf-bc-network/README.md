# hf-bc-network
Hyperledger Fabric Blockchain Network
  
This is an implementation of Hyperledger Fabric 2.2 consisting of 4 organizations.

### Structure:
* chaincode
    * This is a placeholder folder. The code that will be running on the network will be deployed in this path
    * Ensure to copy the desired project folder into this location
* deploy
    * This will contain the docker compose yaml and related bash script files for each node
        * Orderer  - This is a required system node
        * Org1
        * Org2
        * Org3
        * Org4
    * While in deploy subfolder you can start or stop network's docker containers:
        * stop: ./manage-local-network.sh down
        * start: ./manage-local-network.sh up
    * And after starting the network you can deploy chaincode using the command:
        * cd deploy/scripts
        * ./deployChainCode.sh

* network
    * This will contain the network setup yaml and related bash script files.
    