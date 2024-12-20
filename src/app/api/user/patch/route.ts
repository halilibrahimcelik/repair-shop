import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const { userId, data, accessToken } = await req.json();
    if (!userId || !data || !accessToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(
      `${process.env.KINDE_DOMAIN}/api/v1/user?id=${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ data }),
      }
    );

    if (!apiResponse.ok) {
      const error = await apiResponse.json();
      return NextResponse.json({ error }, { status: apiResponse.status });
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
