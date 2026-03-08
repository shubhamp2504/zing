import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET?.trim();

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password?: string };

  if (!ADMIN_SECRET || !password || password !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set('zing-admin-auth', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete('zing-admin-auth');
  return res;
}
