import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD81TZG-O3CGeydmH0MOAdisnXtKLpU1sI",
    authDomain: "tonepick0505.firebaseapp.com",
    projectId: "tonepick0505",
    storageBucket: "tonepick0505.firebasestorage.app",
    messagingSenderId: "287063332474",
    appId: "1:287063332474:web:93f7e5d386c74d7fb58dc3",
    measurementId: "G-VQVW5ZFWG8"
};

const app = initializeApp(firebaseConfig);

// ✅ 이게 핵심!
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
