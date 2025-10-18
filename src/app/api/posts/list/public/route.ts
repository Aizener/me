import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const page = Number(params.get('page')) || 1;
    const pageSize = Number(params.get('pageSize')) || 10;
    const postCategoryId = params.get('postCategoryId');

    const whereCondition = {
      published: true,
      ...(postCategoryId ? { postCategoryId } : {}),
    };

    const data = await prisma.post.findMany({
      where: whereCondition,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        author: true,
        postCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.post.count({
      where: whereCondition,
    });

    return NextResponse.json({
      status: 200,
      data: [data, total],
      success: true,
      message: 'ok',
    });
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return NextResponse.json({
      status: 500,
      success: false,
      data: null,
      message: errMsg,
    });
  }
}
