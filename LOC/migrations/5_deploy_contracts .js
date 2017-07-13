var SellerWarehouse 	= artifacts.require("./SellerWarehouse.sol");
var Purchase = artifacts.require("./Purchase.sol");
var PurchaseExecutor = artifacts.require("./PurchaseExecutor.sol");

module.exports = function(deployer) {
  deployer.link(SellerWarehouse,Purchase,PurchaseExecutor);
  deployer.deploy(PurchaseExecutor);
};
