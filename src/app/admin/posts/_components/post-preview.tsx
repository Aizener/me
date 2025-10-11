import clsx from 'clsx';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import MarkdownRenderer from '../../../../components/markdown-renderer';

interface PostPreviewProps {
  title: string;
  content: string;
  className?: string;
  onClose?: () => void;
}

function PostPreview({ title, content, className, onClose }: PostPreviewProps) {
  return (
    <div
      className={`bg-background absolute top-0 left-0 z-50 min-h-dvh w-full ${className}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Card className={clsx('mx-auto w-5xl')}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer content={content} />
        </CardContent>
      </Card>
      <div className="fixed top-4 right-4">
        <Button variant="ghost" size="lg" onClick={() => onClose?.()}>
          <X />
        </Button>
      </div>
    </div>
  );
}

export default PostPreview;
