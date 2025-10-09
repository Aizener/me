import { requestGet, requestPost } from '../request';

export type QueryWebsiteSettings = {
  id: string;
  name: string;
  title: string;
  content: string;
};

export interface CreateWebsiteSettings {
  [key: string]: unknown
};
export const getWebsiteSettings = async () => {
  const res = await requestGet<QueryWebsiteSettings[]>('/api/settings');
  return res;
};

export const createWebsiteSettings = async (createDto: CreateWebsiteSettings) => {
  const res = await requestPost<QueryWebsiteSettings[]>('/api/settings', createDto);
  return res;
};