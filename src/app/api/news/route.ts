import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // const { category, country, language, max } = params;
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const country = searchParams.get('country')
  const language = searchParams.get('language')
  const max = searchParams.get('max')

  try {
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=0bdfeb647770c1a299250fa652567d55`);
    const data = await res.json();
    return NextResponse.json(data.articles, { status: 200 });
  } catch (error) {
    console.error('News fetch from GNews failed:', error);
    return NextResponse.json(
      { status: 'ERROR', message: 'News fetch from GNews failed' },
      { status: 500 }
    );
  }
}
