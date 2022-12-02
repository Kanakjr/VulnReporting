package models

// Report - structure to convert json payload from client apps
type ReportPayload struct {
	Report    Report `json:"report,omitempty"`
	UserID    string `json:"userId,omitempty"`
	Timestamp int64  `json:"timestamp,omitempty"`
}

// Policy - structure to convert json payload from client apps
type PolicyPayload struct {
	Policy    Policy `json:"policy,omitempty"`
	UserID    string `json:"userId,omitempty"`
	Timestamp int64  `json:"timestamp,omitempty"`
}

// Reward - structure to convert json payload from client apps
type RewardPayload struct {
	Reward    Reward `json:"reward,omitempty"`
	UserID    string `json:"userId,omitempty"`
	Timestamp int64  `json:"timestamp,omitempty"`
}

// ResponsePayload - A wrapper object to be used for data response to clients
type ResponsePayload struct {
	Data interface{} `json:"data"`
}
