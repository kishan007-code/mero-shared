import React, { useEffect, useRef, useState } from "react";
import { color, motion } from "framer-motion";
import "./index.css";

/**
 * Prank IPO React App (no Tailwind)
 * - Fake captcha, BOID input, company select
 * - One click beep sound when hitting View Result
 * - Small result card animation (framer-motion)
 * - Disclaimer: parody only
 */

export default function App() {
  const [company, setCompany] = useState("Jhapa Energy Limited (General)");
  const [boid, setBoid] = useState("");
  const [captcha, setCaptcha] = useState({ question: "2 + 3", answer: 5 });

const [captchaInput, setCaptchaInput] = useState("");

const [captchaClickCount, setCaptchaClickCount] = useState(0);
  const [prankMode, setPrankMode] = useState(true);
  const [result, setResult] = useState(null); // { type: 'green'|'red', text: string }
    const [open, setOpen] = useState(false); // dropdown open/close

  const [boidHistory, setBoidHistory] = useState([]);
  const audioCtxRef = useRef(null);

  function refreshCaptcha() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  setCaptcha({ question: `${a} + ${b}`, answer: a + b });
  setCaptchaInput(""); // clear input
}
 const companies = [
    "Jhapa Energy Limited (General)",
    "Bungal Hydro Limited (General Public)",
    "Bandipur Cable Car and Tourism Ltd (General Public)",
    "Nepal Infrastructure Bank Limited",
    "Chandragiri Hills Limited",
    "Greenlife Hydropower Limited",
    "Chandragiri Hills Limited (Local Area)",
    "Prabhu Life Insurance Limited",
    "8.5% BOK Debenture 2086",
    "NIC Asia Dynamic Debt Fund",
    "Mountain Energy Nepal Limited",
    "Sanima General Insurance Limited",
    "Liberty Energy Company Limited",
    "Reliance Life Insurance Limited",
    "Laxmi Unnati Kosh",
    "Trade Tower Limited",
    "Unilever Ltd",
    "NTC-corp",
    "KP Woli-exp",
    "Balen-Dozer",
    "Harka-GreenT",
  ];
  function playClickSound() {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        audioCtxRef.current = null;
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.linearRampToValueAtTime(0.12, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.00001, now + 0.14);
    o.start(now);
    o.stop(now + 0.15);
  }

 function playResultSound() {
  const audio = new Audio("/car.mp3"); // public folder root path
  audio.volume = 1;
  audio.play().catch((err) => {
    console.warn("Audio play failed:", err);
  });
}



  function inlineValidateBoid(v) {
    return /^130\d{13}$/.test(v);
  }

