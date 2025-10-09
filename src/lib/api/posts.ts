import { requestGet, requestPost, requestPut } from '../request';

export interface QueryPostType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: Record<string, string>;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostType {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export interface EditPostType {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export const queryPublicPostsList = async () => {
  const res = await requestGet<[QueryPostType[], number]>('/api/posts/list/public');
  return res;
};

export const queryPostsList = async () => {
  const res = await requestGet<[QueryPostType[], number]>('/api/posts/list');
  return res;
};

export const addPost = async (post: CreatePostType) => {
  const res = await requestPost<QueryPostType[]>('/api/posts', post);
  return res;
};

export const editPost = async (post: EditPostType) => {
  const res = await requestPut<QueryPostType[]>('/api/posts', post);
  return res;
};

export const queryPostDetail = async (id: string) => {
  return requestGet<QueryPostType>('/api/posts', { id });
};