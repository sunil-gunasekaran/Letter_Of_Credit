/*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.

*******************************************************************************/

pragma solidity ^0.4.11;

contract CarrierRegistry  {

struct  CarrierInformation {
		string  carrier_name;
		address carrier_address;
		address bank_address;
	}
CarrierInformation carrierInfo;

struct  ShippingRequests {
		string  LOCHash;
		address seller_addr;
		address bank_addr;
		bool    status;
		string  bill;
	}
ShippingRequests[50] shipRequest;

mapping(string=>uint) map_LOCHash_with_shipReq_index;


uint counter = 0 ;

function CarrierRegistry(string carrier_name, address carrier_addr, address bank_address)  {
    carrierInfo.carrier_name = carrier_name;
    carrierInfo.carrier_address = carrier_addr;
    carrierInfo.bank_address = bank_address;
}

function getCarrierInfo() constant returns (string carrier_name ,address carrier_addr, address bank_address) {
	return (carrierInfo.carrier_name,carrierInfo.carrier_address,carrierInfo.bank_address); 
}

function shipReq(string LOCHash,address seller_addr ,address bank_addr) {
	shipRequest[counter].LOCHash 	  = LOCHash;
	shipRequest[counter].seller_addr  = seller_addr;
	shipRequest[counter].bank_addr    = bank_addr;
	shipRequest[counter].status	  	  = false;
	shipRequest[counter].bill         = "Yet to upload Bill of Lading";
	map_LOCHash_with_shipReq_index[LOCHash] = counter;
	counter++;
}


function getMyShipIndex(string LOCHash) constant returns (uint) {
	uint index = map_LOCHash_with_shipReq_index[LOCHash];
	return index;
}

function getTotalNumShipReq() constant returns (uint) {
	return counter;
}

function getShipStatusByIndex(uint index) constant returns 
														(string LOCHash,
														 address seller_addr,
														 address bank_addr, 
														 bool status, 
														 string bill)
{
	return (shipRequest[index].LOCHash ,
		    shipRequest[index].seller_addr ,
		    shipRequest[index].bank_addr ,
  		    shipRequest[index].status,
		    shipRequest[index].bill);
}

function approve (string LOCHash, string billOfLadingHash) {
	uint index = map_LOCHash_with_shipReq_index[LOCHash];
	if (index >= 0 ) {
		shipRequest[index].status       = true;
		shipRequest[index].bill         = billOfLadingHash;
	}
}

function() {
    throw;
}

}