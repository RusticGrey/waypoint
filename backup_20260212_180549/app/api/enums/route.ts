import { NextResponse } from 'next/server';
import { getEnumValues } from '@/lib/utils/enums';

export async function GET(req: Request) {
  try {
    const enums = getEnumValues();
    return NextResponse.json(enums);
  } catch (error) {
    console.error('Enums fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enums' },
      { status: 500 }
    );
  }
}
