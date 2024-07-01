import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZA5ro8889LgCV6wXnTwWucKPjFV3R4uw",
  authDomain: "qfsworldsecurityledger.firebaseapp.com",
  databaseURL: "https://qfsworldsecurityledger-default-rtdb.firebaseio.com",
  projectId: "qfsworldsecurityledger",
  storageBucket: "qfsworldsecurityledger.appspot.com",
  messagingSenderId: "970696347346",
  appId: "1:970696347346:web:b4466b053f3b363352270b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
export { app, auth, storage, db };