function handleView() {
  setCaptchaClickCount(prev => prev + 1);

  if ((captchaClickCount + 1) % 2 === 0) {
    refreshCaptcha();
  }

  if (parseInt(captchaInput) !== captcha.answer) {
        playClickSound(); // keep current beep for wrong captcha
    setResult({ type: "red", text: "Captcha incorrect! Try again." });
    return;
  }

    if (!inlineValidateBoid(boid)) {
          playClickSound(); // keep current beep for wrong BOID
      setResult({ type: "red", text: "Please enter a valid 16-digit BOID starting with 130." });
      return;
    }
 playResultSound();

    setBoidHistory((prev) =>
    prev.includes(boid) ? prev : [...prev, boid].slice(-4) // keep last 4
  );   // store BOID in history before clearing




    if (prankMode) {
      const pranks = [
        "Wash your mouth! What makes you think you'll be allotted? 😂",
        "Dream on. Not today, superstar. 😜",
        "हावा खान्छस्, share हैन! 🤣",
        "Congrats — you won a complimentary 'hope'. Redeem at home.",
        "Allotment? We gave your seat to a lucky potato. Sorry.",
        "Allotment भन्दा त लोटरी जित्ने chance बढी छ तेरो",
        "You're close... to being not-allotted. Haha!",
        "IPO होइन, आशा मात्र बाँडेको हो हामीले। 😜",
        "भाग्य तेरो कपाल झैँ पातलो छ, allotment मा के पाउँछस् र!",

      ];
      const msg = pranks[Math.floor(Math.random() * pranks.length)];
      setResult({ type: "red", text: msg });
    } else {
      const lucky = Math.random() < 0.49;
      if (lucky) {
        const qty = 10;
        setResult({ type: "green", text: `🎉 Congratulations! Allotted qty: ${qty}` });
      } else {
        setResult({ type: "red", text: "Sorry, not alloted for the entered BOID" });
      }
    }
  }






  return (
    <div className="app-root">


      <div className="identity">
  <img
    src="/kbergwhite2.png" 
    alt="Kaishenberg"
    className="identity-photo"
  />
  </div>


      <div className="card">
        <div className="card-header">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <img src="/shared no bg 2.png" alt="MeroSHARED-prank" style={{ width: "200px", height: "auto" }} />
</div>
<p style={{ textAlign: "center", color: "white", marginTop: "-15px", }}>
    Check Share Result
  </p>
        </div>
  {/* Company dropdown */}
        <div className="form-row">
          <div
            className="custom-select"
            onClick={() => setOpen(!open)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <input
              type="text"
              readOnly
              value={company}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", background: "#ffffff", color: "black", outline: "none", fontSize: "14px" }}
            />
            {open && (
              <div
                className="options"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  maxHeight: "260px",
                  overflowY: "auto",
                  background: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  zIndex: 10,
                }}
              >
                {companies.map((c, i) => (
  <div
    key={i}
    className={`option ${c === company ? "selected" : ""}`}
    onClick={() => {
      setCompany(c);
      setOpen(false);
    }}
  >
    {c}
  </div>
))}
             </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <input
             list="boid-history"
            value={boid}
           onChange={(e) => setBoid(e.target.value.replace(/\D/g, "").slice(0, 16))}
    placeholder="16-digit BOID"
    inputMode="numeric"
    style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
    onFocus={(e) => (e.target.style.boxShadow = "0 0 10px #00c19aff")}
    onBlur={(e) => (e.target.style.boxShadow = "none")}
 />
<datalist id="boid-history">
  {boidHistory.map((h, i) => (
    <option key={i} value={h} />
  ))}
</datalist>

        </div>

        <div className="form-row actions" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  {/* Left side: prank mode */}
  <div className="left-inline">
    <label className="inline-label" style={{ color: "white" }}>
      <input
        type="checkbox"
        checked={prankMode}
        onChange={(e) => setPrankMode(e.target.checked)}
      /> 
      Prank mode
    </label>
  </div>

  {/* Right side: captcha */}
  <div className="captcha-box" style={{ display:"flex", alignItems: "center", gap: "10px" }}> <p style={{color:"lightblue", fontWeight:"bold"}}>Solve captcha</p>
    <span style={{ color: "white" }}> {captcha.question} =</span>
    <input
      type="text"
      value={captchaInput}
      onChange={(e) => setCaptchaInput(e.target.value)}
      placeholder="ans"
      style={{ width: "60px", textAlign: "center" }}
    />
  </div>
</div>


        <div>
            <button className="primary" onClick={handleView}  style={{ width: "100%", padding: "10px" }}>View Result</button>
          </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: result ? 1 : 0, y: result ? 0 : -8 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {result && (
            <div className={`result ${result.type === "green" ? "green" : "red"}`}>
              <span>{result.text}</span>
            </div>
          )}
        </motion.div>

        <div className="disclaimer" style={{ marginTop: "20px", textAlign:"center"}}>
    <strong>Disclaimer:</strong> Do not submit real BOIDs here. Only for fun...
  </div>
      </div>
      <div className="footer" style={{fontWeight:"bold"}}>¡Muchísimas gracias!</div>
      
      <p>Support Us:</p>
<div className="social-links">
  <a href="https://www.facebook.com/profile.php?id=61577032744088" target="_blank" rel="noopener noreferrer">
    <img src="/fb.png" alt="Facebook" />
  </a>
  <a href="https://www.instagram.com/kai.se7en/" target="_blank" rel="noopener noreferrer">
    <img src="/inst.png" alt="Instagram" />
  </a>
  <a href="https://www.tiktok.com/@kai7berg" target="_blank" rel="noopener noreferrer">
    <img src="/tkt.png" alt="TikTok" />
  </a>
  <a href="https://wa.me/9868713016" target="_blank" rel="noopener noreferrer">
    <img src="/whasap.png" alt="WhatsApp" />
  </a>
  <a href="https://www.youtube.com/@kaishenberg" target="_blank" rel="noopener noreferrer">
    <img src="/ytb.png" alt="YouTube" />
  </a>
 
  
</div>
    </div>
  );
}
