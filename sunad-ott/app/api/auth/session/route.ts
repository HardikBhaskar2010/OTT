import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

// 5 days expiration time in milliseconds
const EXPIRES_IN = 60 * 60 * 24 * 5 * 1000;
const COOKIE_NAME = 'session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const idToken = body?.idToken;

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid ID token' }, { status: 400 });
    }

    // Create Firebase session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: EXPIRES_IN });

    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({ status: 'success' });
    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionCookie,
      maxAge: EXPIRES_IN / 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create session cookie';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ status: 'success' });
    response.cookies.set({
      name: COOKIE_NAME,
      value: '',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to clear session cookie';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
