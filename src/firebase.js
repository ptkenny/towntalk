// Import the functions you need from the SDKs you need
import { connectAuthEmulator, getAuth } from '@firebase/auth';
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from '@firebase/functions';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCr0PEu0p-EbfM7vkjWbDtfkF2PFpGWm9w',
	authDomain: 'towntalk-c5955.firebaseapp.com',
	projectId: 'towntalk-c5955',
	storageBucket: 'towntalk-c5955.appspot.com',
	messagingSenderId: '986710036833',
	appId: '1:986710036833:web:30e8f4e3db4459919e3520',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099');
const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, 'localhost', 5001);
export default app;
