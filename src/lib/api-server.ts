import { NextResponse } from 'next/server';

export const CLIENT_QUERY_ERROR_STATUS = 400;
export const SERVER_ERROR_STATUS = 500;

export const responseJSON = (data: unknown) => {
  return NextResponse.json({
    status: 200,
    data,
    success: true,
    message: 'ok',
  });
};

export const responseError = (status: number, errMsg: string) => {
  return NextResponse.json({
    status,
    success: true,
    data: null,
    message: errMsg || 'Server Error.',
  });
};
