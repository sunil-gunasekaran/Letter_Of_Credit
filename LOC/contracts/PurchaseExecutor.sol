pragma solidity ^0.4.11;

import "./SellerWarehouse.sol";
import "./Definition.sol";

contract PurchaseExecutor {
    /***************************************************************************
      Method name : purchaseProduct()
      Purpose     : This method is used to purchase a product from seller
      
    ***************************************************************************/
    function purchaseProduct(address contract_addr,
                             string buyer_name, 
                             address buyer_addr,
                             string product, uint quantity) {

      SellerWarehouse(contract_addr).purchaseItem(buyer_name,buyer_addr,product,quantity);

    }

    /***************************************************************************
      Method name : getPurchaseOrderByBuyer()
      Purpose     : This method returns the purchase order for the given buyer and seller
      
    ***************************************************************************/
   function getPurchaseOrderByBuyer(address contract_addr,
                                    address seller_addr, 
                                    address buyer_addr) constant 
                                    returns (address [50] contractAddress) {
            address[50] memory pAddr = 
            SellerWarehouse(contract_addr).getPOByBuyerContractAddress(buyer_addr);
            return pAddr;
    }

    /***************************************************************************
      Method name : getAllPurchasesBySeller()
      Purpose     : This method returns all the purchase orders for the given seller
      
    ***************************************************************************/
    function getAllPurchasesBySeller(address contract_addr) constant returns (address [50] contractAddress)  {
        address[50] memory pAddr = 
        SellerWarehouse(contract_addr).getAllPurchaseOrders();
        return pAddr;
    }

        /***************************************************************************
      Method name : approvePurchase()
      Purpose     : This method returns all the purchase orders for the given seller
      
    ***************************************************************************/
   function approvePurchase(address contract_addr,address purchase_addr, address buyer_addr,string filename,string filehash)  {
            SellerWarehouse(contract_addr).approve(buyer_addr,purchase_addr,filename,filehash);
    }
}