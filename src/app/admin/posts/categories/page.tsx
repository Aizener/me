'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  addPostCategory,
  editPostCategory,
  queryPostCategory,
  QueryPostCategoryType,
} from '@/lib/api/posts';

function PostCatgories() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [dialog, setDialog] = useState(false);
  const currentItem = useRef<QueryPostCategoryType>(null);

  const { data, isPending: isQueryPending } = useQuery({
    queryKey: ['postCategoriesList'],
    queryFn: queryPostCategory,
  });

  const total = useMemo(
    () =>
      data ? data.data.reduce((res, item) => (res += item._count.posts), 0) : 0,
    [data]
  );

  const { mutate, isPending: isMutatePending } = useMutation({
    mutationKey: [
      currentItem.current
        ? `updateCategory_${currentItem.current.id}`
        : 'addPostCategory',
    ],
    mutationFn: async (form: { title: string; name: string }) => {
      if (currentItem.current) {
        await editPostCategory({ id: currentItem.current.id, ...form });
      } else {
        await addPostCategory(form);
      }
      setName('');
      setTitle('');
      setDialog(false);
      queryClient.invalidateQueries({ queryKey: ['postCategoriesList'] });
    },
  });

  const addCategory = () => {
    if (isMutatePending) {
      return;
    }
    if (name.trim() === '' || title.trim() === '') {
      toast.warning('名称和标题不能为空');
      return;
    }
    mutate(
      { title, name },
      {
        onSuccess: () => {
          toast.success('添加成功');
        },
        onError: (error) => {
          toast.error(error?.message || '添加失败');
        },
      }
    );
  };

  const handleEdit = () => {
    if (isMutatePending) {
      return;
    }
    if (name.trim() === '' || title.trim() === '') {
      toast.warning('名称和标题不能为空');
      return;
    }
    mutate(
      { title, name },
      {
        onSuccess: () => {
          toast.success('保存成功');
        },
        onError: (error) => {
          toast.error(error?.message || '保存失败');
        },
      }
    );
  };

  const handleDelete = () => {};

  const onOperate = (type: string, item: QueryPostCategoryType) => {
    currentItem.current = item;
    switch (type) {
      case 'edit':
        setName(item.name);
        setTitle(item.title);
        setDialog(true);
        break;
      case 'delete':
        handleDelete();
        break;
    }
  };

  const handleSave = () => {
    if (currentItem.current) {
      handleEdit();
    } else {
      addCategory();
    }
    setDialog(false);
  };

  return (
    <div>
      <h1 className="text-2xl">文章分类管理</h1>
      <div className="flex justify-end gap-x-2 py-4">
        <Button
          className="cursor-pointer"
          onClick={() => {
            currentItem.current = null;
            setDialog(true);
          }}
        >
          添加
        </Button>
      </div>
      <Separator />
      <Table>
        <TableCaption>—— · 所有文章的总分类 · ——</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">名称</TableHead>
            <TableHead>标题</TableHead>
            <TableHead className="text-right">文章数量</TableHead>
            <TableHead className="w-[200px] text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isMutatePending || isQueryPending ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Loading />
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="text-right">
                  {item._count.posts}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="primary" size="sm">
                        操作
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onSelect={() => onOperate('edit', item)}
                        >
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => onOperate('delete', item)}
                        >
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>文章总数</TableCell>
            <TableCell className="text-right">{total}</TableCell>
            <TableCell className="text-right">-</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="w-96">
          <DialogTitle>文章分类</DialogTitle>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <span className="w-28 text-sm font-bold">分类名称：</span>
              <Input
                placeholder="请输入分类名称..."
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <span className="w-28 text-sm font-bold">分类标题：</span>
              <Input
                placeholder="请输入分类标题..."
                value={title}
                onInput={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostCatgories;
