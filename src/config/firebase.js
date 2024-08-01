import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdRlH1jlcvvl3Uju2trFPOlyxuo4JmU6A",
  authDomain: "tanstack-fetch.firebaseapp.com",
  databaseURL: "https://tanstack-fetch-default-rtdb.firebaseio.com",
  projectId: "tanstack-fetch",
  storageBucket: "tanstack-fetch.appspot.com",
  messagingSenderId: "52254064703",
  appId: "1:52254064703:web:3634c16fdd8fcdd8fbb88a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
export { app, auth, storage, db };
