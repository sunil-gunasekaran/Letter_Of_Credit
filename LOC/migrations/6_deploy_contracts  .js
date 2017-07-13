var SellerWarehouse 	= artifacts.require("./SellerWarehouse.sol");
var AdvisingBankRegistry = artifacts.require("./AdvisingBankRegistry.sol");
var IssuingBankRegistry = artifacts.require("./IssuingBankRegistry.sol");
var CarrierRegistry 	= artifacts.require("./CarrierRegistry.sol");
var LOCExecutor = artifacts.require("./LOCExecutor.sol");

module.exports = function(deployer) {
  deployer.link(SellerWarehouse,AdvisingBankRegistry,IssuingBankRegistry,LOCExecutor);
  deployer.deploy(LOCExecutor);
};
