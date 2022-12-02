package models

import (
	"encoding/json"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)

type Policy struct {
	Common                   // inherits properties defined in common.go file
	PolicyID          string `json:"policyID"`          // Unique Policy identifier
	Name              string `json:"name"`              // Name (For readability)
	Owner             string `json:"owner"`             // Policy owner ID
	Product           string `json:"product"`           // Product Name
	Scope             string `json:"scope"`             // Domains in range comma seperated Ex: maps.google.com
	AttackTypeAllowed string `json:"attackTypeAllowed"` // Nature of attack allowed
	Description       string `json:"description"`       // Description
	DisclosurePeriod  int    `json:"disclosurePeriod"`  // Disclosure Period (in Days)
	Reward            int    `json:"reward"`            // Reward Amount
	Priority          int    `json:"priority"`          // P0-P5 - Critical/High/Med/Low/NE - https://bugcrowd.com/vulnerability-rating-taxonomy
	PublicKey         string `json:"publicKey"`         // Public key for Hybrid encryption
}

// IterateQueryResults - implements QueryResults interface method
func (ts *Policy) IterateQueryResults(resultsIterator shim.StateQueryIteratorInterface) ([]*Policy, error) {
	var results []*Policy
	for resultsIterator.HasNext() {
		queryResult, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		var asset Policy
		err = json.Unmarshal(queryResult.Value, &asset)
		if err != nil {
			return nil, err
		}
		results = append(results, &asset)
	}
	return results, nil
}
