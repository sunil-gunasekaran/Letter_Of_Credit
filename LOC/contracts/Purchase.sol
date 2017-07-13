/*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.
*******************************************************************************/
pragma solidity ^0.4.11;

contract Purchase {

struct  PurchaseOrder {
		string  buyer_name;
		address buyer_address;
		string  product;
		uint quantity;
		uint cost;
		bool order_status;
		string filename;
		string filehash;
	}
	
PurchaseOrder purchaseInfo;
	
function Purchase(string buyer_name, address buyer_addr, string  product,uint quantity,uint cost)  {
    
    purchaseInfo.buyer_name = buyer_name;
    purchaseInfo.buyer_address = buyer_addr;
    purchaseInfo.product = product;
    purchaseInfo.quantity = quantity;
    purchaseInfo.cost = cost;
}

function getPurchaseInfo() constant returns (address purchase_addr,string buyer_name ,address buyer_addr, string product, uint quantity, uint cost,bool status,string filename,string filehash) {
	return (this,purchaseInfo.buyer_name,purchaseInfo.buyer_address,purchaseInfo.product,purchaseInfo.quantity,purchaseInfo.cost,purchaseInfo.order_status,purchaseInfo.filename,purchaseInfo.filehash); 
}

function submit(string filename,string filehash)  {
	purchaseInfo.order_status = true;
	purchaseInfo.filename = filename;
	purchaseInfo.filehash = filehash;
}

function() {
  throw;
}

}