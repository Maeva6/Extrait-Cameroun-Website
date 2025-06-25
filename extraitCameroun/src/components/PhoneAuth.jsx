// src/components/PhoneAuth.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // 1️⃣ Initialise invisible reCAPTCHA
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA validé");
      },
    });
  };

  // 2️⃣ Envoie du SMS
  const handleSendCode = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert("Code envoyé !");
    } catch (err) {
      console.error("Erreur d'envoi :", err.message);
    }
  };

  // 3️⃣ Vérification de l’OTP
  const handleVerifyCode = async () => {
    try {
      const res = await confirmationResult.confirm(otp);
      const user = res.user;

      const token = await user.getIdToken(); // 🔐 Token JWT à envoyer au backend Laravel
      alert("Connexion réussie !");

      console.log("Token :", token); // Tu l’enverras au backend ensuite
    } catch (err) {
      alert("Code invalide !");
    }
  };

  return (
    <div>
      <h2>Connexion par téléphone</h2>
      <input
        type="text"
        placeholder="Numéro (+2376...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendCode}>Envoyer le code</button>

      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Code reçu par SMS"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Vérifier le code</button>
        </>
      )}
    </div>
  );
}

export default PhoneAuth;
