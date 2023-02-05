// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBitEyR12L9wPUt586Nw-3dML5FSDWavss",
  authDomain: "realtor-clone-react-cedd1.firebaseapp.com",
  projectId: "realtor-clone-react-cedd1",
  storageBucket: "realtor-clone-react-cedd1.appspot.com",
  messagingSenderId: "224373972650",
  appId: "1:224373972650:web:a1907040e40d3730f87ad3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();