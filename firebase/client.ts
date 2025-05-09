import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsJKtJEdxRAqZ2xnly5dKe5smWz5cwQq0",
  authDomain: "lakhi-jewellers.firebaseapp.com",
  projectId: "lakhi-jewellers",
  storageBucket: "lakhi-jewellers.firebasestorage.app",
  messagingSenderId: "341087479301",
  appId: "1:341087479301:web:705a3ba146de10a03bde6c",
  measurementId: "G-VLR83PBQMN",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
