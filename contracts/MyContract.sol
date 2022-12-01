pragma solidity ^0.5.0;

contract MyContract {
    // Variables global
    address[16] public adopteDog;

    function adopt(uint indexDog) public returns (bool) {
        require(indexDog >= 0 && indexDog <= 15, "Fuera de rango.");
        bool adoptSuccessful = true;
        if(adopteDog[indexDog] == address(0)) {
            adopteDog[indexDog] = msg.sender;
        } else {
            adoptSuccessful = false;
        }
        return adoptSuccessful;
    }

    /**
     * Para ver palabras claves.
     * No modifica datos de la Blockchain.
     */
    function getAdoptedDog() public view returns (address[16] memory) {
        return adopteDog;
    }
}