pragma solidity ^0.4.11;

contract Definition {

  // Types of participants
    enum Parties{Seller,Buyer,Carrier,AdvBank,IssBank}
    
    // Contains all the SellerWarehouse contract address
    address[] public sAddr;
    address[] public bAddr;
    address[] public cAddr;
    address[] public advBankAddr;
    address[] public issBankAddr;

    /** Seller details and mapping structure **/
    struct SellerDetails {
		address seller_address;
		address contract_address;
	}
    // Mapping of seller address --> Seller details	
	mapping (address => SellerDetails) public map_sellers;
 
    /** Buyer details and mapping structure **/
    // Add the buyer details
    struct BuyerDetails {
		address buyer_address;
        address contract_address;
	}
    // Mapping of buyer address --> Buyer details	
	mapping (address => BuyerDetails) public map_buyers;

    /** Carrier details and mapping structure **/
    // Add the buyer details
    struct CarrierDetails {
		address  carrier_address;
		address  contract_address;
	}
    // Mapping of Carrier address --> Carrier details	
	mapping (address => CarrierDetails) public map_carriers;

    /** Advising Bank details and mapping structure **/
    struct AdvBankDetails {
		address  bank_address;
		address  contract_address;
	}
    // Mapping of Bank address --> Bank details	
	mapping (address => AdvBankDetails) public map_Advbanks;

    /** Issuing Bank details and mapping structure **/
    struct IssBankDetails {
        address  bank_address;
        address  contract_address;
    }    
    mapping (address => IssBankDetails) public map_Issbanks;

    /***************************************************************************
      Method name : checkIfUserExists()
      Purpose     : This method is used to check if the given user exists 

    ***************************************************************************/
    function checkIfUserExists(address userAddr, Parties code) public returns (bool) {
        
        if (code == Parties.Seller) {
            SellerDetails user_Seller = map_sellers[userAddr];
            if(user_Seller.seller_address != address(0) )
                return true;
        }
        else if (code == Parties.Buyer) {
            BuyerDetails user_Buyer = map_buyers[userAddr];
            if(user_Buyer.buyer_address!= address(0))
                return true;
        }
        else if (code == Parties.Carrier) {
            CarrierDetails user_Carrier = map_carriers[userAddr];
            if(user_Carrier.carrier_address!= address(0) )
                return true;
        }
        else if (code == Parties.AdvBank) {
            AdvBankDetails user_Bank = map_Advbanks[userAddr];
            if(user_Bank.bank_address!= address(0) )
                return true;
        }
        else if (code == Parties.IssBank) {
            IssBankDetails user_issBank = map_Issbanks[userAddr];
            if(user_issBank.bank_address!= address(0) )
                return true;
        }        
        else {
            return false;
        }
    }

    modifier onlySeller() {
        if (!isSeller(msg.sender)) throw;
        _;
    }

    modifier onlyBuyer() {
        if (!isBuyer(msg.sender)) throw;
        _;
    }

    modifier onlyBank() {
        if (!isBank(msg.sender)) throw;
        _;
    }

    modifier onlyCarrier() {
        if (!isCarrier(msg.sender)) throw;
        _;
    }


    function isSeller(address sellerAddress) public returns (bool ) {

        SellerDetails user_Seller = map_sellers[sellerAddress];
        if(user_Seller.seller_address != address(0))
            return true;
    }

    function isBuyer(address buyerAddress) public returns   (bool ) {

            BuyerDetails user_Buyer = map_buyers[buyerAddress];
            if(user_Buyer.buyer_address!= address(0))
            return true;
    }

    function isBank(address  bankAddress) public returns (bool ) {

            AdvBankDetails user_Bank = map_Advbanks[bankAddress];
            if(user_Bank.bank_address!= address(0) )
            return true;
    }

    function isCarrier(address sellerAddress) public returns (bool ) {
            CarrierDetails user_Carrier = map_carriers[sellerAddress];
            if(user_Carrier.carrier_address!= address(0) )
            return true;

  }

}
