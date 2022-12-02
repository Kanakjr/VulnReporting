# Chaincode

### Folder Structure:
* vulnreporting
    * This will contain the vulnreporting chaincode to be deployed to hyperledger fabric

### Go Module Tips:
* To create a new module use go mod init for example `go mod init your-module-name-here`
* To update dependencies use `go mod tidy` and `go mod vendor`

### Deploying Chaincode
* To deploy the chaincode to your local blockchain network execute bash script `./deploy-chaincode-to-local.sh`
* The script will:
  * stop blockchain network if already running
  * copy the latest chaincode project files to destination path
  * start the blockchain network
  * deploy the chaincode