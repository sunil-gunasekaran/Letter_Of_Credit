/*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.

*******************************************************************************/
pragma solidity ^0.4.11;

contract AdvisingBankRegistry {

struct  BankInformation {
		string bank_name;
		address bank_address;
		uint balances;
	}

BankInformation bankInfo;

struct LOCRequest {
	string  filehash;
	address seller_addr;
	address buyer_addr;
	address issbank_addr;
	address purchase_addr;
	bool status;
	string LOChash;
}

LOCRequest[50] LOCInfo;
uint requestCounter = 0;

mapping(string=>uint) map_agreementHash_with_request_index;

struct receivedBOL {
	string LOCHash;
	string BOLHash;
}
receivedBOL[50] BOL;
uint BOLCounter = 0;

	
function AdvisingBankRegistry(string bank_name, address bank_addr)  {
    bankInfo.bank_name = bank_name;
    bankInfo.bank_address = bank_addr;
    bankInfo.balances = tx.origin.balance;
}

function getBankInfo() constant returns (string bank_name ,address bank_address,uint amount) {
	return (bankInfo.bank_name,bankInfo.bank_address,bankInfo.balances); 
}

function requestLOC(string saleAgreementHash,address buyer_addr, address seller_addr,address adv_bank_addr,address iss_bank_addr, address purchase_addr)  {
	LOCInfo[requestCounter].filehash    = saleAgreementHash;
	LOCInfo[requestCounter].buyer_addr  = buyer_addr;
	LOCInfo[requestCounter].seller_addr = seller_addr;
	LOCInfo[requestCounter].issbank_addr   = iss_bank_addr;
	LOCInfo[requestCounter].purchase_addr   = purchase_addr;
	LOCInfo[requestCounter].status      = false;
	map_agreementHash_with_request_index[saleAgreementHash] = requestCounter;
	requestCounter++;
}

function getMyLocIndex(string saleAgreementHash) constant returns (uint) {
	uint index = map_agreementHash_with_request_index[saleAgreementHash];
	return index;
}

function getTotalNumLOCReq() constant returns (uint) {
	return requestCounter;
}

function getLocStatusByIndex(uint index) constant returns 
														(string saleAgreement,
														 address buyer_addr, 
														 address seller_addr,
														 address iss_bank_addr,
														 address purchase_addr,
														 bool status, 
														 string LOChash)
{
	return (LOCInfo[index].filehash ,
		    LOCInfo[index].buyer_addr ,
		    LOCInfo[index].seller_addr, 
		    LOCInfo[index].issbank_addr,
  		    LOCInfo[index].purchase_addr,
		    LOCInfo[index].status,
		    LOCInfo[index].LOChash);
}

function approve (string saleAgreement, string LOCHash) {
	uint index = map_agreementHash_with_request_index[saleAgreement];
	if (index >= 0 ) {
		LOCInfo[index].status       = true;
		LOCInfo[index].LOChash      = LOCHash;
	}
}



function getBOLCounter() returns (uint) {
	return BOLCounter;
}

function getBOL(uint index) returns (string,string) {
	return (BOL[index].LOCHash,BOL[index].BOLHash);
}

function shareBOL(string LOCHash, string BOLHash) {

	BOL[BOLCounter].LOCHash = LOCHash;
	BOL[BOLCounter].BOLHash = BOLHash;
	BOLCounter ++;
}

function sendAmount(address receiving_addr,address sender_address) payable returns (bool) {
		if(msg.value == 0) return false;
	    bool isFailure = receiving_addr.send(msg.value);
	    return isFailure;
}


function() {
    throw;
}

}