pragma solidity ^0.4.11;

import "./CarrierRegistry.sol";
import "./Definition.sol";

contract ShippingExecutor is Definition  {


	event carrierRegistration(uint errorCode,string message, string bank_name,address contract_addr, address bank_addr);
 	
 	/***************************************************************************
      Method name : shippingRequest()
      Purpose     : This method is used to request a shipping request
    ***************************************************************************/
	function shippingRequest				(string LOCHash,
											 address seller_address,address bank_addr,
											 address carrier_contract_address) {

		CarrierRegistry(carrier_contract_address).shipReq(LOCHash,seller_address,bank_addr);
	}

 	/***************************************************************************
      Method name : getMyShipIndex()
      Purpose     : This method is used to get the shipping index by passing LOCHash
    ***************************************************************************/
    function getMyShipIndex(string LOCHash, address carrier_contract_address) constant returns (uint) {
        uint index = CarrierRegistry(carrier_contract_address).getMyShipIndex(LOCHash);
        return (index);
    }

    /***************************************************************************
      Method name : getAllShipStatus()
      Purpose     : This method is used to get total shipping counts
      
    ***************************************************************************/
    function getAllShipStatus(address carrier_contract_address) constant returns (uint total_records) {
            uint count = CarrierRegistry(carrier_contract_address).getTotalNumShipReq();
            return (count);
    }

    /***************************************************************************
      Method name : approveShipping()
      Purpose     : This method is used to approve shipping request
    ***************************************************************************/
    function approveShipping (string  LOCHash, 
                       		  string  billOfLadingHash,
                       		  address carrier_contract_address)  {

    	CarrierRegistry(carrier_contract_address).approve(LOCHash,billOfLadingHash);
    }


             /***************************************************************************
      Method name : registerCarrier()
      Purpose     : This method is used to register a new Carrier 

    ***************************************************************************/
      function registerCarrier(string carrier_name,
                               address carrier_address, address bank_address) {
        // Check if the user exists
        if (!checkIfUserExists(carrier_address,Parties.Carrier)) {
            // Add the structure details
            CarrierRegistry obj = new CarrierRegistry (carrier_name,carrier_address,bank_address);
            Definition.cAddr.push(obj);
            Definition.map_carriers[carrier_address] = CarrierDetails(carrier_address,obj);
            carrierRegistration(0,"",carrier_name,carrier_address,obj);
        }
        else {
            carrierRegistration(1,"Shipper already exists.Shipper registration failed!!",carrier_name,carrier_address,bank_address);
        }       
    }

    /***************************************************************************
      Method name : getAvailableCarriers()
      Purpose     : This method returns the list of all available buyers
    ***************************************************************************/
      function getAvailableCarriers() constant returns (address [] contractAddress) {
        return cAddr;
    }

        /***************************************************************************
      Method name : getCarrierContractAddr()
      Purpose     : This method returns carrier contract address
    ***************************************************************************/
      function getCarrierContractAddr(address carrier_addr) constant returns (address contractAddress) {
        if (checkIfUserExists(carrier_addr,Parties.Carrier)) {
             CarrierDetails user_carrier= Definition.map_carriers[carrier_addr];
             return user_carrier.contract_address;
           }
      }
}