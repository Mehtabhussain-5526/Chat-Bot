import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_ACCESS_KEY_FIREBASE,
  authDomain: "gpt-clone-mehtab.firebaseapp.com",
  projectId: "gpt-clone-mehtab",
  storageBucket: "gpt-clone-mehtab.appspot.com",
  messagingSenderId: "1061013155598",
  appId: "1:1061013155598:web:a830a7a59bf9e2c80bb15f",
  measurementId: "G-1YBCTVQJG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);