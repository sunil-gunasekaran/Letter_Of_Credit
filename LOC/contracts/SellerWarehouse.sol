/*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.

*******************************************************************************/
pragma solidity ^0.4.11;

import "./Purchase.sol";

contract SellerWarehouse {

uint purchaseCounter ;

struct  sellerInventory {
		string seller_name;
		address seller_address;
		string  product;
		uint cost;
		address bank_address;
	}
// Limitation - More number of products cannot be added as of now
sellerInventory sellerDetail;
	
struct purchaseOrder {
		string  buyer_name ;
		address buyer_address ;
		string product;
		uint quantity;
		bool processed_flag;
	}
address[50] purchasContractAddr;

mapping(address => address[50]) map_buyer_PO;

struct receivedLOC {
	string LOCHash;
	address seller_address;
	address purchase_address;
}

receivedLOC[50] sLOC;
uint sLOCCounter = 0;

function SellerWarehouse(string seller_name, address seller_addr, string product,uint cost,address bank_address)  {
    sellerDetail.seller_name = seller_name;
    sellerDetail.seller_address = seller_addr;
    sellerDetail.product = product;
    sellerDetail.cost = cost;
    sellerDetail.bank_address = bank_address;
}

uint purchase_contract_counter = 0;

function purchaseItem(string buyer_name,address buyer_addr, string product, uint quantity)  {
	uint cost = quantity * sellerDetail.cost;
    Purchase obj = new Purchase (buyer_name,buyer_addr,product,quantity,cost);
	purchasContractAddr[purchase_contract_counter] = obj;
	purchase_contract_counter++;
	map_buyer_PO[buyer_addr] = purchasContractAddr;

}


function getPOByBuyerContractAddress(address buyer_addr) constant returns (address[50] purchaseAddr) {
	address[50]  purchases = map_buyer_PO[buyer_addr];
	return purchases; 
}

function getAllPurchaseOrders() constant returns (address[50] allPurchases){
	return purchasContractAddr;
}

function getSellerStuff() constant returns (string seller_name ,address seller_address,string product,uint cost,address bank_address) {
	return (sellerDetail.seller_name,sellerDetail.seller_address,sellerDetail.product,sellerDetail.cost,sellerDetail.bank_address); 
}

function approve(address buyer_addr,address purchase_addr,string filename,string filehash)  {
	//address[50]  purchases = map_buyer_PO[buyer_addr];
	 //Purchase(purchases[0]).submit(filename,filehash);
	 Purchase(purchase_addr).submit(filename,filehash);

}

function shareLOC(address seller_addr,address purchase_addr, string LOCHash) {

	sLOC[sLOCCounter].seller_address = seller_addr;
	sLOC[sLOCCounter].LOCHash = LOCHash;
	sLOC[sLOCCounter].purchase_address = purchase_addr;
	sLOCCounter ++;
}

function getLOCCounter() returns (uint) {
	return sLOCCounter;
}


// currently this is used for the purpose demo by hardcoding value 0
function getLOC(uint index) returns (string,address,address) {
	return (sLOC[index].LOCHash,sLOC[index].seller_address,sLOC[index].purchase_address);
}

function() {
    throw;
}

}