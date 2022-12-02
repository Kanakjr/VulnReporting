package contracts

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"
	"vulnreporting/models"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

const (
	DocTypeReport = "report"
)

func (s *SmartContract) FetchReports(ctx contractapi.TransactionContextInterface, queryString string) ([]*models.Report, error) {
	queryhelper := QueryHelper{}
	var ts models.Report
	resultInterface, err := queryhelper.getQueryResultForQueryString(ctx, queryString, ts)
	if results, ok := resultInterface.([]*models.Report); ok {
		return results, nil
	}
	return nil, err
}

////////// Test /////////////

// AddTestRecord - writes a test record to ledger,
// comes in handy when testing whether chaincode has been
// deployed successfully
func (s *SmartContract) AddTestRecord(ctx contractapi.TransactionContextInterface, jsonPayload string) error {
	if jsonPayload == "" {
		jsonPayload = `{"id": "aaaaaava-e719-4cec-8c95-a801273e4468","timestamp": 1582344379}`
	}
	return s.addTestItem(ctx, jsonPayload)
}
func (s *SmartContract) addTestItem(ctx contractapi.TransactionContextInterface, jsonPayload string) error {
	testRecord := models.Common{}
	parseErr := json.Unmarshal([]byte(jsonPayload), &testRecord)
	if parseErr != nil {
		errMsg := "Unable to parse payload. Error: " + parseErr.Error()
		fmt.Printf("Error 1: %v", errMsg)
		return errors.New(errMsg)
	}
	testRecord.DocType = "testrecord"
	itemBytes, err := json.Marshal(testRecord)
	if err != nil {
		return err
	}
	helper := Helper{}
	err = helper.writeRecordToLedger(ctx, testRecord.ID, itemBytes)
	return err
}

//////////////////////////////

////////// New /////////////

// PublishTrainingSettings - Initialize training settings. will be invoked by the
func (s *SmartContract) PublishReport(ctx contractapi.TransactionContextInterface, jsonPayload string) (models.ResponsePayload, error) {

	helper := Helper{}
	args := make([]string, 1)
	args[0] = jsonPayload
	results, err := helper.parseAndValidateReportPayload(args)
	var response = models.ResponsePayload{}
	if err != nil {
		return response, err
	}

	// Only allow 1 recored with given reportID
	reportID := results.ReportPayload.Report.ReportID
	existingRecord, _ := helper.getReportByReportID(ctx, reportID)
	if existingRecord != nil {
		response.Data = existingRecord
		return response, errors.New("we have an existing report record for reportID: " + reportID)
	}

	// Get policy from the ledger and update the disclosure using policy's disclosurePeriod
	policyID := results.ReportPayload.Report.Policy
	policyRecord, _ := helper.getPolicyByPolicyID(ctx, policyID)
	if policyRecord == nil {
		return response, errors.New("we have no existing policy record for policyID: " + policyID)
	}
	var reportTimestamp = results.ReportPayload.Timestamp //results.ReportPayload.Report.Timestamp
	var disclosurePeriod = policyRecord.DisclosurePeriod
	println(fmt.Sprintf("reportTimestamp:: %d", reportTimestamp))
	disclosureon := time.Unix(reportTimestamp, 0)
	disclosureon = disclosureon.AddDate(0, 0, disclosurePeriod) //AddDate(Year, Month, Day)
	results.ReportPayload.Report.Disclosure = disclosureon.Unix()
	////////////////////////////////////////////////////////////

	data, err := s.addReportToLedger(ctx, &results.ReportPayload)
	response.Data = data
	return response, err
}

func (s *SmartContract) addReportToLedger(ctx contractapi.TransactionContextInterface, payload *models.ReportPayload) (models.Report, error) {

	// initialize common properties - timestamp, doctype
	payload.Report.InitCommon(payload.Timestamp, DocTypeReport, payload.UserID)
	// convert to bytes
	metaBytes, err := json.Marshal(payload.Report)
	if err != nil {
		println(fmt.Sprintf("addReportToLedger marshal error %s", err.Error()))
		return models.Report{}, err
	}
	// add record to the ledger
	helper := Helper{}
	err = helper.writeRecordToLedger(ctx, payload.Report.ID, metaBytes)
	if err != nil {
		println(fmt.Sprintf("helper.writeRecordToLedger %s", err.Error()))
	}
	return payload.Report, err
}

