import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import type { DecodedIdToken } from 'firebase-admin/auth';

const COOKIE_NAME = 'session';

export interface ServerSession {
  uid: string;
  email?: string;
  claims: DecodedIdToken;
}

export async function getSession(): Promise<ServerSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME)?.value || cookieStore.get('__session')?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      claims: decodedClaims,
    };
  } catch (error) {
    console.error('Failed to verify session cookie:', error);
    return null;
  }
}
