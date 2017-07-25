/*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.

*******************************************************************************/
pragma solidity ^0.4.11;

contract IssuingBankRegistry {

struct  BankInformation {
		string bank_name;
		address bank_address;
		uint balances;
	}

BankInformation bankInfo;

struct LOCIssue {
	string  saleDeedhash;
	string  LOChash;
	address seller_addr;
	address buyer_addr;
	address bank_addr;
	address purchase_addr;
}

LOCIssue[50] LOCIssued;
uint issuedCounter  = 0;
mapping(string=>uint) map_LOChash_with_issued_index;


struct receivedBOL {
	string LOCHash;
	string BOLHash;
}
receivedBOL[50] BOL;
uint BOLCounter = 0;

function IssuingBankRegistry(string bank_name, address bank_addr)  {
    
    bankInfo.bank_name = bank_name;
    bankInfo.bank_address = bank_addr;
    bankInfo.balances = tx.origin.balance;
    
}

function getBankInfo() constant returns (string bank_name ,address bank_address,uint amount) {
	return (bankInfo.bank_name,bankInfo.bank_address,bankInfo.balances); 
}


function issueLOC (string saleDeedHash, string LOChash,address buyer_addr, address seller_addr, address purchase_addr) {
	LOCIssued[issuedCounter].saleDeedhash  = saleDeedHash;
	LOCIssued[issuedCounter].LOChash     = LOChash;
	LOCIssued[issuedCounter].buyer_addr  = buyer_addr;
	LOCIssued[issuedCounter].seller_addr = seller_addr;
	LOCIssued[issuedCounter].bank_addr   = tx.origin;
	LOCIssued[issuedCounter].purchase_addr   = purchase_addr;
	map_LOChash_with_issued_index[LOChash] = issuedCounter;
	issuedCounter++;
}

function getMyIssuedLocIndex(string LOChash) constant returns (uint) {
	uint index = map_LOChash_with_issued_index[LOChash];
	return index;
}

function getTotalNumIssuedLOCReq() constant returns (uint) {
	return issuedCounter;
}

function getIssuedLocStatusByIndex(uint index) constant returns 
														(string  ,
														 string  ,
														 address , 
														 address ,
														 address ,
														 address )
	{
		return (LOCIssued[index].saleDeedhash ,
		    LOCIssued[index].LOChash ,
		    LOCIssued[index].seller_addr, 
		    LOCIssued[index].buyer_addr,
		    LOCIssued[index].bank_addr,
		    LOCIssued[index].purchase_addr);
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


function() {
    throw;
}

}