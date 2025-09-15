'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { MinimalTiptapEditor } from '@/components/ui/custom/minimal-tiptap';
import type { Editor } from '@tiptap/react';

const formSchema = z.object({
  title: z.string().min(1, 'Judul news harus diisi'),
  content: z.string().min(1, 'Konten news harus diisi'),
  categoryId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  authorId: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  news?: {
    id: number;
    title: string;
    content: string;
    categoryId: number | null;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    authorId: number | null;
  };
  categories: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  createNews?: (
    formData: FormData
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateNews?: (
    id: number,
    formData: FormData
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
}

export function NewsForm({
  news,
  categories,
  createNews,
  updateNews
}: NewsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<Editor | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: news?.title || '',
      content: news?.content || '',
      categoryId: news?.categoryId?.toString() || '',
      status: news?.status || 'DRAFT',
      authorId: news?.authorId?.toString() || ''
    }
  });

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues('content') && editor.isEmpty) {
        editor.commands.setContent(form.getValues('content'));
      }
      editorRef.current = editor;
    },
    [form]
  );

  const handleEditorChange = (content: any) => {
    if (editorRef.current && editorRef.current.isEditable) {
      const html = editorRef.current.getHTML();
      form.setValue('content', html);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('categoryId', values.categoryId || '');
      formData.append('status', values.status);
      formData.append('authorId', values.authorId || '');

      let result;
      if (news && updateNews) {
        result = await updateNews(news.id, formData);
      } else if (createNews) {
        result = await createNews(formData);
      } else {
        throw new Error('Server action not provided');
      }

      if (result.success) {
        toast.success(news ? 'News berhasil diupdate' : 'News berhasil dibuat');
        router.push('/admin/news');
        router.refresh();
      } else {
        throw new Error(result.error || 'Failed to save news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error(news ? 'Gagal update news' : 'Gagal membuat news');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi News</CardTitle>
        <CardDescription>Isi detail news yang akan dibuat</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul News *</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan judul news' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='DRAFT'>Draft</SelectItem>
                        <SelectItem value='PUBLISHED'>Published</SelectItem>
                        <SelectItem value='ARCHIVED'>Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih kategori' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten News *</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={handleEditorChange}
                      throttleDelay={0}
                      className='min-h-[400px] w-full'
                      output='html'
                      placeholder='Tulis konten news di sini...'
                      onCreate={handleCreate}
                      autofocus={true}
                      immediatelyRender={false}
                      editable={true}
                      injectCSS={true}
                      editorClassName='focus:outline-hidden'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-4'>
              <Button type='submit' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {news ? 'Update News' : 'Buat News'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push('/admin/news')}
              >
                Batal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
