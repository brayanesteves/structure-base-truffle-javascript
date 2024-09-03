const Ntfs = artifacts.require("Ntfs");

module.exports = function(deployer) {
    deployer.deploy(Ntfs, 'HEROES', 'NTFS');
};