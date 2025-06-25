// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKYwy-qt48ZWyXsaR36rpXnvNTC70IZoU", //clé API
  authDomain: "extrait-cameroun.firebaseapp.com", // domaine d’authentification 
  projectId: "extrait-cameroun", // ID du projet
  storageBucket: "extrait-cameroun.appspot.com",
  messagingSenderId: "583874540678",// ID de l’expéditeur de messages
  appId: "1:583874540678:web:28866ab62633fe63710d07"// ID de l’application
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportation du service d’authentification
export const auth = getAuth(app);