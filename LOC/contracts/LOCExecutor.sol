pragma solidity ^0.4.11;

import "./SellerWarehouse.sol";
import "./AdvisingBankRegistry.sol";
import "./IssuingBankRegistry.sol";
import "./Definition.sol";

contract LOCExecutor {

    /******************************************************************************************************
      Method name : requestForLOC()
      Purpose     : This method requests for Letter of Credit request from Buyer
    *******************************************************************************************************/
    function requestForLOC(string filehash,
                           address seller_addr,
                           address buyer_addr,
                           address adv_bank_addr,
                           address adv_bank_contract_addr,
                           address purchase_addr)  {

            AdvisingBankRegistry(adv_bank_contract_addr).requestLOC(filehash,
                                                                    seller_addr,
                                                                    buyer_addr,
                                                                    adv_bank_addr,
                                                                    purchase_addr);
    }

    /***************************************************************************
      Method name : getMyLocStatus()
      Purpose     : This method returns all the purchase orders for the given seller
    ***************************************************************************/
    function getMyLocIndex(string filehash, address adv_bank_contract_addr) constant returns (uint) {
        uint index = AdvisingBankRegistry(adv_bank_contract_addr).getMyLocIndex(filehash);
        return (index);
    }

    /***************************************************************************
      Method name : getAllLocStatus()
      Purpose     : This method returns all the purchase orders for the given seller
      
    ***************************************************************************/
    function getAllLocStatus(address adv_bank_contract_addr) constant returns (uint total_records) {
            uint count = AdvisingBankRegistry(adv_bank_contract_addr).getTotalNumLOCReq();
            return (count);
    }

    /***************************************************************************
      Method name : issueLOC()
      Purpose     : This method returns all the purchase orders for the given seller
    ***************************************************************************/
    function issueLOC (string  saleDeedHash, 
                       string  LOChash,
                       address buyer_addr, 
                       address seller_addr,
                       address issuing_bank_contract_addr,
                       address advising_bank_contract_addr,
                       address purchase_addr )  {

        IssuingBankRegistry(issuing_bank_contract_addr).issueLOC(saleDeedHash,LOChash,buyer_addr,seller_addr,purchase_addr);
        AdvisingBankRegistry(advising_bank_contract_addr).approve(saleDeedHash,LOChash);
    }

    /***************************************************************************
      Method name : getAllIssuedLOCReq()
      Purpose     : This method returns all the issued LOC requests
    ***************************************************************************/
    function getAllIssuedLOCReq(address iss_bank_contract_addr) constant returns (uint total_records) {
        uint index = IssuingBankRegistry(iss_bank_contract_addr).getTotalNumIssuedLOCReq();
        return (index);
    }
}