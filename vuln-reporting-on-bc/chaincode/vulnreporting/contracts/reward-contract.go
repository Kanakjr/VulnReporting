package contracts

import (
	"encoding/json"
	"errors"
	"fmt"
	"vulnreporting/models"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

const (
	DocTypeReward = "reward"
)

func (s *SmartContract) FetchReward(ctx contractapi.TransactionContextInterface, queryString string) ([]*models.Reward, error) {
	queryhelper := QueryHelper{}
	var ts models.Reward
	resultInterface, err := queryhelper.getQueryResultForQueryString(ctx, queryString, ts)
	if results, ok := resultInterface.([]*models.Reward); ok {
		return results, nil
	}
	return nil, err
}

func (helper *Helper) getRewardByRewardID(ctx contractapi.TransactionContextInterface, rewardID string) (*models.Reward, error) {
	queryString := fmt.Sprintf(`{"selector":{"docType":"%s","rewardID":"%s"}}`, DocTypeReward, rewardID)
	queryhelper := QueryHelper{}
	var tm models.Reward
	fmt.Println("getRewardByrewardID ...")
	resultInterface, err := queryhelper.getQueryResultForQueryString(ctx, queryString, tm)
	if err != nil {
		fmt.Println("error executing query: " + err.Error())
		return nil, err
	}
	if results, ok := resultInterface.([]*models.Reward); ok {
		if results != nil {
			fmt.Println(results[0])
			return results[0], nil
		}
		fmt.Println("no reward record found returning ...")
		return nil, nil
	}
	fmt.Println("no query response ...")
	return nil, err
}

func (s *SmartContract) PublishReward(ctx contractapi.TransactionContextInterface, jsonPayload string) (models.ResponsePayload, error) {

	helper := Helper{}
	args := make([]string, 1)
	args[0] = jsonPayload
	results, err := helper.parseAndValidateRewardPayload(args)
	var response = models.ResponsePayload{}
	if err != nil {
		return response, err
	}

	// check existing reward
	// Only allow 1 reward with given rewardID
	rewardID := results.RewardPayload.Reward.RewardID
	existingRecord, _ := helper.getRewardByRewardID(ctx, rewardID)
	if existingRecord != nil {
		response.Data = existingRecord
		return response, errors.New("we have an existing reward record for rewardID: " + rewardID)
	}

	data, err := s.addRewardToLedger(ctx, &results.RewardPayload)
	response.Data = data
	return response, err
}

func (s *SmartContract) addRewardToLedger(ctx contractapi.TransactionContextInterface, payload *models.RewardPayload) (models.Reward, error) {

	// initialize common properties - timestamp, doctype
	payload.Reward.InitCommon(payload.Timestamp, DocTypeReward, payload.UserID)
	// convert to bytes
	metaBytes, err := json.Marshal(payload.Reward)
	if err != nil {
		println(fmt.Sprintf("addRewardToLedger marshal error %s", err.Error()))
		return models.Reward{}, err
	}
	// add record to the ledger
	helper := Helper{}
	err = helper.writeRecordToLedger(ctx, payload.Reward.ID, metaBytes)
	if err != nil {
		println(fmt.Sprintf("helper.writeRecordToLedger %s", err.Error()))
	}
	return payload.Reward, err
}

func (s *SmartContract) UpdateReward(ctx contractapi.TransactionContextInterface, jsonPayload string) (models.ResponsePayload, error) {

	helper := Helper{}
	args := make([]string, 1)
	args[0] = jsonPayload
	results, err := helper.parseAndValidateRewardPayload(args)
	var response = models.ResponsePayload{}
	if err != nil {
		return response, err
	}

	data, err := s.updateReward(ctx, &helper, &results.RewardPayload.Reward)
	response.Data = data
	if err != nil {
		return response, err
	}
	return response, err
}

func (s *SmartContract) updateReward(ctx contractapi.TransactionContextInterface, helper *Helper, reward *models.Reward) (*models.Reward, error) {

	existingReward, err := helper.getRewardByRewardID(ctx, reward.RewardID)
	if err != nil {
		fmt.Printf("Error looking up reward for rewardid '%s' error: '%s' \n", reward.RewardID, err.Error())
	}

	// update reward Description
	if reward.Amount != 0 {
		existingReward.Amount = reward.Amount
	}

	bytes, err := json.Marshal(existingReward)
	if err != nil {
		return existingReward, err
	}
	err = helper.writeRecordToLedger(ctx, existingReward.ID, bytes)
	if err != nil {
		fmt.Printf("error updating reward with rewardid '%s' ...", existingReward.RewardID)
		return existingReward, err
	}
	return existingReward, nil
}
