import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const FIREBASE_API_KEY = 'AIzaSyB1JcPikn1FreffsEWTJackyOlXOLX1a2Q';
export const FIREBASE_WEB_CLIENT_ID = '247328439601-...apps.googleusercontent.com';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'tonpick-7e5d2.firebaseapp.com',
  projectId: 'tonpick-7e5d2',
  storageBucket: 'tonpick-7e5d2.appspot.com',
  messagingSenderId: '57136543872',
  appId: '1:57136543872:web:9e22af53d6a3d518098e65',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
