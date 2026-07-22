import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  Auth,
} from 'firebase/auth';

// Validate required Firebase env vars at startup.
// In production this throws immediately so misconfiguration is caught at deploy time,
// not silently at runtime when a user tries to sign in.
function getFirebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (process.env.NODE_ENV === 'production') {
    const missing = [
      !apiKey && 'NEXT_PUBLIC_FIREBASE_API_KEY',
      !authDomain && 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      !projectId && 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    ].filter(Boolean);

    if (missing.length > 0) {
      throw new Error(
        `[Firebase] Missing required environment variables: ${missing.join(', ')}. ` +
        'Set them in your Vercel project settings.'
      );
    }
  } else if (!apiKey) {
    console.warn('[Firebase] NEXT_PUBLIC_FIREBASE_API_KEY not set. Using dev placeholder — auth will not work.');
  }

  return {
    apiKey: apiKey || 'dev-placeholder-api-key',
    authDomain: authDomain || 'sunad-ott.firebaseapp.com',
    projectId: projectId || 'sunad-ott',
    storageBucket: storageBucket || 'sunad-ott.appspot.com',
    messagingSenderId: messagingSenderId || '000000000000',
    appId: appId || '1:000000000000:web:000000000000',
  };
}

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  googleProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
export type { User };
