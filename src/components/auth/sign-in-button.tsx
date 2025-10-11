'use client';

import { signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  const pathname = usePathname();

  const handleSubmit = () => {
    if (email.trim() === '') {
      toast.warning('请输入正确的电子邮箱地址！');
      return;
    }

    signIn('email', {
      email,
      callbackUrl: pathname,
    });
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
        className="w-80"
        onPointerDownOutside={avoidDefaultDomBehavior}
        onInteractOutside={avoidDefaultDomBehavior}
      >
        <DialogHeader>
          <DialogTitle>用户登入</DialogTitle>
          <DialogDescription>请输入您的电子邮箱</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="请输入电子邮件..."
          />
          <Button
            className="mt-4 w-full"
            size={'lg'}
            variant="primary"
            onClick={handleSubmit}
          >
            发送电子邮件
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInButton;
