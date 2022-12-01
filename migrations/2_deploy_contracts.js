const MyContracts = artifacts.require("MyContracts");

module.exports = function(deployer) {
    deployer.deploy(MyContracts);
};