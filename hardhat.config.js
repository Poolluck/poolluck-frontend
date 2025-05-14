require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygonAmoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/B8E-KXbJwRuoagpYGyD8-vw7BMr6RJ9K", // URL do seu projeto Alchemy Amoy
      accounts: ["53cda459d037331aef0d6fe9defbcd055ad6f059617a715b3103bbad3ec84989"], // ⚠️ Nunca compartilhar sua chave privada real!
    }
  }
};
