package main

import (
	"log"
	"vulnreporting/contracts"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// // SmartContract provides functions for managing an Asset
// type SmartContract struct {
// 	contractapi.Contract
// }

func main() {
	assetChaincode, err := contractapi.NewChaincode(&contracts.SmartContract{})
	if err != nil {
		log.Panicf("Error creating asset-transfer-basic chaincode: %v", err)
	}

	if err := assetChaincode.Start(); err != nil {
		log.Panicf("Error starting asset-transfer-basic chaincode: %v", err)
	}
}
