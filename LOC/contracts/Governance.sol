 /*******************************************************************************
Contract : This contract defines roles for multiple parties for the Letter of 
           credit application.
*******************************************************************************/
import "./SellerWarehouse.sol";
import "./AdvisingBankRegistry.sol";
import "./IssuingBankRegistry.sol";
import "./BuyerRegistry.sol";
import "./Definition.sol";

pragma solidity ^0.4.11;

contract Governance is Definition {
   
    // Event Logging
    event advbankRegistration   (uint errorCode,string message, string bank_name,address contract_addr, address bank_addr);
    event issbankRegistration   (uint errorCode,string message, string bank_name,address contract_addr, address bank_addr);
    event sellerRegistration (uint errorCode,string message, string bank_name,address contract_addr, address bank_addr);
    event buyerRegistration  (uint errorCode,string message, string bank_name,address contract_addr, address bank_addr);

    /***********************************************************
      Method name : Governance()
      Purpose     : Constructor - Track owner address
      
    ************************************************************/
    function  Governance() {
    }

  
    /***************************************************************************
      Method name : registerAdvisingBank()
      Purpose     : This method is used to register a new Bank 
    ***************************************************************************/
    function registerAdvisingBank(string bank_name, address bank_address) {
        // Check if the user exists
        if (!checkIfUserExists(bank_address,Parties.AdvBank)) {
            AdvisingBankRegistry obj = new AdvisingBankRegistry (bank_name,bank_address);
            Definition.advBankAddr.push(obj);
            Definition.map_Advbanks[bank_address] = AdvBankDetails(bank_address,obj);
            advbankRegistration(0,"",bank_name,bank_address,obj);
        }
        else {
            advbankRegistration(1,"Advising Bank already exists.Bank registration failed!!",bank_name,bank_address,bank_address);
        }
    }


    /***************************************************************************
      Method name : getAvailableAdvBanks()
      Purpose     : This method returns the list of all available advising banks
      
    ***************************************************************************/
    function getAvailableAdvBanks() constant returns (address [] contractAddress)  {
        return Definition.advBankAddr;
    }    

    /***************************************************************************
      Method name : registerIssuingBank()
      Purpose     : This method is used to register a new Bank 
    ***************************************************************************/
    function registerIssuingBank(string bank_name, address bank_address) {
        // Check if the user exists
        if (!checkIfUserExists(bank_address,Parties.IssBank)) {
            IssuingBankRegistry obj = new IssuingBankRegistry (bank_name,bank_address);
            Definition.issBankAddr.push(obj);
            Definition.map_Issbanks[bank_address] = Definition.IssBankDetails(bank_address,obj);
            issbankRegistration(0,"",bank_name,bank_address,obj);
        }
        else {
            issbankRegistration(1,"Issuing Bank already exists.Bank registration failed!!",bank_name,bank_address,bank_address);
        }
    }

    /***************************************************************************
      Method name : getAvailableIssBanks()
      Purpose     : This method returns the list of all issuing available banks
      
    ***************************************************************************/
      function getAvailableIssBanks() constant returns (address [] contractAddress)  {
        return issBankAddr;
    }
 
  /***************************************************************************
      Method name : registerSeller()
      Purpose     : This method is used to register a new seller 

    ***************************************************************************/
      function registerSeller(string seller_name,
                            string product,
                            uint cost,
                            address seller_address,
                            address bank_address)   {
        // Check if the user exists
        if (!checkIfUserExists(seller_address,Parties.Seller)) {
            // Add the structure details
            SellerWarehouse obj = new SellerWarehouse (seller_name,seller_address,product,cost,bank_address);
            Definition.sAddr.push(obj);
            Definition.map_sellers[seller_address] = SellerDetails(seller_address,obj);
            sellerRegistration(0,"",seller_name,bank_address,obj);
        }
        else {
            sellerRegistration(1,"Seller already exists.Seller registration failed!!",seller_name,seller_address,bank_address);
        } 
    }

    /***************************************************************************
      Method name : getAvailableSellers()
      Purpose     : This method returns the list of all available sellers
      
    ***************************************************************************/
      function getAllSellerDetails() returns(address[] contractAddress ) {
        return sAddr;
    }

    /***************************************************************************
      Method name : registerBuyer()
      Purpose     : This method is used to register a new Buyer
      
    ***************************************************************************/
      function registerBuyer(string buyer_name,
                            address buyer_address,
                            address bank_address) {
        // Check if the user exists
        if (!checkIfUserExists(buyer_address,Parties.Buyer)) {
            // Add the structure details
            BuyerRegistry obj = new BuyerRegistry (buyer_name,buyer_address,bank_address);
            Definition.bAddr.push(obj);
            Definition.map_buyers[buyer_address] = BuyerDetails(buyer_address,obj);
            buyerRegistration(0,"",buyer_name,buyer_address,obj);
        }
        else {
            buyerRegistration(1,"Buyer already exists.Buyer registration failed!!",buyer_name,buyer_address,bank_address);
        }
    }

    /***************************************************************************
      Method name : getAvailableBuyers()
      Purpose     : This method returns the list of all available buyers
      
    ***************************************************************************/
      function getAvailableBuyers()  constant returns (address [] contractAddress) {
        return bAddr;
    }



    /***************************************************************************
      Method name : getAvailableCarriers()
      Purpose     : This method returns the list of all available buyers
    ***************************************************************************/
      function getSellerContractAddr(address seller_addr) constant returns (address contractAddress) {
          if (checkIfUserExists(seller_addr,Parties.Seller)) {
             SellerDetails user_Seller = Definition.map_sellers[seller_addr];
             return user_Seller.contract_address;
           }
    }


    /***************************************************************************
      Method name : getAdvBanContractkAddr()
      Purpose     : This method returns the list of all available buyers
    ***************************************************************************/
      function getAdvBankContractAddr(address bank_addr) constant returns (address contractAddress) {
        if (checkIfUserExists(bank_addr,Parties.AdvBank)) {
             AdvBankDetails user_banker = Definition.map_Advbanks[bank_addr];
             return user_banker.contract_address;
           }
      }

    /***************************************************************************
      Method name : getAdvBanContractkAddr()
      Purpose     : This method returns the list of all available buyers
    ***************************************************************************/
      function getIssBankContractAddr(address bank_addr) constant returns (address contractAddress) {
        if (checkIfUserExists(bank_addr,Parties.IssBank)) {
             IssBankDetails user_banker = Definition.map_Issbanks[bank_addr];
             return user_banker.contract_address;
           }
      }



    function() {
        throw;
    }
}