func (helper *Helper) getReportByReportID(ctx contractapi.TransactionContextInterface, reportID string) (*models.Report, error) {
	queryString := fmt.Sprintf(`{"selector":{"docType":"%s","reportID":"%s"}}`, DocTypeReport, reportID)
	queryhelper := QueryHelper{}
	var tm models.Report
	fmt.Println("getReportByReportID ...")
	resultInterface, err := queryhelper.getQueryResultForQueryString(ctx, queryString, tm)
	if err != nil {
		fmt.Println("error executing query: " + err.Error())
		return nil, err
	}
	if results, ok := resultInterface.([]*models.Report); ok {
		if results != nil {
			fmt.Println(results[0])
			return results[0], nil
		}
		fmt.Println("no report record found returning ...")
		return nil, nil
	}
	fmt.Println("no query response ...")
	return nil, err
}

func (s *SmartContract) UpdateReport(ctx contractapi.TransactionContextInterface, jsonPayload string) (models.ResponsePayload, error) {

	helper := Helper{}
	args := make([]string, 1)
	args[0] = jsonPayload
	results, err := helper.parseAndValidateReportPayload(args)
	var response = models.ResponsePayload{}
	if err != nil {
		return response, err
	}

	data, err := s.updateReport(ctx, &helper, &results.ReportPayload.Report)
	response.Data = data
	if err != nil {
		return response, err
	}
	return response, err
}

func (s *SmartContract) updateReport(ctx contractapi.TransactionContextInterface, helper *Helper, report *models.Report) (*models.Report, error) {

	existingReport, err := helper.getReportByReportID(ctx, report.ReportID)
	if err != nil {
		fmt.Printf("Error looking up report for reportid '%s' error: '%s' \n", report.ReportID, err.Error())
	}
	// fmt.Printf("Updating report for reportid '%s' with Status: '%s' \n", report.ReportID, report.Status)
	// fmt.Printf("Updating report for reportid '%s' with Description: '%s' \n", report.ReportID, report.Description)
	// fmt.Printf("Updating report for reportid '%s' with DocumentHash: '%s' \n", report.ReportID, report.DocumentHash)

	// update report Status
	if report.Status != "" {
		existingReport.Status = report.Status
	}
	// update report Description
	if report.Description != "" {
		existingReport.Description = report.Description
	}
	// update report Description
	if report.Policy != "" {
		existingReport.Policy = report.Policy
	}
	// update report DocumentHash
	if report.DocumentHash != "" {
		existingReport.DocumentHash = report.DocumentHash
	}

	bytes, err := json.Marshal(existingReport)
	if err != nil {
		return existingReport, err
	}
	err = helper.writeRecordToLedger(ctx, existingReport.ID, bytes)
	if err != nil {
		fmt.Printf("error updating report with reportid '%s' ...", existingReport.ReportID)
		return existingReport, err
	}
	return existingReport, nil
}

// func (s *SmartContract) isTestShim(ctx contractapi.TransactionContextInterface) bool {
// 	typeOfStub := reflect.TypeOf(ctx.GetStub()).String()
// 	isTest := strings.Contains(typeOfStub, "shim.MockStub") || strings.Contains(typeOfStub, "*shimtest.MockStub")
// 	return isTest
// }

////////// Legacy /////////////

// InitLedger adds a base set of assets to the ledger
// func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
// 	assets := []models.Report{
// 		{ReportID: "report1", Name: "Apache Log4j vulnerable to RCE", Owner: "User1", DocumentHash: "some-hash-1234"},
// 		{ReportID: "report2", Name: "ProxyLogon affect Microsoft Exchange email servers", Owner: "User4", DocumentHash: "some-hash-4444"},
// 	}

// 	for _, asset := range assets {
// 		assetJSON, err := json.Marshal(asset)
// 		if err != nil {
// 			return err
// 		}

// 		err = ctx.GetStub().PutState(asset.ReportID, assetJSON)
// 		if err != nil {
// 			return fmt.Errorf("failed to put to world state. %v", err)
// 		}
// 	}

