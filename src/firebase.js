// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ6h7aHTX-JcnDDB4OqtMiEEXr8SDxoHc",
  authDomain: "money-manager-d7856.firebaseapp.com",
  projectId: "money-manager-d7856",
  storageBucket: "money-manager-d7856.firebasestorage.app",
  messagingSenderId: "564704191470",
  appId: "1:564704191470:web:a98537610e52cfb7e964ff"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;