import { requestGet, requestPost, requestPut } from '../request';

export interface QueryPostType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: Record<string, string>;
  postCategory: QueryPostCategoryType;
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

export interface QueryPostCategoryType {
  id: string;
  name: string;
  title: string;
  createAt: string;
  updatedAt: string;
  _count: { posts: number };
  posts: QueryPostType[];
}

export const queryPublicPostsList = async (
  conditions: Record<string, string>
) => {
  const res = await requestGet<[QueryPostType[], number]>(
    '/api/posts/list/public',
    conditions
  );
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

export const queryPostCategory = async () => {
  return requestGet<QueryPostCategoryType[]>('/api/posts/category');
};

export const addPostCategory = async (data: {
  name: string;
  title: string;
}) => {
  return requestPost<QueryPostCategoryType>('/api/posts/category', data);
};

export const editPostCategory = async (data: {
  id: string;
  name: string;
  title: string;
}) => {
  return requestPut<QueryPostCategoryType>('/api/posts/category', data);
};
