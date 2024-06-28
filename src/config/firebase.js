import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuflf3i3mSmluOk87rxR9L97kr0J7FAcY",
  authDomain: "wallet-backupper.firebaseapp.com",
  projectId: "wallet-backupper",
  storageBucket: "wallet-backupper.appspot.com",
  messagingSenderId: "152648064697",
  appId: "1:152648064697:web:eb48b42518a21fd792c568",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
export { app, auth, storage, db };
