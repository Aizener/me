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
  'vscode.png'
];

export const generateMetadata = async () => {
  const { data } = await getWebsiteSettings();
  const title = data?.find(item => item.name === 'title')?.content || 'Cola的个人小站';
  const description = data?.find(item => item.name === 'description')?.content || '这是Cola的个人小站，主要分享Web前端、全栈开发等相关技术';
  return {
    title,
    description,
    keywords: ['Cola', '个人小站', '前端', '全栈', 'JavaScript', 'TypeScript', 'NextJS', 'NestJS', 'NodeJS', 'Vue', 'React']
  };
};

async function HomePage() {
  const { data: settings } = await getWebsiteSettings();

  return (
    <div className="w-full flex flex-col lg:flex-row gap-y-4 lg:gap-x-4">
      <div className="w-full lg:w-xl">
        <div className="p-3 bg-background/50 rounded-md border shadow-sm">
          <h1 className="inline-flex font-bold text-lg relative after:content-[''] after:absolute after:-left-1 after:-bottom-1 after:w-2/3 after:h-1 after:rounded-md after:bg-linear-to-r after:from-foreground after:to-foreground/50">小站介绍</h1>
          <div className="text-sm mt-4">
            <p>哈喽，欢迎来此小站的朋友~</p>
            <p className="break-all mt-1">这个小站，主要分享的是和Web全栈开发有关的技术。编程语言主要包含JavaScript(TypeScript)，当然后续也有可能分享分享做游戏的心得(Unity/C#)，一直在学习中...</p>
          </div>
        </div>

        <div className="flex flex-col mt-2">
          <h2 className="flex items-center gap-x-2 overflow-hidden my-4">
            <Separator className="flex-1" />
            <span className="font-bold">常用的技术/工具</span>
            <Separator className="flex-1" />
          </h2>
          <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
            {
              imgs.map(img => (
                <div key={img} className="w-12 h-12 border rounded-sm shadow-sm overflow-hidden relative">
                  <Image
                    fill
                    src={`/tech/${img}`}
                    alt={img}
                  />
                </div>
              ))
            }
          </div>
        </div>

        <div className="p-3 bg-background/50 rounded-md border shadow-sm mt-6">
          <h1 className="inline-flex font-bold text-lg relative after:content-[''] after:absolute after:-left-1 after:-bottom-1 after:w-2/3 after:h-1 after:rounded-md after:bg-linear-to-r after:from-foreground after:to-foreground/50">关于我</h1>

          <div className="text-sm mt-4">
            <p>其实我个人没啥好说的，不过作为个人网站，还是得说一说￣□￣｜｜...</p>
            <p>大专毕业已多年，从一开始的Java学习，到后面参加工作却是做PHP开发，再到现在从事前端或者全栈的工作。没有经历过什么特别优秀的项目，还属于一个比较茫然的状态...</p>
            <p className="mt-2">目前的话，个人还是比较倾向于基于JavaScript的全栈开发。我很喜欢这门语言，语法是我的菜，比起曾经使用PHP来说，体验简直不要好太多，至于Java已经太久没用忘记很多了，而且有NestJS作为SpringBoot的替代品，对于个人而言已经足够了...</p>
            <p className="mt-2">现在的目标：做合适的JavaScript前端或全栈工作，其他方向倒是对游戏开发还蛮感兴趣，Unity是一个不错的方向，不过那又是其他话题了...</p>
          </div>
        </div>

        <div className="p-3 bg-background/50 rounded-md border shadow-sm mt-6">
          <h1 className="inline-flex font-bold text-lg relative after:content-[''] after:absolute after:-left-1 after:-bottom-1 after:w-2/3 after:h-1 after:rounded-md after:bg-linear-to-r after:from-foreground after:to-foreground/50">我的工具</h1>

          <div className="text-sm mt-4">
            <div className="border-b border-dashed flex gap-x-4 py-4">
              <div className="relative w-16 h-16">
                <Image fill alt="tools" src="/tools/cherry.png" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-md">单词学习工具</h2>
                  <Link className="text-blue-500 underline" href="http://cherry.iamcola.cc/" target="_blank">访问&gt;</Link>
                </div>
                <div className="mt-2">该网站是基于Nuxt.JS/Nest.JS/Prisma/Postgresql的一款帮助学习单词的应用，可以记单词、查错词以及模拟小考试等，单词涵盖日常常用单词...</div>
              </div>
            </div>

            <div className="border-b border-dashed flex gap-x-4 py-4">
              <div className="relative w-16 h-16">
                <Image fill alt="tools" src="/tools/ai-expense.png" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-md">AI消费管理</h2>
                  <Link className="text-blue-500 underline" href="https://test3-cola-ai.vercel.app/" target="_blank">访问&gt;</Link>
                </div>
                <div className="mt-2">该网站是基于Next.JS/Prisma/Postgresql/OpenRouter/Clerk等的一款AI消费记录和分析的SAAS应用...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <FloatingBar settings={settings} />
      </div>
    </div>
  );
}

export default HomePage;