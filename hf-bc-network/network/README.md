### Network Deployment
1. Ensure Hyperledger Fabric 2.0 prerequisites are installed
    * Install [git](https://git-scm.com/downloads) if not already installed on the target machine
    * Install [curl](https://curl.haxx.se/download.html) if not already installed on the target machine
    * Install Docker and Docker compose. [Docker](https://www.docker.com/get-docker) version 17.06.2-ce or greater is required.
      * Upon installing Docker on linux systems running systemd, complete the following actions:
          1. Make sure the docker daemon is running: sudo systemctl start docker
          2. Make sure docker daemon start on system reboot: sudo systemctl enable docker
          3. Add your user to the docker group: sudo usermod -a -G docker <username>
    * Install [Go](https://golang.org/dl/). version 1.13.x is required.
      * Upon installing go, the following two actions must be completed
          1. Set environment variable GOPATH: export GOPATH=$HOME/go
          2. Extend command search path to include the Go bin directory: export PATH=$PATH:$GOPATH/bin
    * For more details visit [fabric release 2.2 prerequisites page](https://hyperledger-fabric.readthedocs.io/en/release-2.2/prereqs.html)
          
2. Install binaries for Hyperledger Fabric 2.2.5
    * create a working directory
        * mkdir ~/hyperledger-fabric && cd hyperledger-fabric
    * while in working directory, execute the command: 
        * curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.5 1.5.2
            * where parameters (2.2.5 1.5.2) represent in order:
                * fabric version 2.2.5
                * fabric-ca version 1.5.2
            * this command will install required fabric docker images and create a subfolder named "fabric-samples"
            * Learn more about [advanced install options here](https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html)
        * Copy the bin folder to the project folder, for example
            * cp -r ~/hyperledger-fabric/fabric-samples/bin /var/www/apps/sample-app/network
