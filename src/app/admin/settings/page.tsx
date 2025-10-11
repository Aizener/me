'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CalendarIcon, CircleX, Plus } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { useEffect } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  createWebsiteSettings,
  getWebsiteSettings,
  QueryWebsiteSettings,
} from '@/lib/api/settings';
import { cn } from '@/lib/utils';

const schema = z.object({
  title: z.string().min(1, { message: '请输入网站标题' }),
  description: z.string().min(1, { message: '请输入网站描述' }),
  version: z.string().min(1, { message: '请输入版本号' }),
  publish_date: z.date({ message: '请输入网站发布时间' }),
  record: z.string().min(1, { message: '请输入备案号' }),
  tech_energy: z.object({
    description: z.string().min(1, { message: '请输入技术力描述' }),
    values: z.array(
      z.object({
        title: z.string().min(1, { message: '请输入名称' }),
        value: z.union([
          z.string().min(1, { message: '请输入能力值' }),
          z.number({ message: '请输入能力值' }),
        ]),
      })
    ),
  }),
});

const form = [
  { type: 'input', field: 'title', title: '网站标题' },
  { type: 'input', field: 'description', title: '网站描述' },
  { type: 'input', field: 'version', title: '版本号' },
  { type: 'input', field: 'record', title: '备案号' },
  { type: 'date', field: 'publish_date', title: '建站时间' },
  { type: 'json', field: 'tech_energy', title: '技术力' },
];

type FormData = z.infer<typeof schema>;

function SettingsPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['settings'],
    queryFn: getWebsiteSettings,
  });

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      version: '',
      publish_date: undefined,
      record: '',
      tech_energy: {
        description: '',
        values: [],
      },
    },
  });

  const {
    fields: techEnergyValues,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'tech_energy.values',
  });

  const onSubmit: SubmitHandler<FormData> = (_data: FormData) => {
    const formData: Record<
      string,
      { id?: string; name?: string; title?: string; value: unknown }
    > = {};

    for (const key in _data) {
      const item = data?.data.find((item) => item.name === key);
      const fieldItem = form.find((f) => f.field === key);
      if (item?.id) {
        formData[key] = { id: item.id, value: _data[key as keyof FormData] };
      } else {
        formData[key] = {
          name: fieldItem?.field,
          title: fieldItem?.title,
          value: _data[key as keyof FormData],
        };
      }
    }

    if (formData['tech_energy'].value) {
      formData['tech_energy'].value = JSON.stringify(
        formData['tech_energy'].value
      );
    }

    createWebsiteSettings(formData);
  };

  useEffect(() => {
    if (!data?.data) {
      return;
    }
    const title = data.data.find((item) => item.name === 'title')?.content;
    const description = data.data.find(
      (item) => item.name === 'description'
    )?.content;
    const version = data.data.find((item) => item.name === 'version')?.content;
    const publish_date = data.data.find(
      (item) => item.name === 'publish_date'
    )?.content;
    const record = data.data.find((item) => item.name === 'record')?.content;
    const techStr = data.data.find(
      (item) => item.name === 'tech_energy'
    )?.content;
    let tech_energy;
    try {
      tech_energy = techStr
        ? JSON.parse(techStr)
        : { description: '', content: [] };
    } catch {
      tech_energy = { description: '', content: [] };
    }

    reset({
      title,
      description,
      version,
      publish_date: publish_date ? new Date(publish_date) : new Date(),
      record,
      tech_energy,
    });
  }, [data, reset]);

  return (
    <div>
      <div className="mt-4 rounded-md border p-4 shadow-md">
        <h1 className="text-2xl font-bold">网站信息设置</h1>
        <Separator className="my-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="py-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {form.map((item) => (
              <div key={item.field} className="min-h-16">
                <div
                  className={cn(
                    'flex gap-x-2',
                    item.field === 'tech_energy'
                      ? 'items-baseline'
                      : 'items-center'
                  )}
                >
                  <p className="w-24 shrink-0 text-right text-sm font-bold">
                    {item.title}：
                  </p>
                  {item.type === 'input' && (
                    <Input
                      placeholder={`请输入${item.title}...`}
                      className="w-2xs"
                      {...register(item.field as keyof FormData)}
                    />
                  )}
                  {item.type === 'date' && (
                    <Controller
                      name="publish_date"
                      control={control}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              data-empty={!field.value}
                              className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                            >
                              <CalendarIcon />
                              {field.value ? (
                                format(field.value, 'yyyy/MM/dd')
                              ) : (
                                <span>请选择建站时间...</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              locale={zhCN}
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  )}
                  {item.type === 'json' && (
                    <div className="flex flex-col gap-y-2">
                      <Controller
                        name="tech_energy.description"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="flex flex-col items-start">
                            <Input {...field} placeholder="请输入技术力描述" />
                            {fieldState.error && (
                              <p className="mt-1 text-sm font-bold text-red-500">
                                {fieldState.error?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <div className="flex flex-col gap-y-2">
                        {techEnergyValues.map((item, idx) => (
                          <div key={item.id} className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                              <Controller
                                name={`tech_energy.values.${idx}.title`}
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div>
                                    <Input
                                      {...field}
                                      className="h-8 w-32"
                                      placeholder="技术名称"
                                    />
                                    {fieldState.error && (
                                      <p className="mt-1 text-sm font-bold text-red-500">
                                        {fieldState.error?.message}
                                      </p>
                                    )}
                                  </div>
                                )}
                              />
                              <Controller
                                name={`tech_energy.values.${idx}.value`}
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div>
                                    <Input
                                      {...field}
                                      className="h-8 w-32"
                                      placeholder="技术值"
                                    />
                                    {fieldState.error && (
                                      <p className="mt-1 text-sm font-bold text-red-500">
                                        {fieldState.error?.message}
                                      </p>
                                    )}
                                  </div>
                                )}
                              />
                              <CircleX
                                color="tomato"
                                onClick={() => remove(idx)}
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => append({ title: '', value: '' })}
                        >
                          <Plus />
                          <span>添加</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {errors[item.field as keyof FormData]?.message && (
                  <p className="mt-1 ml-28 text-sm font-bold text-red-500">
                    {errors[item.field as keyof FormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Button>保存</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
