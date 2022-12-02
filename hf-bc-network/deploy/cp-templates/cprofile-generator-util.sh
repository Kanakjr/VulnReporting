#!/bin/bash

#Purpose - To generate Hyperledger Fabric connection profile. 

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0HOST}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${CAHOST}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ../cp-templates/ccp-template.json 
}

function yaml_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0HOST}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${CAHOST}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ../cp-templates/ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}