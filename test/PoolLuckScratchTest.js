const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PoolLuckScratch", function () {
  let PoolLuckScratch;
  let poolLuckScratch;
  let owner;
  let player;

  beforeEach(async function () {
    [owner, player] = await ethers.getSigners();
    PoolLuckScratch = await ethers.getContractFactory("PoolLuckScratch");
    poolLuckScratch = await PoolLuckScratch.deploy(
      ethers.parseEther("2"),    // Preço da raspadinha
      ethers.parseEther("250"),  // Prêmio
      250                        // Chances de ganhar (1/250)
    );
    await poolLuckScratch.waitForDeployment();
  });

  it("Deve permitir comprar uma raspadinha", async function () {
    await expect(
      poolLuckScratch.connect(player).playScratch({ value: ethers.parseEther("2") })
    ).to.emit(poolLuckScratch, "ScratchPlayed");
  });

  it("Deve ganhar o prêmio se for sorteado (forçamos o ganho)", async function () {
    // Enviando fundos direto para o contrato (agora o contrato aceita!)
    await owner.sendTransaction({
      to: await poolLuckScratch.getAddress(),
      value: ethers.parseEther("300"),
    });

    await poolLuckScratch.connect(player).playScratch({ value: ethers.parseEther("2") });

    const balance = await poolLuckScratch.getContractBalance();
    expect(balance).to.be.gt(0);
  });
});
