'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { queryPostCategory } from '@/lib/api/posts';

function PostCategories({
  id,
  onSelect,
}: {
  id: string;
  onSelect: (id: string) => void;
}) {
  const { data: categoryData, isPending: isPendingCategory } = useQuery({
    queryKey: ['queryCategoryData'],
    queryFn: queryPostCategory,
  });
  const getTitle = useMemo(() => {
    const title = categoryData?.data.find((item) => item.id === id)?.title;
    return title ? ` -> ${title}` : '';
  }, [categoryData?.data, id]);
  return (
    <>
      {isPendingCategory ? (
        <Loading showText={false} />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="border border-gray-200">
              <span>
                请选择分类
                {getTitle}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {categoryData?.data.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onSelect={() => onSelect(item.id)}
                >
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default PostCategories;
