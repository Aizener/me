'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Eye, EyeClosed, Loader2Icon, SendHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { addPost, CreatePostType, editPost, queryPostDetail } from '@/lib/api/posts';

import PostPreview from '../_components/post-preview';

const schema = z.object({
  title: z.string().min(4).max(30),
  content: z.string().min(1),
  published: z.boolean()
});

function BlogCreatePage() {
  const session = useSession();
  const router = useRouter();
  const seachParams = useSearchParams();
  const id = seachParams.get('id') as string;

  const { data, isPending: isLoadingData } = useQuery({
    queryKey: ['postsDetail', id],
    queryFn: () => queryPostDetail(id),
    enabled: !!id
  });
  const [isPreview, setPreview] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationKey: [id ? 'editPost' + id : 'createPost'],
    mutationFn: (formData: CreatePostType) => {
      if (id) {
        return editPost({ ...formData, id });
      }
      return addPost(formData);
    }
  });

  const {
    control,
    reset,
    getValues,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      published: false,
    }
  });

  useEffect(() => {
    if (data?.data && id) {
      reset(data.data);
    } else {
      reset({ title: '', content: '', published: false });
    }
  }, [id, data, reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const authorId = session.data?.user?.id;
    if (!authorId) return;

    mutate({ ...data, authorId }, {
      onSuccess: () => {
        reset();
        router.replace('/admin/posts/list');
      }
    });
  };

  return (
    <>
      {
        id && isLoadingData ? <Loading /> : (
          <div className="w-full flex flex-col gap-y-2 border border-gray-200 p-4 rounded-md shadow">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
              <h2 className="text-lg font-bold text-foreground/80">创建博客文章</h2>
              <Button
                variant="ghost"
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => setPreview(!isPreview)}
              >
                {
                  isPreview ? <EyeClosed /> : <Eye />
                }
                <span className="font-bold text-foreground/80 text-sm">
                  {
                    isPreview ? '编辑' : '预览'
                  }
                </span>
              </Button>
            </div>
      
            <Card className="shadow-none! border-none p-0">
              <CardHeader>
                <CardTitle>请在下面进行文章编辑</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <p className="text-sm font-bold pl-1">文章标题</p>
                    <Input
                      placeholder="请输入文章标题"
                      className="mt-2"
                      {...register('title')}
                    />
                    <p className="text-sm text-red-500 font-bold">{errors?.title && '* 请输入4-30字的文章标题'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold pl-1">文章内容</p>
                    <Textarea
                      placeholder="请输入文章内容"
                      className="mt-2 h-64 resize-none"
                      {...register('content')}
                    />
                    <p className="text-sm text-red-500 font-bold">{errors?.content && '* 请输入文章内容'}</p>
                  </div>
                  <div className="flex items-center gap-x-2 cursor-pointer select-none">
                    <Controller
                      name="published"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <Switch
                            checked={field.value}
                            className="cursor-pointer"
                            onCheckedChange={field.onChange}
                          />
                          <p className="text-sm font-bold pl-1" onClick={() => field.onChange(!field.value)}>是否直接发布</p>
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <Button type="submit" className="w-full" size="lg">
                      {
                        isPending ? (
                          <>
                            <Loader2Icon className="animate-spin" />
                            <span>提交中...</span>
                          </>
                        ) : (
                          <>
                            <span>保存文章</span>
                            <SendHorizontal />
                          </>
                        )
                      }
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
        )
      }
    </>
  );
}

export default BlogCreatePage;