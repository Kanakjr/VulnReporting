package models

import (
	"encoding/json"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)

type Reward struct {
	Common              // inherits properties defined in common.go file
	RewardID    string  `json:"rewardID"`
	Amount      float64 `json:"amount"`      // Amount can be -ve
	Issuer      string  `json:"issuer"`      // identify the ReportOwner
	ReportOwner string  `json:"reportOwner"` // identify the ReportOwner
}

// IterateQueryResults - implements QueryResults interface method
func (ts *Reward) IterateQueryResults(resultsIterator shim.StateQueryIteratorInterface) ([]*Reward, error) {
	var results []*Reward
	for resultsIterator.HasNext() {
		queryResult, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		var asset Reward
		err = json.Unmarshal(queryResult.Value, &asset)
		if err != nil {
			return nil, err
		}
		results = append(results, &asset)
	}
	return results, nil
}
