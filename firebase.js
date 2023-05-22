import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Add your Firebase configuration details here
  apiKey: "AIzaSyC1nk2_mSY7r3CJ5mVI-NBdHtJwSaZvaO0",
  authDomain: "aers-accident-detection.firebaseapp.com",
  projectId: "aers-accident-detection",
  storageBucket: "aers-accident-detection.appspot.com",
  messagingSenderId: "587837210170",
  appId: "1:587837210170:web:4282633bf59dd9902eff03",
  measurementId: "G-MVRCGNTZY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a Firestore reference
const firestore = getFirestore(app);

export { firestore };
