pragma solidity ^0.5.1;

contract p2pTrade {
    //declare transaction variables
    address buyer;
    uint powerBill;
    bool isEnergyRecieved;
    uint load;

    constructor() public payable {
        //intialise transaction variables
        //The contract is deployed from the buyers side
        buyer = msg.sender;
        //Ether sent by buyer
        powerBill = msg.value;
        //boolean to check Energy was recieved by buyer (intially false)
        isEnergyRecieved = false;
        load = 0;
    }

    //Ensures only the owner (buyer) can change the state of the contract
    modifier onlyOwner {
        require (msg.sender==buyer);
        _;
    }

    //ensures Energy was tranferred before buyer pay
    modifier mustEqualLoad{
        require (isEnergyRecieved==true);
        _;
    }

    //supplier address varible
    address payable prosumer;
    //The Energy received
    uint receivedEnergy;

    //get received energy value from smart meter (involves use of a software to calculate energy receied,
    //the function only takes the final value as arg it does not do any calculation)
    function readEnergy(uint meterReading) public onlyOwner{
        receivedEnergy = meterReading;
    }

    //set order detail (prosumed address and desired load)
    //args prosumer Address, desired load (fabricated data for simuation)(practially would involve
    //a UI for buyers to make anorder request recieved)
    function placeOrder(address payable prosumerAdd, uint loadAmount) public onlyOwner{
        prosumer = prosumerAdd;
        load = loadAmount;
    }

    //process ether payment to prosumer address given that the energy received matches the desired load
    function payout() private mustEqualLoad{

         prosumer.transfer(powerBill) ;
    }


    //check if load = energy received if so sets the boolean to true. Initiate payment function
    function checkEnergy() public onlyOwner{
        if(receivedEnergy == load) {
            isEnergyRecieved =true;

        }
        payout();
    }

}
