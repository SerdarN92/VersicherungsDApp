pragma solidity ^0.4.8;

import "installed_contracts/oraclize-api/contracts/usingOraclize.sol"; 

contract WeatherInsurance is usingOraclize {
    uint public startDate;
    uint public endDate;
    string public place;
    string public trigger;
    address public customer;
    address public insurance;
    bool public payoutCustomer = false;
    bool public payoutInsurance = false;
    bool public blocked = false;
    uint public requestResult;
    bool public receivedResult = false;


    event LogInfo(string description);

    constructor(uint _startDate, uint _endDate, string _place, string _trigger, uint _payout, address _customer) public payable{
        require(msg.value >= _payout);
        startDate = _startDate;
        endDate = _endDate;
        place = _place;
        trigger = _trigger;
        insurance = msg.sender;
        customer = _customer;
        OAR = OraclizeAddrResolverI(0x4BC8236a5Ce009Ce0808E349a65a869aEDB323BA);
    }
    
    function checkPayout() view public returns (bool){
      if(now > endDate) {
          return true;
      } else {
          return false;
      }
    }
    
    function __callback(bytes32 myid, string result) {
        if(receivedResult) revert();
        if (msg.sender != oraclize_cbAddress()) revert();
        requestResult = parseInt(result);
        if(requestResult >= parseInt(trigger)) {
            customer.transfer(address(this).balance);
            payoutCustomer = true;
        } else {
            insurance.transfer(address(this).balance);
            payoutInsurance = true;
        }
        receivedResult = true;
    }
    
    function isTriggered() public payable {
        if(blocked) revert();
        if (oraclize_getPrice("URL") > address(this).balance) {
            emit LogInfo("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogInfo("Oraclize query was sent, standing by for the answer..");
            oraclize_query("URL", strConcat("json(https://api1.hq-platri.de/rainfall?place=", place, ").rainfall"));
            blocked = true;
        }

    }

}