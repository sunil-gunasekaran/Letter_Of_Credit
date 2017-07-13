var SellerWarehouse = artifacts.require("./SellerWarehouse.sol");
var Purchase = artifacts.require("./Purchase.sol");


module.exports = function(deployer) {
  deployer.deploy(Purchase);
  deployer.deploy(SellerWarehouse);
};
