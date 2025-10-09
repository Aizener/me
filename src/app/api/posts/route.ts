import { NextRequest } from 'next/server';

import { CLIENT_QUERY_ERROR_STATUS, responseError, responseJSON, SERVER_ERROR_STATUS } from '@/lib/api-server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, 'Not available id.');
    }
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
    return responseJSON(post);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const post = await prisma.post.create({
      data: bodyData
    });

    return responseJSON(post);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...bodyData} = await request.json();
    const post = await prisma.post.update({
      where: { id },
      data: bodyData
    });

    return responseJSON(post);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}
