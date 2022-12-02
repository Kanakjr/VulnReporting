package contracts

import (
	"errors"
	"vulnreporting/models"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Query-Helper - Implements Helper interface
type QueryHelper struct {
}

// QueryResults - an interface to be implemented by each data object that we need to query
type QueryResults interface {
	IterateQueryResults(resultsIterator shim.StateQueryIteratorInterface)
}

// getQueryResultForQueryString executes the passed in query string.
// The result set is built and returned as a byte array containing the JSON results.
func (queryhelper *QueryHelper) getQueryResultForQueryString(ctx contractapi.TransactionContextInterface, queryString string, qr interface{}) (interface{}, error) {
	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	if repm, ok := qr.(models.Report); ok {
		return repm.IterateQueryResults(resultsIterator)
	}

	if pm, ok := qr.(models.Policy); ok {
		return pm.IterateQueryResults(resultsIterator)
	}

	if rewm, ok := qr.(models.Reward); ok {
		return rewm.IterateQueryResults(resultsIterator)
	}

	return nil, errors.New("unsupported interface type")
}
