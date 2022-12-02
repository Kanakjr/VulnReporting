#!/bin/bash

export CA4_PRIVATE_KEY=$(cd ../../network/crypto-config/peerOrganizations/org4.example.com/ca && ls *_sk)
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_ORG4_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt
CORE_PEER_LOCALMSPID="Org4MSP"
CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG4_CA
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp
CORE_PEER_ADDRESS=peer0.org4.example.com:$ORG4_PEER1_PORT
DOCKER_COMPOSE_FILE=docker-compose-cli-org4.yml
PEER=0
ORG=4
P0HOST=$ORG4_PEER1_HOST
P0PORT=$ORG4_PEER1_PORT
CAHOST=$ORG4_CA_HOST
CAPORT=$ORG4_CA_PORT
PEERPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/$ORGNAME.example.com/tlsca/tlsca.$ORGNAME.example.com-cert.pem
CAPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/$ORGNAME.example.com/ca/ca.$ORGNAME.example.com-cert.pem
