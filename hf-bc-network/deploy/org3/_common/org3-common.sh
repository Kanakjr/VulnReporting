#!/bin/bash

export CA3_PRIVATE_KEY=$(cd ../../network/crypto-config/peerOrganizations/org3.example.com/ca && ls *_sk)
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_ORG3_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
CORE_PEER_LOCALMSPID="Org3MSP"
CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
CORE_PEER_ADDRESS=peer0.org3.example.com:9051
DOCKER_COMPOSE_FILE=docker-compose-cli-org3.yml
PEER=0
ORG=3
P0HOST=$ORG3_PEER1_HOST
P0PORT=$ORG3_PEER1_PORT
CAHOST=$ORG3_CA_HOST
CAPORT=$ORG3_CA_PORT
PEERPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org3.example.com/tlsca/tlsca.org3.example.com-cert.pem
CAPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org3.example.com/ca/ca.org3.example.com-cert.pem

