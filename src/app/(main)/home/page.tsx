import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { getWebsiteSettings } from '@/lib/api/settings';

import FloatingBar from './_components/floating-bar';

const imgs = [
  'js.png',
  'ts.png',
  'vue.png',
  'react.png',
  'next.png',
  'node.png',
  'nest.png',
  'docker.png',
  'mysql.png',
  'vscode.png',
];

export const generateMetadata = async () => {
  const { data } = await getWebsiteSettings();
  const title =
    data?.find((item) => item.name === 'title')?.content || 'Cola的个人小站';
  const description =
    data?.find((item) => item.name === 'description')?.content ||
    '这是Cola的个人小站，主要分享Web前端、全栈开发等相关技术';
  return {
    title,
    description,
    keywords: [
      'Cola',
      '个人小站',
      '前端',
      '全栈',
      'JavaScript',
      'TypeScript',
      'NextJS',
      'NestJS',
      'NodeJS',
      'Vue',
      'React',
    ],
  };
};

async function HomePage() {
  const { data: settings } = await getWebsiteSettings();

  return (
    <div className="flex w-full flex-col gap-y-4 lg:flex-row lg:gap-x-4">
      <div className="w-full lg:w-xl">
        <div className="bg-background/50 rounded-md border p-3 shadow-sm">
          <h1 className="after:from-foreground after:to-foreground/50 relative inline-flex text-lg font-bold after:absolute after:-bottom-1 after:-left-1 after:h-1 after:w-2/3 after:rounded-md after:bg-linear-to-r after:content-['']">
            小站介绍
          </h1>
          <div className="mt-4 text-sm">
            <p>哈喽，欢迎来此小站的朋友~</p>
            <p className="mt-1 break-all">
              这个小站，主要分享的是和<strong>Web全栈开发</strong>
              有关的技术。编程语言主要包含
              <strong>JavaScript(TypeScript)</strong>
              ，我喜欢这门语言，可以做好多好多有趣的事情出来，一直在学习中...
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col">
          <h2 className="my-4 flex items-center gap-x-2 overflow-hidden">
            <Separator className="flex-1" />
            <span className="font-bold">常用的技术/工具</span>
            <Separator className="flex-1" />
          </h2>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {imgs.map((img) => (
              <div
                key={img}
                className="relative h-12 w-12 overflow-hidden rounded-sm border shadow-sm"
              >
                <Image fill src={`/tech/${img}`} alt={img} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background/50 mt-6 rounded-md border p-3 shadow-sm">
          <h1 className="after:from-foreground after:to-foreground/50 relative inline-flex text-lg font-bold after:absolute after:-bottom-1 after:-left-1 after:h-1 after:w-2/3 after:rounded-md after:bg-linear-to-r after:content-['']">
            关于我
          </h1>

          <div className="mt-4 text-sm">
            <p>
              其实我个人没啥好说的，不过作为个人网站，还是得说一说￣□￣｜｜...
            </p>
            <p>
              <strong>大专毕业</strong>
              已多年，从一开始学校的<strong>Java学习</strong>
              ，到后面参加工作却是做<strong>PHP开发</strong>
              ，再到现在从事前端。没有经历过什么特别优秀的项目，还属于一个比较茫然的状态...
            </p>
            <p className="mt-2">
              目前的话，个人还是比较倾向于基于
              <strong>JavaScript的全栈开发</strong>
              。我很喜欢这门语言，语法是我的菜，比起曾经使用<strong>PHP</strong>
              来说，体验简直不要好太多，至于<strong>Java</strong>
              已经太久没用忘记很多了，而且有<strong>NestJS</strong>
              作为后端的开发框架，对于个人而言已经足够了...
            </p>
            <p className="mt-2">
              现在的目标：做合适的<strong>JavaScript前端或全栈工作</strong>
              ，其他方向倒是对游戏开发还蛮感兴趣，<strong>Unity</strong>
              是一个不错的方向（甚至还做过小游戏玩），不过那又是其他话题了...
            </p>
          </div>
        </div>

        <div className="bg-background/50 mt-6 rounded-md border p-3 shadow-sm">
          <h1 className="after:from-foreground after:to-foreground/50 relative inline-flex text-lg font-bold after:absolute after:-bottom-1 after:-left-1 after:h-1 after:w-2/3 after:rounded-md after:bg-linear-to-r after:content-['']">
            我的工具
          </h1>

          <div className="mt-4 text-sm">
            <div className="flex gap-x-4 border-b border-dashed py-4">
              <div className="relative h-16 w-16">
                <Image
                  fill
                  alt="tools"
                  src="/tools/cherry.png"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-bold">
                    单词学习工具(部署于阿里云，最好别翻墙)
                  </h2>
                  <Link
                    className="text-blue-500 underline"
                    href="http://cherry.iamcola.cc/"
                    target="_blank"
                  >
                    访问&gt;
                  </Link>
                </div>
                <div className="mt-2">
                  该网站是一款帮助学习单词的应用，可以记单词、查错词以及模拟小考试等，单词涵盖日常常用单词...
                  <p className="mt-1 font-bold">
                    技术相关：Nuxt.JS/Nest.JS/Prisma/Postgresql
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-x-4 border-b border-dashed py-4">
              <div className="relative h-16 w-16">
                <Image
                  fill
                  alt="tools"
                  src="/tools/ai-expense.png"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-bold">
                    AI消费管理(部署于Vercel，需翻墙)
                  </h2>
                  <Link
                    className="text-blue-500 underline"
                    href="https://test3-cola-ai.vercel.app/"
                    target="_blank"
                  >
                    访问&gt;
                  </Link>
                </div>
                <div className="mt-2">
                  该网站是一款基于AI的消费记录与分析的SAAS应用...
                  <p className="mt-1 font-bold">
                    技术相关：Next.JS/Prisma/Postgresql/OpenRouter/Clerk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex-1">
        <FloatingBar settings={settings} />
      </div>
    </div>
  );
}

export default HomePage;
