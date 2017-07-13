#!/bin/bash 
echo "Starting Ethereum"

geth --identity "LOC"  --datadir "/home/blockchain/projects/privatechain/data" init "/home/blockchain/projects/privatechain/custom_genesis.json" console
