import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsJKtJEdxRAqZ2xnly5dKe5smWz5cwQq0",
  authDomain: "lakhi-jewellers.firebaseapp.com",
  projectId: "lakhi-jewellers",
  storageBucket: "lakhi-jewellers.firebasestorage.app",
  messagingSenderId: "341087479301",
  appId: "1:341087479301:web:705a3ba146de10a03bde6c",
  measurementId: "G-VLR83PBQMN",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);