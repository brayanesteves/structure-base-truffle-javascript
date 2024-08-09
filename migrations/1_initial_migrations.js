const Migrations     = artifacts.require("Migrations");
const PaymentChannel = artifacts.require("PaymentChannel");

module.exports = function(deployer) {
    deployer.deploy(PaymentChannel);
};