import { Loader2Icon } from 'lucide-react';

function Loading() {
  return (
    <div className="flex flex-col items-center p-3">
      <Loader2Icon className="animate-spin" />
      <span className="text-sm font-bold text-foreground/80 mt-2">
        加载中...
      </span>
    </div>
  );
}

export default Loading;
