import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PoolLuckScratchABI from "./PoolLuckScratchABI.json";
import { FaWallet } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Confetti from "react-confetti";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [scratchPrice, setScratchPrice] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const contractAddress = "0x1666fA0b1E72a6203F111219283F00979382BaE9"; // seu contrato

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
      setLoading(true);
      await provider.send("eth_requestAccounts", []);
      const _signer = await provider.getSigner();
      setSigner(_signer);

      const _contract = new ethers.Contract(contractAddress, PoolLuckScratchABI, _signer);
      setContract(_contract);

      const price = await _contract.scratchPrice();
      setScratchPrice(ethers.formatEther(price));

      setWalletConnected(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function buyScratch() {
    try {
      setLoading(true);
      setMessage("Comprando raspadinha...");
      const tx = await contract.playScratch({
        value: ethers.parseEther(scratchPrice),
      });
      await tx.wait();
      setMessage("🎉 Raspadinha comprada! Boa sorte!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // confete dura 5 segundos
    } catch (error) {
      console.error(error);
      setMessage("Erro ao comprar raspadinha.");
    }
    setLoading(false);
  }

  // Configurar partículas animadas
  async function particlesInit(engine) {
    await loadFull(engine);
  }

  return (
    <div style={styles.container}>
      {showConfetti && <Confetti />}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            color: { value: ["#FFD700", "#FFFFFF", "#FFEA00"] },
            move: { enable: true, speed: 1 },
            size: { value: { min: 1, max: 3 } },
            number: { value: 80 },
            opacity: { value: 0.7 },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div style={styles.content}>
        <h1 style={styles.title}>PoolLuck Raspadinha 🎰</h1>
        <p style={styles.subtitle}>Ganhe prêmios incríveis em MATIC! 🚀</p>

        {!walletConnected ? (
          <button style={styles.button} onClick={connectWallet} disabled={loading}>
            {loading ? <ImSpinner2 className="spin" /> : <><FaWallet /> Conectar Carteira</>}
          </button>
        ) : (
          <>
            <p style={styles.price}>🎟️ Preço da Raspadinha: <strong>{scratchPrice}</strong> MATIC</p>
            <button style={styles.button} onClick={buyScratch} disabled={loading}>
              {loading ? <ImSpinner2 className="spin" /> : "Comprar Raspadinha"}
            </button>
            <p style={styles.message}>{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f2c, #050716)",
    overflow: "hidden",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    zIndex: 1,
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(10, 15, 44, 0.8)",
    borderRadius: "20px",
    border: "2px solid #ffd700",
    boxShadow: "0 0 20px #ffd700",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#cccccc",
  },
  button: {
    backgroundColor: "#ffd700",
    color: "#0a0f2c",
    border: "none",
    padding: "15px 30px",
    fontSize: "1.2rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  price: {
    fontSize: "1.5rem",
    marginTop: "20px",
  },
  message: {
    fontSize: "1.2rem",
    marginTop: "20px",
    color: "#00ff99",
  },
};

const style = document.createElement("style");
style.innerHTML = 
  .spin {
    animation: spin 1s linear infinite;
    font-size: 1.5rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
;
document.head.appendChild(style);

export default App;
