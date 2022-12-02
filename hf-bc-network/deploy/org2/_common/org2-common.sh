#!/bin/bash

export CA2_PRIVATE_KEY=$(cd ../../network/crypto-config/peerOrganizations/org2.example.com/ca && ls *_sk)
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_ORG2_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:8051
DOCKER_COMPOSE_FILE=docker-compose-cli-org2.yml
PEER=0
ORG=2
P0HOST=$ORG2_PEER1_HOST
P0PORT=$ORG2_PEER1_PORT
CAHOST=$ORG2_CA_HOST
CAPORT=$ORG2_CA_PORT
PEERPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem
CAPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org2.example.com/ca/ca.org2.example.com-cert.pem
