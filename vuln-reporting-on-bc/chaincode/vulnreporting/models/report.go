package models

import (
	"encoding/json"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)

type Report struct {
	Common              // inherits properties defined in common.go file
	ReportID     string `json:"reportID"`     // Unique Report identifier
	Name         string `json:"name"`         // Name (For readability and listing)
	Owner        string `json:"owner"`        // Report owner ID
	DocumentHash string `json:"documentHash"` // IPFS Hash of the uploaded document
	DocumentKey  string `json:"documentKey"`  // Encrypted key for Hybrid encryption
	Disclosure   int64  `json:"disclosure"`   // Disclosure Date in timestamp format, calculated: currtime + DisclosurePeriod
	Policy       string `json:"policy"`       // Associated policy ID - Binds Policy Object
	Description  string `json:"description"`  // Description
	Status       string `json:"status"`       // Latest status (New,Closed,Invalid,Duplicate,OutofScope,etc)
	Reference    string `json:"reference"`    // References
	Severity
}

type Severity struct {
	CVSS      string `json:"cvss"`      // Example: "CVSSv3 String"
	CVSSScore int    `json:"cvssscore"` // Severity score 1-10 for CVSSv3
	CWE       string `json:"cwe"`       // https://cwe.mitre.org/
}

// IterateQueryResults - implements QueryResults interface method
func (ts *Report) IterateQueryResults(resultsIterator shim.StateQueryIteratorInterface) ([]*Report, error) {
	var results []*Report
	for resultsIterator.HasNext() {
		queryResult, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		var asset Report
		err = json.Unmarshal(queryResult.Value, &asset)
		if err != nil {
			return nil, err
		}
		results = append(results, &asset)
	}
	return results, nil
}
