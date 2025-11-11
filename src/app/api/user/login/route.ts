import { verify } from 'argon2';
import { NextRequest } from 'next/server';
import z from 'zod';

import {
  CLIENT_QUERY_ERROR_STATUS,
  responseError,
  responseJSON,
  SERVER_ERROR_STATUS,
} from '@/lib/api-server';
import prisma from '@/lib/prisma';

const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const paredData = loginSchema.parse(bodyData);
    const { username, password } = paredData;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '用户不存在！');
    }
    const isValid = await verify(user.password || '', password);
    if (!isValid) {
      return responseError(CLIENT_QUERY_ERROR_STATUS, '用户密码错误！');
    }
    const { id, email, role, name } = user;
    return responseJSON({
      id,
      email,
      role,
      name,
      username,
      password,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const errors = (err as unknown as { issues: Record<string, string>[] })
        .issues;
      console.log('errors.toString()', JSON.stringify(errors));
      return responseError(CLIENT_QUERY_ERROR_STATUS, JSON.stringify(errors));
    }
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}
