package models

import "time"

// Common - groups common properties
type Common struct {
	ID          string `json:"id"`
	DocType     string `json:"docType"`
	UserID      string `json:"userId"`
	DateCreated string `json:"dateCreated"`
	Timestamp   int64  `json:"timestamp"`
}

// FileProperties
type FileProperties struct {
	IpfsHost     string `json:"ipfsHost"`
	IpfsHash     string `json:"ipfsHash"`
	ChecksumHash string `json:"checksumHash"`
	Uri          string `json:"uri"`
	// Meta         []NameValue `json:"meta,optional"`
}

// InitCommon - initialize specific fields
func (cm *Common) InitCommon(timestamp int64, docType string, userID string) {
	cm.DocType = docType
	cm.UserID = userID
	cm.Timestamp = timestamp
	cm.DateCreated = getFormatedDate(timestamp)
}

// GetDocType - gets the value of doctype
func (cm *Common) GetDocType() string {
	return cm.DocType
}

func getFormatedDate(timestamp int64) string {
	if timestamp <= 0 {
		return ""
	}
	t := time.Unix(timestamp, 0)
	date := t.Format(time.RFC3339) // example 2020-02-21T22:50:34Z
	return date
}
