var AdvBankRegistry     = artifacts.require("./AdvisingBankRegistry.sol");
var IssuingBankRegistry = artifacts.require("./IssuingBankRegistry.sol");
var BuyerRegistry 		= artifacts.require("./BuyerRegistry.sol");
var SellerWarehouse 	= artifacts.require("./SellerWarehouse.sol");
var Governance 	= artifacts.require("./Governance.sol");

module.exports = function(deployer) {
  deployer.link(SellerWarehouse,AdvBankRegistry,IssuingBankRegistry,BuyerRegistry,Governance);
  deployer.deploy(Governance);
};
