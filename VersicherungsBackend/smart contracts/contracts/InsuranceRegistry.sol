pragma solidity ^0.4.8;

import "./WeatherInsurance.sol";
import "installed_contracts/zeppelin/contracts/ownership/Ownable.sol"; 

contract InsuranceRegistry is Ownable {
    address public last;
    bool public active = true;

    struct AddressStruct {
        address[] array;
    }

    mapping(address => AddressStruct) weatherInsuranceContracts;

    event LogInfo(address sender);

    constructor() public payable {
    }

    function payConfigAndOffer(
        uint startDate, uint endDate, string place, string trigger, uint payout
    )
        public
        payable
        returns(address newContract)
    {
        require(active);
        require(address(this).balance > payout);
        WeatherInsurance w = (new WeatherInsurance).value(payout)(startDate, endDate, place, trigger, payout, msg.sender);
        weatherInsuranceContracts[msg.sender].array.push(w);
        LogInfo(w);
        last = w;
        return w;
    }

    function getContractsToAddress() public view returns(address[]) {
        return weatherInsuranceContracts[msg.sender].array;
    }

    function deactivate() public onlyOwner() {
        active = false;
    }

    function activate() public onlyOwner() {
        active = true;
    }

}