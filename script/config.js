import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCjHqafXimIeKaFza8i0rz2G0Iip0-nXbo",
    authDomain: "pblogingapp.firebaseapp.com",
    projectId: "pblogingapp",
    storageBucket: "pblogingapp.appspot.com",
    messagingSenderId: "664183224938",
    appId: "1:664183224938:web:43a22739b2e23c87472813",
    measurementId: "G-SFJJH37ZSC"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);