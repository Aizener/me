'use client';

import { useEffect } from 'react';
import { remark } from 'remark';
import remarkToc from 'remark-toc';

import { QueryPostType } from '@/lib/api/posts';

function PostCatalog({ post }: { post: QueryPostType }) {
  useEffect(() => {
    const initToc = async () => {};
    initToc();
  }, []);
  return <div>PostCatalog</div>;
}

export default PostCatalog;
