package contracts

import (
	"encoding/json"
	"errors"
	"fmt"
	"vulnreporting/models"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

const (
	DocTypePolicy = "policy"
)

func (s *SmartContract) FetchPolicy(ctx contractapi.TransactionContextInterface, queryString string) ([]*models.Policy, error) {
	queryhelper := QueryHelper{}
	var ts models.Policy
	resultInterface, err := queryhelper.getQueryResultForQueryString(ctx, queryString, ts)
	if results, ok := resultInterface.([]*models.Policy); ok {
		return results, nil
	}
	return nil, err
}

func (helper *Helper) getPolicyByPolicyID(ctx contractapi.TransactionContextInterface, policyID string) (*models.Policy, error) {
	queryString := fmt.Sprintf(`{"selector":{"docType":"%s","policyID":"%s"}}`, DocTypePolicy, policyID)
	queryhelper := QueryHelper{}
	var tm models.Policy
	fmt.Println("getPolicyBypolicyID ...")
	resultInterface, err := queryhelper.getQueryResultForQueryString(ctx, queryString, tm)
	if err != nil {
		fmt.Println("error executing query: " + err.Error())
		return nil, err
	}
	if results, ok := resultInterface.([]*models.Policy); ok {
		if results != nil {
			fmt.Println(results[0])
			return results[0], nil
		}
		fmt.Println("no policy record found returning ...")
		return nil, nil
	}
	fmt.Println("no query response ...")
	return nil, err
}

func (s *SmartContract) PublishPolicy(ctx contractapi.TransactionContextInterface, jsonPayload string) (models.ResponsePayload, error) {

	helper := Helper{}
	args := make([]string, 1)
	args[0] = jsonPayload
	results, err := helper.parseAndValidatePolicyPayload(args)
	var response = models.ResponsePayload{}
	if err != nil {
		return response, err
	}

	// check existing policy
	// Only allow 1 policy with given policyID
	policyID := results.PolicyPayload.Policy.PolicyID
	existingRecord, _ := helper.getPolicyByPolicyID(ctx, policyID)
	if existingRecord != nil {
		response.Data = existingRecord
		return response, errors.New("we have an existing policy record for policyID: " + policyID)
	}

	data, err := s.addPolicyToLedger(ctx, &results.PolicyPayload)
	response.Data = data
	return response, err
}

func (s *SmartContract) addPolicyToLedger(ctx contractapi.TransactionContextInterface, payload *models.PolicyPayload) (models.Policy, error) {

	// initialize common properties - timestamp, doctype
	payload.Policy.InitCommon(payload.Timestamp, DocTypePolicy, payload.UserID)
	// convert to bytes
	metaBytes, err := json.Marshal(payload.Policy)
	if err != nil {
		println(fmt.Sprintf("addPolicyToLedger marshal error %s", err.Error()))
		return models.Policy{}, err
	}
	// add record to the ledger
	helper := Helper{}
	err = helper.writeRecordToLedger(ctx, payload.Policy.ID, metaBytes)
	if err != nil {
		println(fmt.Sprintf("helper.writeRecordToLedger %s", err.Error()))
	}
	return payload.Policy, err
}

func (s *SmartContract) UpdatePolicy(ctx contractapi.TransactionContextInterface, jsonPayload string) (models.ResponsePayload, error) {

	helper := Helper{}
	args := make([]string, 1)
	args[0] = jsonPayload
	results, err := helper.parseAndValidatePolicyPayload(args)
	var response = models.ResponsePayload{}
	if err != nil {
		return response, err
	}

	data, err := s.updatePolicy(ctx, &helper, &results.PolicyPayload.Policy)
	response.Data = data
	if err != nil {
		return response, err
	}
	return response, err
}

func (s *SmartContract) updatePolicy(ctx contractapi.TransactionContextInterface, helper *Helper, policy *models.Policy) (*models.Policy, error) {

	existingPolicy, err := helper.getPolicyByPolicyID(ctx, policy.PolicyID)
	if err != nil {
		fmt.Printf("Error looking up policy for policyid '%s' error: '%s' \n", policy.PolicyID, err.Error())
	}

	// update policy Description
	if policy.Description != "" {
		existingPolicy.Description = policy.Description
	}
	// update policy Product
	if policy.Product != "" {
		existingPolicy.Product = policy.Product
	}
	// update policy DisclosurePeriod
	if policy.DisclosurePeriod != 0 {
		existingPolicy.DisclosurePeriod = policy.DisclosurePeriod
	}
	// update policy Reward
	if policy.Reward != 0 {
		existingPolicy.Reward = policy.Reward
	}

	bytes, err := json.Marshal(existingPolicy)
	if err != nil {
		return existingPolicy, err
	}
	err = helper.writeRecordToLedger(ctx, existingPolicy.ID, bytes)
	if err != nil {
		fmt.Printf("error updating policy with policyid '%s' ...", existingPolicy.PolicyID)
		return existingPolicy, err
	}
	return existingPolicy, nil
}
