import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

import { 
  getFirestore, 
  doc,
  getDoc,
  setDoc 
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcLe_YcupCWTdKEbcZ_dFoLfyDuIC503Q",
  authDomain: "smol-fd50e.firebaseapp.com",
  projectId: "smol-fd50e",
  storageBucket: "smol-fd50e.appspot.com",
  messagingSenderId: "865615069519",
  appId: "1:865615069519:web:abeb35627bdfd0c7f5453a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); 

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create user documents
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); 
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());
  
  //if user data does not exist
  if(!userSnapshot.exists()) {
    const {  displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  //if user data exists
  // return userDocRef
  return userDocRef; 


  

};