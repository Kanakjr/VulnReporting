#!/bin/bash
export CA1_PRIVATE_KEY=$(cd ../../network/crypto-config/peerOrganizations/org1.example.com/ca && ls *_sk)
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_ORG1_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
PEER=0
ORG=1
DOCKER_COMPOSE_FILE=docker-compose-cli-org1.yml
PEER_CONN_PARMS="--peerAddresses ${CORE_PEER_ADDRESS} --tlsRootCertFiles ${PEER0_ORG1_CA}"
P0HOST=$ORG1_PEER1_HOST
P0PORT=$ORG1_PEER1_PORT
CAHOST=$ORG1_CA_HOST
CAPORT=$ORG1_CA_PORT
PEERPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem
CAPEM=$NETWORK_HOME_FOLDER/crypto-config/peerOrganizations/org1.example.com/ca/ca.org1.example.com-cert.pem