// 	return nil
// }

// // CreateReport issues a new asset to the world state with given details.
// func (s *SmartContract) CreateReport(ctx contractapi.TransactionContextInterface, id string, name string, owner string, documenthash string) error {
// 	exists, err := s.ReportExists(ctx, id)
// 	if err != nil {
// 		return err
// 	}
// 	if exists {
// 		return fmt.Errorf("the asset %s already exists", id)
// 	}

// 	asset := models.Report{
// 		ReportID:     id,
// 		Name:         name,
// 		Owner:        owner,
// 		DocumentHash: documenthash,
// 	}

// 	assetJSON, err := json.Marshal(asset)
// 	if err != nil {
// 		return err
// 	}

// 	return ctx.GetStub().PutState(id, assetJSON)
// }

// // ReadReport returns the asset stored in the world state with given id.
// func (s *SmartContract) ReadReport(ctx contractapi.TransactionContextInterface, id string) (*models.Report, error) {
// 	assetJSON, err := ctx.GetStub().GetState(id)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to read from world state: %v", err)
// 	}
// 	if assetJSON == nil {
// 		return nil, fmt.Errorf("the report %s does not exist", id)
// 	}

// 	var asset models.Report
// 	err = json.Unmarshal(assetJSON, &asset)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &asset, nil
// }

// // UpdateReport updates an existing asset in the world state with provided parameters.
// func (s *SmartContract) UpdateReport(ctx contractapi.TransactionContextInterface, id string, name string, owner string, documenthash string) error {
// 	exists, err := s.ReportExists(ctx, id)
// 	if err != nil {
// 		return err
// 	}
// 	if !exists {
// 		return fmt.Errorf("the report %s does not exist", id)
// 	}

// 	// overwriting original asset with new asset
// 	asset := models.Report{
// 		ReportID:     id,
// 		Name:         name,
// 		Owner:        owner,
// 		DocumentHash: documenthash,
// 	}

// 	assetJSON, err := json.Marshal(asset)
// 	if err != nil {
// 		return err
// 	}

// 	return ctx.GetStub().PutState(id, assetJSON)
// }

// // DeleteReport deletes an given asset from the world state.
// func (s *SmartContract) DeleteReport(ctx contractapi.TransactionContextInterface, id string) error {
// 	exists, err := s.ReportExists(ctx, id)
// 	if err != nil {
// 		return err
// 	}
// 	if !exists {
// 		return fmt.Errorf("the asset %s does not exist", id)
// 	}

// 	return ctx.GetStub().DelState(id)
// }

// // ReportExists returns true when asset with given ID exists in world state
// func (s *SmartContract) ReportExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
// 	assetJSON, err := ctx.GetStub().GetState(id)
// 	if err != nil {
// 		return false, fmt.Errorf("failed to read from world state: %v", err)
// 	}

// 	return assetJSON != nil, nil
// }

// // TransferReport updates the owner field of asset with given id in world state.
// func (s *SmartContract) TransferReport(ctx contractapi.TransactionContextInterface, id string, newOwner string) error {
// 	asset, err := s.ReadReport(ctx, id)
// 	if err != nil {
// 		return err
// 	}

// 	asset.Owner = newOwner
// 	assetJSON, err := json.Marshal(asset)
// 	if err != nil {
// 		return err
// 	}

// 	return ctx.GetStub().PutState(id, assetJSON)
// }

// // GetAllReports returns all assets found in world state
// func (s *SmartContract) GetAllReports(ctx contractapi.TransactionContextInterface) ([]*models.Report, error) {
// 	// range query with empty string for startKey and endKey does an
// 	// open-ended query of all assets in the chaincode namespace.
// 	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer resultsIterator.Close()

// 	var assets []*models.Report
// 	for resultsIterator.HasNext() {
// 		queryResponse, err := resultsIterator.Next()
// 		if err != nil {
// 			return nil, err
// 		}

// 		var asset models.Report
// 		err = json.Unmarshal(queryResponse.Value, &asset)
// 		if err != nil {
// 			return nil, err
// 		}
// 		assets = append(assets, &asset)
// 	}

// 	return assets, nil
// }

////////////////////
