#!/bin/bash

# 
#  Creates a new channel and joins a specified member to the channel.
#  
#

# import common vars
. common.sh

createChannel() {
  set -x
	docker exec $CLI_NAME peer channel create --outputBlock ./channel-artifacts/$CHANNEL_NAME.block -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx  --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
	res=$?
	set +x
	cat log.txt
	verifyResult $res "Channel creation failed"
	echo "===================== Channel '$CHANNEL_NAME' created ===================== "
	echo
}
joinChannel () {
    # currently have one peer on each org.
    # todo: if more org1 peers are added in the future, a loop will be needed
	joinChannelWithRetry
}
## Sometimes Join takes time hence RETRY at least 5 times
joinChannelWithRetry() {
  sleep $DELAY
  set -x
  docker exec $CLI_NAME peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.org${ORG} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    joinChannelWithRetry
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.org${ORG} has failed to join channel '$CHANNEL_NAME' "
}

updateAnchorPeers() {
 
  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    docker exec $CLI_NAME peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx >&log.txt
    res=$?
    set +x
  else
    set -x
    docker exec $CLI_NAME peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  verifyResult $res "Anchor peer update failed"
  echo "===================== Anchor peers updated for org '$CORE_PEER_LOCALMSPID' on channel '$CHANNEL_NAME' ===================== "
  sleep $DELAY
  echo
}


if [[ "$MYORGPATH" == "" || "$ORGNAME" == "" ]]; then
  echo "Missing org details"
  exit 1
else
  if [[ "$ORGNAME" == "orderer" ]]; then
    echo "this is orderer, ignore and exit"
    exit 0
  fi
  # import org specific vars
  . $MYORGPATH/_common/$ORGNAME-common.sh
  # define docker cli container name
  CLI_NAME="cli_$ORGNAME"

  if [ "$ORGNAME" == "org1" ]; then
    ## Create channel only if org1
    echo "Creating channel..."
    createChannel
  fi
  
  echo "Having peers join the channel ..."
  joinChannel
  echo "sleep for $DELAY seconds ... "
  sleep $DELAY

  echo "Set anchor peer for $ORGNAME ..."
  updateAnchorPeers
  echo "sleep for $DELAY seconds ... "
  sleep $DELAY

fi

