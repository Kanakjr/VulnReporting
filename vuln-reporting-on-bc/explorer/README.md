# Quick start (using Docker)

## Prerequisites
* Docker
* Docker Compose

## Start Hyperledger Fabric network
This guide assumes that you've already started the hf-bc network

## Configure

* Copy entire crypto artifact directory (organizations/) from your hf-bc-network network ( hf-bc-network/network/crypto-config)
* Update ./connection-profile/test-network.json to align with your environment this includes updating `adminCredential` and `peers` configuration
* When you connect Explorer to your fabric network through the bridge network, you need to set `DISCOVERY_AS_LOCALHOST` to `false` in docker-compose.yaml for disabling hostname mapping into localhost.

## Start container services

* Run the following to start up explore and explorer-db services after starting your fabric network:

    ```shell
    $ docker-compose up -d
    ```

## Clean up

* To stop services without removing persistent data, run the following:

    ```shell
    $ docker-compose down
    ```

* In the docker-compose.yaml, two named volumes are allocated for persistent data (for Postgres data and user wallet). If you would like to clear these named volumes up, run the following:

    ```shell
    $ docker-compose down -v
    ```
 


