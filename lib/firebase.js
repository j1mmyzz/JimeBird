import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtGG3ocMfAPatMofrEWixeOM6gMpXAX0k",
  authDomain: "jimebird.firebaseapp.com",
  projectId: "jimebird",
  storageBucket: "jimebird.firebasestorage.app",
  messagingSenderId: "607329105387",
  appId: "1:607329105387:web:98d4678058b912e66cd5ae",
  measurementId: "G-F0S0DXDKDJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
