import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const rateLimits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    
    let rateData = rateLimits.get(ip) || { count: 0, windowStart: now };
    
    if (now - rateData.windowStart > WINDOW_MS) {
      rateData = { count: 0, windowStart: now };
    }
    
    if (rateData.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    if (!body || typeof body.password !== 'string') {
      return NextResponse.json({ error: 'Malformed request' }, { status: 400 });
    }

    const { password } = body;
    let hash = process.env.ADMIN_PASSWORD_HASH;
    if (hash) hash = hash.trim();
    const secretKey = process.env.ADMIN_SESSION_SECRET;


    if (!hash || !secretKey) {
      console.error('Missing admin auth environment variables.');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      rateData.count += 1;
      rateLimits.set(ip, rateData);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Success, reset rate limit
    rateLimits.delete(ip);

    // Create JWT
    const secret = new TextEncoder().encode(secretKey);
    const alg = 'HS256';
    
    const jwt = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set('admin_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// touch for HMR
