'use client';

import dayjs from 'dayjs';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { QueryWebsiteSettings } from '@/lib/api/settings';

// const techEnergy = [
//   { title: 'HTML/CSS', value: 90 },
//   { title: 'JavaScript', value: 90 },
//   { title: 'TypeScript', value: 80 },
//   { title: 'Vue', value: 80 },
//   { title: 'React', value: 80 },
//   { title: 'NextJS', value: 70 },
//   { title: 'NestJS', value: 70 },
//   { title: 'NodeJS', value: 70 },
// ];

const searchPlatforms = [
  {
    name: '抖音',
    url: 'https://www.douyin.com',
    path: (key: string) => `jingxuan/search/${key}`,
  },
  {
    name: 'B站',
    url: 'https://search.bilibili.com',
    path: (key: string) => `all?keyword=${key}`,
  },
  {
    name: '知乎',
    url: 'https://www.zhihu.com',
    path: (key: string) => `search?type=content&q=${key}`,
  },
  {
    name: '百度',
    url: 'https://www.baidu.com',
    path: (key: string) => `s?wd=${key}`,
  },
  {
    name: '维基百科',
    url: 'https://zh.wikipedia.org',
    path: (key: string) => `wiki/${key}`,
  },
  {
    name: '谷歌',
    url: 'https://www.google.com',
    path: (key: string) => `search?q=${key}`,
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    path: (key: string) => `search?q=${key}&type=repositories`,
  },
  {
    name: 'npm',
    url: 'https://www.npmjs.com',
    path: (key: string) => `search?q=${key}`,
  },
];

function FloatingBar({ settings }: { settings: QueryWebsiteSettings[] }) {
  const [version] = useState(() =>
    settings?.find((item) => item.name === 'version')
  );
  const [record] = useState(() =>
    settings?.find((item) => item.name === 'record')
  );
  const [searchText, setSearchText] = useState('');
  const [runtime] = useState(() => {
    const item = settings?.find((item) => item.name === 'publish_date');
    if (item) {
      const diffDays = dayjs().diff(dayjs(item.content), 'day');
      return Math.max(1, diffDays);
    }
    return '-';
  });
  const [techEnergy] = useState(() => {
    try {
      const item = settings?.find((item) => item.name === 'tech_energy');
      if (item?.content) {
        const obj = JSON.parse(item.content) as {
          description: string;
          values: Record<string, number>[];
        };
        return obj;
      }
      return {
        values: [],
        description: '-',
      };
    } catch {
      return {
        values: [],
        description: '-',
      };
    }
  });

  return (
    <div className="lg:fixed lg:w-[19rem]">
      <div className="p-3 bg-background/50 rounded-md border shadow-sm">
        <h1 className="text-lg font-bold text-center">公告栏</h1>
        <div className="text-sm text-foreground/80 p-2">小站还在建设中哦~</div>
      </div>

      <div className="hidden lg:block p-3 bg-background/50 rounded-md border shadow-sm mt-4">
        <h1 className="text-lg font-bold text-center">便捷搜索</h1>
        <div className="py-2 flex flex-col gap-y-2">
          <Input
            placeholder="请输入后选择需要跳转的平台..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="flex items-center gap-2 text-xs text-foreground/80 flex-wrap">
            {searchPlatforms.map((item) => (
              <a
                key={item.name}
                href={`${item.url}/${item.path(searchText)}`}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded-sm border border-background-200 hover:bg-foreground/10 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 bg-background/50 rounded-md border shadow-sm mt-4">
        <h1 className="text-lg font-bold text-center">技术力</h1>
        <div className="text-sm text-foreground/80 p-2 space-y-2">
          {techEnergy.values.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-x-2"
            >
              <span className="text-sm font-bold">{item.title}</span>
              <Progress className="w-40" value={item.value} />
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t text-sm">
          {techEnergy.description}
        </div>
      </div>

      <div className="p-3 bg-background/50 rounded-md border shadow-sm mt-4 space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span>{version?.title}</span>
          <span>{version?.content}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>运行时间</span>
          <span>{runtime}天</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>{record?.title}</span>
          <span>{record?.content}</span>
        </div>
      </div>
    </div>
  );
}

export default FloatingBar;
