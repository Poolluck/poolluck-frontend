import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PoolLuckScratchABI from "../PoolLuckScratchABI.json";

function ScratchCard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [scratchPrice, setScratchPrice] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x1666fA0b1E72a6203F111219283F00979382BaE9"; // Endereço do contrato

  useEffect(() => {
    if (window.ethereum) {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(_provider);
    } else {
      alert("MetaMask não encontrada! Instale para usar o site.");
    }
  }, []);

  async function connectWallet() {
    try {
      await provider.send("eth_requestAccounts", []);
      const _signer = await provider.getSigner();
      setSigner(_signer);

      const _contract = new ethers.Contract(contractAddress, PoolLuckScratchABI, _signer);
      setContract(_contract);

      const price = await _contract.scratchPrice();
      setScratchPrice(ethers.formatEther(price));

      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function buyScratch() {
    try {
      setLoading(true);
      setMessage("");
      const tx = await contract.playScratch({
        value: ethers.parseEther(scratchPrice),
      });
      await tx.wait();
      setMessage("🎉 Raspadinha comprada! Boa sorte!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro ao comprar raspadinha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎰 PoolLuck Raspadinha</h1>

        {!walletConnected ? (
          <button style={styles.button} onClick={connectWallet}>
            Conectar Carteira
          </button>
        ) : (
          <>
            <p style={styles.price}>
              💵 Preço da Raspadinha: <strong>{scratchPrice}</strong> MATIC
            </p>
            <button style={styles.button} onClick={buyScratch} disabled={loading}>
              {loading ? (
                <div style={styles.spinner}></div>
              ) : (
                "Comprar Raspadinha"
              )}
            </button>

            {message && <p style={styles.message}>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#ff5722",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    marginTop: "20px",
    marginBottom: "10px",
    minWidth: "200px",
  },
  price: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  message: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#444",
  },
  spinner: {
    width: "24px",
    height: "24px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #ff5722",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
};

// Animação CSS do Spinner
const styleSheet = document.styleSheets[0];
const keyframes =
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  };
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default ScratchCard;
