import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOfLpRthef3eKhjQcAsF10sl3Iv0iVL3k",
  authDomain: "mh-yh-wedding.firebaseapp.com",
  projectId: "mh-yh-wedding",
  storageBucket: "mh-yh-wedding.firebasestorage.app",
  messagingSenderId: "135079296335",
  appId: "1:135079296335:web:5139d02e3922296c51193a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
