import { stringify } from 'qs';

interface Response<T> {
  status: number;
  data: T;
  success: 'ok' | 'fail';
  message: string;
}

export const request = async <T>(
  url: string,
  options: RequestInit & { params?: object }
) => {
  if (options.params) {
    url = `${url}?${stringify(options.params)}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/${url}`, {
    ...options,
    next: { revalidate: 60 },
  }).then(async (res): Promise<Response<T>> => await res.json());

  if (res.status !== 200) {
    return Promise.reject(new Error(res.message));
  }

  return res;
};

export const requestGet = async <T>(url: string, params?: object) =>
  request<T>(url, { method: 'GET', params });
export const requestPost = async <T>(url: string, data?: object) =>
  request<T>(url, { method: 'POST', body: JSON.stringify(data) });
export const requestPut = async <T>(url: string, data?: object) =>
  request<T>(url, { method: 'PUT', body: JSON.stringify(data) });
export const requestDelete = async <T>(url: string, data?: object) =>
  request<T>(url, { method: 'DELETE', body: JSON.stringify(data) });
