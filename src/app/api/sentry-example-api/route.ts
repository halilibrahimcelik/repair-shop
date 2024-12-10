import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// A faulty API route to test Sentry's error monitoring
export function GET() {
  // throw new Error('Sentry Example API Route Error test');
  return NextResponse.json(
    { error: 'Getting new Error...' },
    {
      status: 500,
    }
  );
}
