package contracts

import (
	"encoding/json"
	"errors"
	"reflect"
	"vulnreporting/models"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Helper - Implements Helper interface
type Helper struct {
}

//PayloadHelper - Helper object to process Json input
type PayloadHelper struct {
	ReportPayload models.ReportPayload
	PolicyPayload models.PolicyPayload
	RewardPayload models.RewardPayload
}

// getRecordByKey - For a given record key find assocated value if any from the ledger
func (helper *Helper) getRecordByKey(ctx contractapi.TransactionContextInterface, recordKey string) ([]byte, error) {
	valAsbytes, err := ctx.GetStub().GetState(recordKey) // reads from ledger
	return valAsbytes, err
}

// writeRecordToLedger - Write data to ledger
func (helper *Helper) writeRecordToLedger(ctx contractapi.TransactionContextInterface, key string, itemBytes []byte) error {
	// add to the ledger
	return ctx.GetStub().PutState(key, itemBytes)
}

// deleteRecordFromLedger - Delete record from ledger
func (helper *Helper) deleteRecordFromLedger(ctx contractapi.TransactionContextInterface, key string) error {
	// del from ledger
	return ctx.GetStub().DelState(key)
}

// checkRecordExists - For a given key, return true if record exists
func (helper *Helper) checkRecordExists(ctx contractapi.TransactionContextInterface, recordKey string) (bool, error) {
	valAsbytes, err := helper.getRecordByKey(ctx, recordKey) // reads from ledger
	if err != nil {
		return false, err
	} else if valAsbytes == nil {
		return false, nil
	}
	return true, nil
}

// parseAndValidateReportPayload - for a given json input, parse the input and return
// helper object, error if unable to parse json or missing required fields
func (helper *Helper) parseAndValidateReportPayload(args []string) (PayloadHelper, error) {
	payload := models.ReportPayload{}
	parseErr := json.Unmarshal([]byte(args[0]), &payload)
	if parseErr != nil {
		errMsg := "Unable to parse payload. Error: " + parseErr.Error()
		return PayloadHelper{}, errors.New(errMsg)
	}
	if reflect.DeepEqual(models.ReportPayload{}, payload) {
		return PayloadHelper{}, errors.New("empty payload")
	}
	if (reflect.DeepEqual(models.Report{}, payload.Report)) {
		return PayloadHelper{}, errors.New("expecting Report data")
	}
	if payload.Timestamp < 0 {
		return PayloadHelper{}, errors.New("expecting timestamp")
	}

	results := PayloadHelper{ReportPayload: payload}
	return results, nil
}

// parseAndValidatePolicyPayload - for a given json input, parse the input and return
// helper object, error if unable to parse json or missing required fields
func (helper *Helper) parseAndValidatePolicyPayload(args []string) (PayloadHelper, error) {
	payload := models.PolicyPayload{}
	parseErr := json.Unmarshal([]byte(args[0]), &payload)
	if parseErr != nil {
		errMsg := "Unable to parse payload. Error: " + parseErr.Error()
		return PayloadHelper{}, errors.New(errMsg)
	}
	if reflect.DeepEqual(models.PolicyPayload{}, payload) {
		return PayloadHelper{}, errors.New("Empty payload")
	}
	if (reflect.DeepEqual(models.Policy{}, payload.Policy)) {
		return PayloadHelper{}, errors.New("Expecting Policy data")
	}
	if payload.Timestamp < 0 {
		return PayloadHelper{}, errors.New("Expecting Timestamp")
	}

	results := PayloadHelper{PolicyPayload: payload}
	return results, nil
}

// parseAndValidateRewardPayload - for a given json input, parse the input and return
// helper object, error if unable to parse json or missing required fields
func (helper *Helper) parseAndValidateRewardPayload(args []string) (PayloadHelper, error) {
	payload := models.RewardPayload{}
	parseErr := json.Unmarshal([]byte(args[0]), &payload)
	if parseErr != nil {
		errMsg := "Unable to parse payload. Error: " + parseErr.Error()
		return PayloadHelper{}, errors.New(errMsg)
	}
	if reflect.DeepEqual(models.RewardPayload{}, payload) {
		return PayloadHelper{}, errors.New("Empty payload")
	}
	if (reflect.DeepEqual(models.Reward{}, payload.Reward)) {
		return PayloadHelper{}, errors.New("Expecting Reward data")
	}
	if payload.Timestamp < 0 {
		return PayloadHelper{}, errors.New("Expecting Timestamp")
	}

	results := PayloadHelper{RewardPayload: payload}
	return results, nil
}
