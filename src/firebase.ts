import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCWKwTwyxmhFN29frf7evS4Mmih9pYVqzw',
  authDomain: 'our-koma-project.firebaseapp.com',
  databaseURL: 'https://our-koma-project-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'our-koma-project',
  storageBucket: 'our-koma-project.firebasestorage.app',
  messagingSenderId: '399634655022',
  appId: '1:399634655022:web:2dcc479b98a87a8b2ebcbf'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
