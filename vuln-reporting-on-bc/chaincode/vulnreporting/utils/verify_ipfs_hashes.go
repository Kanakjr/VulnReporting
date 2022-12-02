package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

// IpfsStat - structure of the data returned from ipfs api
type IpfsStat struct {
	Hash           string `json:"hash,omitempty"`
	DataSize       int64  `json:"dataSize,omitempty"`
	CumulativeSize int64  `json:"cumulativeSize,omitempty"`
	BlockSize      int64  `json:"blockSize,omitempty"`
	Type           string `json:"type,omitempty"`
	Message        string `json:"message,omitempty"`
	IsMatch        bool   `json:"isMatch,omitempty"`
}

// VerifyFilesExistInIpfs - verify given ipfs hashes exist in a specified ipfs host
func VerifyFilesExistInIpfs(ipfsHost string, items []string) (bool, []IpfsStat) {
	maxLength := len(items)
	channel := make(chan IpfsStat, maxLength)
	for _, item := range items {
		// trigger goroutines and fill the channel
		go getContentStats(ipfsHost, item, channel)
	}
	countMatching := 0
	var results []IpfsStat
	// fill results object from channel
	for stat := range channel {
		results = append(results, stat)
		if stat.IsMatch {
			countMatching++
		}
		if len(results) == maxLength {
			break
		}
	}
	// true iff all items reviewed are true
	ok := countMatching == maxLength

	// fmt.Printf("\nResults: %v\n total items: %d\n match count: %d\n all okay: %v\n", results, maxLength, countMatching, ok)
	return ok, results
}

// getContentStats - look up a hash in ipfs using ipfs stat api
func getContentStats(ipfsHost string, ipfsHash string, channel chan<- IpfsStat) {
	const maxBytesToRead = 512 // limit bytes read, stats api server shouldn't return a large body
	stats := IpfsStat{}
	formData := url.Values{}
	ipfsEndpoint := fmt.Sprintf("%s/api/v0/object/stat?arg=%s&format=hash", ipfsHost, ipfsHash)
	requestClient := &http.Client{
		Timeout: 320 * time.Millisecond,
	}
	resp, err := requestClient.PostForm(ipfsEndpoint, formData)
	if err != nil {
		fmt.Printf("\nError posting to ipfs api [%s] got error: %s \n", ipfsEndpoint, err)
		channel <- stats
		return
	}
	defer resp.Body.Close() // ensure we close on finish
	err = json.NewDecoder(io.LimitReader(resp.Body, maxBytesToRead)).Decode(&stats)
	if err != nil {
		fmt.Printf("Error reading response data %s ", err)
		channel <- stats
		return
	}
	//compare local hash value with value returned by ipfs api
	stats.IsMatch = (ipfsHash == stats.Hash)
	channel <- stats
	return
}
