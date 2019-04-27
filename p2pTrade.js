pragma solidity ^0.5.1;

contract p2pTrade {
    address buyer;
    uint powerBill;
    bool isEnergyRecieved;
    uint load;

    constructor() public payable {
        buyer = msg.sender;
        powerBill = msg.value;
        isEnergyRecieved = false;
        load = 0;
        //constructor function executes automatically upon deployment
        //payable function to send and receive ether
        //msg.sender represents address calling function
        //msg.value tells us how much ether has been sent
    }

    modifier onlyOwner {
        require (msg.sender==buyer);
        _;
    }

    modifier mustEqualLoad{
        require (isEnergyRecieved==true);
        _;
    }

    address payable prosumer;

    function placeOrder(address payable prosumerAdd, uint loadAmount) public onlyOwner{
        prosumer = prosumerAdd;
        load = loadAmount;
    }

    function payout() private mustEqualLoad{

         prosumer.transfer(powerBill) ;
    }



    function checkEnergy(uint receivedEnergy) public onlyOwner{
        if(receivedEnergy == load) {
            isEnergyRecieved =true;
            payout();
        }
    }

}
