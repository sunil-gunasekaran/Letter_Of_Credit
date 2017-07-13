#!/bin/bash

Terminaltitle="Ethereum Private Network"
echo -e '\033]2;'$Terminaltitle'\007'

echo "Starting Ethereum1"

#geth --identity "LOC" --rpc --rpcaddr "0.0.0.0" --rpcport "8001" --rpccorsdomain "*" --rpcapi "db,http,eth,net,personal,web3" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --ipcpath "/home/node1_admin/blockchaindata/.ethereum/geth.ipc"  --port "4003" --maxpeers 5 --nodiscover --solc "/usr/bin/solc" --targetgaslimit "6000000000000" --gasprice "2000" --natspec --networkid 1407 --datadir="/home/node1_admin/blockchaindata/DataDir" --etherbase 0 --unlock 0 --password "/home/node1_admin/data2/customscripts/password.txt" --preload "/home/node1_admin/Desktop/EthereumCustomScripts/run.js"  console

geth --identity "LOC" --datadir "/home/blockchain/projects/privatechain/data/" --rpc --rpcaddr "0.0.0.0" --rpcport "8001" --rpccorsdomain "*" --rpcapi "db,http,eth,net,web3,admin,miner,txpool,personal,shh" --port "40003" --maxpeers 5 --nodiscover --networkid 1407 --etherbase 0 --unlock 0 --password "/home/blockchain/projects/privatechain/password.txt" --preload "./run.js"  --ipcpath "/home/blockchain/projects/privatechain/data/geth.ipc" console


