/*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.

*******************************************************************************/
pragma solidity ^0.4.11;

contract BuyerRegistry {

struct  BuyerInformation {
		string buyer_name;
		address buyer_address;
		address bank_address;
	}
	
BuyerInformation buyerInfo;
	
function BuyerRegistry(string buyer_name, address buyer_address, address bank_address)  {
    
    buyerInfo.buyer_name = buyer_name;
    buyerInfo.buyer_address = buyer_address;
    buyerInfo.bank_address = bank_address;

}

function getBuyerInfo() constant returns (string buyer_name, address buyer_address,address bank_address) {
	return (buyerInfo.buyer_name,buyerInfo.buyer_address,buyerInfo.bank_address); 
}

function() {
    throw;
}

}