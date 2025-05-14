# 🎰 PoolLuck Raspadinha (Frontend)

Frontend completo para o projeto PoolLuck Raspadinha, desenvolvido com React + Hardhat + Vite, com integração Web3 via MetaMask e deploy de contrato na rede Polygon Amoy.

---

## 🚀 Tecnologias Utilizadas

- React + Vite
- Ethers.js
- Hardhat
- Solidity (Smart Contracts)
- Polygon (Amoy Testnet)
- MetaMask
- Confetti / Partículas animadas

---

## 📂 Estrutura do Projeto

poolluck-frontend/
├── public/
│ └── index.html
├── src/
│ ├── App.jsx
│ ├── PoolLuckScratchABI.json
│ └── components/
│ └── ScratchCard.jsx
├── contracts/
│ └── PoolLuckScratch.sol
├── scripts/
│ └── deployScratch.js
├── test/
│ └── PoolLuckScratchTest.js
├── hardhat.config.js
└── README.md

yaml
Copiar
Editar

---

## 🛠 Funcionalidades

- Compra de raspadinhas via carteira MetaMask
- Sorteio com base em `block.prevrandao` (pseudo-aleatório)
- Prêmio em MATIC enviado automaticamente ao ganhador
- Confete e partículas quando o usuário ganha
- Admin pode configurar preço, prêmio e odds

---

## 🔧 Como rodar localmente

```bash
npm install
npm run dev
📦 Deploy do contrato
bash
Copiar
Editar
npx hardhat run scripts/deployScratch.js --network amoy
🔗 Deploys
✅ Contrato deployado em: 0x1666fA0b1E72a6203F111219283F00979382BaE9

✅ Rede: Polygon Amoy

👨‍💻 Desenvolvido por
Projeto de aprendizado e gamificação Web3.
Componente visual e frontend guiado por IA, conectado com smart contract 100% funcional.

📬 Contato
📧 contato@poolluck.com
🌐 https://poolluck.com (em breve)

yaml
Copiar
Editar

---
