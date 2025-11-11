'use client';

import { Loader2Icon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';

function SignInButton() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const pathname = usePathname();

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    // if (email.trim() === '') {
    //   toast.warning('请输入正确的电子邮箱地址！');
    //   return;
    // }
    if (username.trim() === '') {
      toast.warning('请输入正确的用户名！');
      return;
    }
    if (password.trim() === '') {
      toast.warning('请输入正确的用户密码！');
      return;
    }

    setLoading(true);
    const res = await signIn('credentials', {
      callbackUrl: pathname,
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log('front res', res);
    if (!res?.ok) {
      toast.error('登录失败，请检查用户名和密码！');
      return;
    }

    toast.success('登录成功！');
    location.href = '/';
    // signIn('email', {
    //   email,
    //   callbackUrl: pathname,
    // });
  };

  const avoidDefaultDomBehavior = (e: Event) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer font-bold underline"
          // onClick={() => signIn('google')}
        >
          登录
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-100"
        onPointerDownOutside={avoidDefaultDomBehavior}
        onInteractOutside={avoidDefaultDomBehavior}
      >
        <DialogHeader>
          <DialogTitle>用户登入</DialogTitle>
          {/* <DialogDescription>请输入您的电子邮箱</DialogDescription> */}
          <DialogDescription>请输入您的账号信息</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          {/* <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="请输入电子邮件..."
          /> */}
          <Input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="请输入用户名..."
          />
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="请输入用户密码..."
          />
          <Button
            className={cn(
              'mt-4 w-full',
              loading ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            size={'lg'}
            variant={loading ? 'default' : 'primary'}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex items-center gap-x-1">
                <Loader2Icon className="animate-spin" />
                <span>提交中...</span>
              </div>
            ) : (
              '登入'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInButton;
