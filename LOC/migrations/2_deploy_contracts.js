var AdvBankRegistry = artifacts.require("./AdvisingBankRegistry.sol");
var IssuingBankRegistry = artifacts.require("./IssuingBankRegistry.sol");
var BuyerRegistry = artifacts.require("./BuyerRegistry.sol");
var CarrierRegistry = artifacts.require("./CarrierRegistry.sol");


module.exports = function(deployer) {
  deployer.deploy(AdvBankRegistry);
  deployer.deploy(IssuingBankRegistry);
  deployer.deploy(BuyerRegistry);
  deployer.deploy(CarrierRegistry);
};
