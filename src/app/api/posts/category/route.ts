import { NextRequest } from 'next/server';

import {
  CLIENT_QUERY_ERROR_STATUS,
  responseError,
  responseJSON,
  SERVER_ERROR_STATUS,
} from '@/lib/api-server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.postCategory.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return responseJSON(categories);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const { name, title } = bodyData;
    if (name.trim().length === 0 || title.trim().length === 0) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '名称和标题不能为空。');
    }

    const nameOrTitleExists = await prisma.postCategory.findFirst({
      where: {
        OR: [{ name }, { title }],
      },
    });
    if (nameOrTitleExists) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '名称或标题已存在。');
    }

    const category = await prisma.postCategory.create({
      data: { name, title },
    });

    return responseJSON(category);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const { id, name, title } = bodyData;
    if (!id) {
      return responseError(
        CLIENT_QUERY_ERROR_STATUS,
        '请传入文章分类唯一标识！'
      );
    }

    if (name.trim().length === 0 || title.trim().length === 0) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '名称和标题不能为空。');
    }

    const existCategory = await prisma.postCategory.findUnique({
      where: { id },
    });

    if (!existCategory) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '该分类已经不存在！');
    }

    const nameOrTitleExists = await prisma.postCategory.findFirst({
      where: {
        id: { not: existCategory.id },
        OR: [{ name }, { title }],
      },
    });

    if (nameOrTitleExists) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '名称或标题已存在。');
    }

    const category = await prisma.postCategory.update({
      where: { id: existCategory.id },
      data: {
        name: name || existCategory.name,
        title: title || existCategory.title,
      },
    });

    return responseJSON(category);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}
