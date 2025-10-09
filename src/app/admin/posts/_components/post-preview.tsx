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
      className={`absolute w-full left-0 top-0 bg-background z-50 min-h-dvh ${className}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Card className={clsx(
        'w-5xl mx-auto',
      )}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer content={content} />
        </CardContent>
      </Card>
      <div className="fixed right-4 top-4">
        <Button variant="ghost" size="lg" onClick={() => onClose?.()}>
          <X />
        </Button>
      </div>
    </div>
  );
}

export default PostPreview;