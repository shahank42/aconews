import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      { status: 'OK', message: 'Service is healthy' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'ERROR', message: 'Service is unhealthy' },
      { status: 500 }
    );
  }
}
