import * as admin from 'firebase-admin';
import { config } from './env';

let isInitialized = false;

if (admin.apps.length === 0) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log('[Firebase] Connecting to local Firestore Emulator...');
    admin.initializeApp({ projectId: 'sunad-ott' });
    isInitialized = true;
  } else if (config.firebaseServiceAccountJson) {
    try {
      const serviceAccount = JSON.parse(config.firebaseServiceAccountJson);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      isInitialized = true;
    } catch (error) {
      console.warn(
        '[Firebase] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON. Initializing fallback app.',
        error
      );
      try {
        admin.initializeApp();
        isInitialized = true;
      } catch (fallbackError) {
        console.warn('[Firebase] Fallback initialization error:', fallbackError);
      }
    }
  } else {
    console.warn('[Firebase] FIREBASE_SERVICE_ACCOUNT_JSON not provided. Initializing fallback mode.');
    try {
      admin.initializeApp();
      isInitialized = true;
    } catch (fallbackError) {
      console.warn('[Firebase] Fallback initialization error:', fallbackError);
    }
  }
} else {
  isInitialized = true;
}

export const db: admin.firestore.Firestore | null = isInitialized ? admin.firestore() : null;
if (db) {
  try {
    db.settings({ ignoreUndefinedProperties: true });
  } catch (e) {
    // ignore if already set
  }
}
export const auth: admin.auth.Auth | null = isInitialized ? admin.auth() : null;
export const isFirebaseInitialized = isInitialized;
