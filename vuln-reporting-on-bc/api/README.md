# api
This module will be used for interacting with IPFS and blockchain network.

### Prerequisites

Install NodeJS version 12

#### Install dependencies
* cd into api folder
* npm install
#### Start Application
* cd into api folder
* Ensure blockchain connection profiles are generated.
    * excecute the bash script `./generate-local-connection-profile.sh`
    * This will generate the following four files in the folder path `api/data/profiles/dev`
        * connection-org1.json
        * connection-org2.json
        * connection-org3.json
        * connection-org4.json
* start application: npm start
* The api will run on port 3003 - http://localhost:3003

#### Usage: 