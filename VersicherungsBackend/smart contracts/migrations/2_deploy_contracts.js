var InsuranceRegistry = artifacts.require('./InsuranceRegistry.sol');

module.exports = function(deployer, accounts) {
    deployer.deploy(InsuranceRegistry, {value: 30000000000000000000}); //30 Ether
};