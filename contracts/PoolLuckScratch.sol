// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PoolLuckScratch {
    address public owner;
    uint256 public scratchPrice; // Preço da raspadinha (em wei)
    uint256 public prizeAmount;  // Prêmio da raspadinha (em wei)
    uint256 public odds;         // Chances de ganhar (ex: 250)

    event ScratchPlayed(address indexed player, bool won, uint256 amount);

    constructor(uint256 _scratchPrice, uint256 _prizeAmount, uint256 _odds) {
        owner = msg.sender;
        scratchPrice = _scratchPrice;
        prizeAmount = _prizeAmount;
        odds = _odds;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode fazer isso.");
        _;
    }

    function fundContract() external payable onlyOwner {
        // Dono coloca mais MATIC para pagar prêmios
    }

    function setScratchPrice(uint256 _newPrice) external onlyOwner {
        scratchPrice = _newPrice;
    }

    function setPrizeAmount(uint256 _newPrize) external onlyOwner {
        prizeAmount = _newPrize;
    }

    function setOdds(uint256 _newOdds) external onlyOwner {
        odds = _newOdds;
    }

    function playScratch() external payable {
        require(msg.value == scratchPrice, "Valor incorreto para jogar.");

        uint256 random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao, // 🔥 atualizado para usar prevrandao
                    msg.sender
                )
            )
        );

        bool won = (random % odds == 0);

        if (won) {
            require(address(this).balance >= prizeAmount, "Contrato sem saldo para pagar o premio.");
            payable(msg.sender).transfer(prizeAmount);
            emit ScratchPlayed(msg.sender, true, prizeAmount);
        } else {
            emit ScratchPlayed(msg.sender, false, 0);
        }
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) external onlyOwner {
        payable(owner).transfer(amount);
    }
}
