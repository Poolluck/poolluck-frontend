const hre = require("hardhat");

async function main() {
  const scratchPrice = hre.ethers.parseEther("2.5"); // Preço da raspadinha: 2.5 MATIC
  const prizeAmount = hre.ethers.parseEther("312.5"); // Prêmio: 312.5 MATIC
  const odds = 250; // Chance de 1 para 250

  const PoolLuckScratch = await hre.ethers.getContractFactory("PoolLuckScratch");
  const scratch = await PoolLuckScratch.deploy(scratchPrice, prizeAmount, odds);

  await scratch.waitForDeployment();

  const address = await scratch.getAddress();

  console.log("✅ PoolLuckScratch implantado com sucesso em:", address);

  // Aguarda alguns blocos serem minerados para a verificação
  console.log("⏳ Aguardando 5 blocos para iniciar a verificação...");
  await scratch.deploymentTransaction().wait(5);

  // Verifica o contrato
  await hre.run("verify:verify", {
    address: address,
    constructorArguments: [
      scratchPrice,
      prizeAmount,
      odds,
    ],
  });

  console.log("✅ Verificação concluída!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
