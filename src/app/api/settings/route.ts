import { createId } from '@paralleldrive/cuid2';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

import {
  responseError,
  responseJSON,
  SERVER_ERROR_STATUS,
} from '@/lib/api-server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findMany();
    return responseJSON(settings);
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}

export async function POST(request: NextRequest) {
  try {
    const bodyData = await request.json();

    const ids: string[] = [];
    const updates: string[] = [];
    const adds: string[] = [];

    for (const key in bodyData) {
      const item = bodyData[key];
      if (item.id) {
        ids.push(`'${item.id}'`);
        updates.push(`WHEN id = '${item.id}' THEN '${item.value}'`);
      } else {
        adds.push(
          `('${createId()}', '${item.name}', '${item.title}', '${item.value}')`
        );
      }
    }

    const updateSettings =
      updates.length > 0
        ? await prisma.$executeRawUnsafe(`
            Update "Settings"
            SET content = CASE ${updates.join(' ')} END
            WHERE id IN (${ids.join(', ')});
          `)
        : null;
    const addSettings =
      adds.length > 0
        ? await prisma.$executeRawUnsafe(`
            INSERT INTO "Settings" (id, name, title, content)
            VALUES ${adds.join(', ')};
          `)
        : null;

    revalidatePath('/');
    return responseJSON({
      addSettings,
      updateSettings,
    });
  } catch (err: unknown) {
    const errMsg = (err as { message: string }).message;
    return responseError(SERVER_ERROR_STATUS, errMsg);
  }
}
