import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVJRjJzyJTI1QqUW397VyYe79OnxGupRc",
  authDomain: "lms-web-337f2.firebaseapp.com",
  projectId: "lms-web-337f2",
  storageBucket: "lms-web-337f2.firebasestorage.app",
  messagingSenderId: "498858318274",
  appId: "1:498858318274:web:aabce5cdc63e19edc6de5b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);