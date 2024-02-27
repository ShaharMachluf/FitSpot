import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuLpHXMN23ZBUsf3Zj8acvJAkX42ytNvo",
  authDomain: "fitspot-9b4e4.firebaseapp.com",
  projectId: "fitspot-9b4e4",
  storageBucket: "fitspot-9b4e4.appspot.com",
  messagingSenderId: "821016106919",
  appId: "1:821016106919:web:7fed3d08443a7b95aa4882"
};


const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const database: Firestore = getFirestore(app);