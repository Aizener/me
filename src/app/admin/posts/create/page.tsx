'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Eye, EyeClosed, Loader2Icon, SendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  addPost,
  CreatePostType,
  editPost,
  queryPostDetail,
} from '@/lib/api/posts';
import { getQiniuToken } from '@/lib/api/upload';
import { updloadFileToQiniu } from '@/lib/qiniu-upload';

import PostCategories from '../_components/post-categories';
import PostPreview from '../_components/post-preview';

const schema = z.object({
  title: z.string().min(4).max(30),
  content: z.string().min(1),
  published: z.boolean(),
  postCategoryId: z.string().min(1),
});

function BlogCreatePage() {
  const session = useSession();
  const router = useRouter();
  const seachParams = useSearchParams();
  const id = seachParams.get('id') as string;
  const [pasteLoading, setPasteLoading] = useState(false);

  const { data, isPending: isLoadingData } = useQuery({
    queryKey: ['postsDetail', id],
    queryFn: () => queryPostDetail(id),
    enabled: !!id,
  });

  const [isPreview, setPreview] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationKey: [id ? 'editPost' + id : 'createPost'],
    mutationFn: (formData: CreatePostType) => {
      if (id) {
        return editPost({ ...formData, id });
      }
      return addPost(formData);
    },
  });

  const {
    control,
    reset,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      published: false,
    },
  });

  useEffect(() => {
    if (data?.data && id) {
      reset(data.data);
    } else {
      reset({ title: '', content: '', published: false, postCategoryId: '' });
    }
  }, [id, data, reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const authorId = session.data?.user?.id;
    if (!authorId) return;

    mutate(
      { ...data, authorId },
      {
        onSuccess: () => {
          reset();
          router.replace('/admin/posts/list');
        },
      }
    );
  };

  const onPasteContent = async (
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    setPasteLoading(true);
    try {
      const pasteData = e.clipboardData;
      const editor = document.getElementById('editor') as HTMLTextAreaElement;
      if (pasteData.items[0].type.startsWith('image/')) {
        e.preventDefault();
        const file = pasteData.items[0].getAsFile();
        if (file) {
          const { data: token } = await getQiniuToken();
          const res = await updloadFileToQiniu({
            file,
            token,
            fileName: Date.now().toString() + (file.name ?? ''),
          });
          const markdown = `\n![alt](${`${process.env.NEXT_PUBLIC_QINIU_URL}/${res.key}`})\n\n`;
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          const text = editor.value;
          editor.value = text.slice(0, start) + markdown + text.slice(end);

          // 调整光标位置
          editor.selectionStart = editor.selectionEnd = start + markdown.length;
        }
      }
    } finally {
      setPasteLoading(false);
    }
  };

  return (
    <>
      {id && isLoadingData ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col gap-y-2 rounded-md border border-gray-200 p-4 shadow">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-foreground/80 text-lg font-bold">
              创建博客文章
            </h2>
            <Button
              variant="ghost"
              className="flex cursor-pointer items-center gap-x-2"
              onClick={() => setPreview(!isPreview)}
            >
              {isPreview ? <EyeClosed /> : <Eye />}
              <span className="text-foreground/80 text-sm font-bold">
                {isPreview ? '编辑' : '预览'}
              </span>
            </Button>
          </div>

          <Card className="border-none p-0 shadow-none!">
            <CardHeader>
              <CardTitle>请在下面进行文章编辑</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <p className="pl-1 text-sm font-bold">文章标题</p>
                  <Input
                    placeholder="请输入文章标题"
                    className="mt-2"
                    {...register('title')}
                  />
                  <p className="text-sm font-bold text-red-500">
                    {errors?.title && '* 请输入4-30字的文章标题'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="pl-1 text-sm font-bold">文章内容</p>
                  <div className="relative mt-2 h-64 w-full">
                    <Textarea
                      id="editor"
                      placeholder="请输入文章内容"
                      className="h-full w-full resize-none"
                      {...register('content')}
                      contentEditable={true}
                      onPaste={onPasteContent}
                    />
                    {pasteLoading && (
                      <div className="absolute top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/80 text-white">
                        <div className="flex items-center gap-x-2 text-sm">
                          <Loader2Icon className="animate-spin" />
                          <span>粘贴中...</span>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-2 cursor-pointer"
                          type="button"
                          onClick={() => setPasteLoading(false)}
                        >
                          取消
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-red-500">
                    {errors?.content && '* 请输入文章内容'}
                  </p>
                </div>
                <div className="flex cursor-pointer items-center gap-x-2 select-none">
                  <Controller
                    name="published"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <p
                          className="pl-1 text-sm font-bold"
                          onClick={() => field.onChange(!field.value)}
                        >
                          直接发布：
                        </p>
                        <Switch
                          checked={field.value}
                          className="cursor-pointer"
                          onCheckedChange={field.onChange}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="flex cursor-pointer items-center gap-x-2 select-none">
                  <p className="pl-1 text-sm font-bold">分类选择：</p>
                  <Controller
                    name="postCategoryId"
                    control={control}
                    render={({ field }) => (
                      <PostCategories
                        id={field.value}
                        onSelect={(id) => field.onChange(id)}
                      />
                    )}
                  ></Controller>
                  <p className="text-sm font-bold text-red-500">
                    {errors?.postCategoryId && '* 请选择分类'}
                  </p>
                </div>

                <div>
                  <Button type="submit" className="w-full" size="lg">
                    {isPending ? (
                      <>
                        <Loader2Icon className="animate-spin" />
                        <span>提交中...</span>
                      </>
                    ) : (
                      <>
                        <span>保存文章</span>
                        <SendHorizontal />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <PostPreview
            className={isPreview ? 'block' : 'hidden'}
            title={getValues('title')}
            content={getValues('content')}
            onClose={() => setPreview(false)}
          />
        </div>
      )}
    </>
  );
}

export default BlogCreatePage;
