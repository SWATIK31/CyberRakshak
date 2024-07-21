import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './Firebase';

export const doCreateUserWithEmailAndPassword = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

export const doSignInWithEmailAndPassword = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const doSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const doSignOut = () => signOut(auth);

export const doPasswordReset = (email) => 
  sendPasswordResetEmail(auth, email);

export const doPasswordChange = (password) => 
  updatePassword(auth.currentUser, password);

export const doSendEmailVerification = () => 
  sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });

export { GoogleAuthProvider };