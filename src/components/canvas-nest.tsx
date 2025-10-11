'use client';

import { useEffect, useRef } from 'react';

const config = {
  color: '0,0,0',
  count: 88,
};

export default function CanvasNest() {
  const ref = useRef<HTMLDivElement>(null);
  const nest = useRef(null);

  useEffect(() => {
    // 只在客户端加载 CanvasNest
    if (!ref.current) return;
    // @ts-ignore
    import('canvas-nest.js').then((module) => {
      const CanvasNestLib = module.default;
      nest.current = new CanvasNestLib(ref.current!, config);
    });

    return () => {
      // 销毁实例，避免内存泄漏
      // @ts-ignore
      if (nest.current) nest.current?.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full"
    ></div>
  );
}
