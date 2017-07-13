var CarrierRegistry 	= artifacts.require("./CarrierRegistry.sol");
var ShippingExecutor = artifacts.require("./ShippingExecutor.sol");

module.exports = function(deployer) {
  deployer.link(CarrierRegistry,ShippingExecutor);
  deployer.deploy(ShippingExecutor);
};
