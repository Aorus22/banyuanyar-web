import * as React from 'react';
import type { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { uploadTiptapImage } from '@/components/ui/custom/minimal-tiptap/components/image/image-upload-cloudinary';
import { toast } from 'sonner';

interface ImageEditBlockProps {
  editor: Editor;
  close: () => void;
}

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({
  editor,
  close
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [link, setLink] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      setUploading(true);

      try {
        const insertImages = async () => {
          const contentBucket = [];
          const filesArray = Array.from(files);

          for (const file of filesArray) {
            // Create FormData for server action
            const formData = new FormData();
            formData.append('file', file);

            // Upload to Cloudinary via server action
            const result = await uploadTiptapImage(formData);

            if (result.error) {
              toast.error(`Failed to upload ${file.name}: ${result.error}`);
              continue;
            }

            if (result.success && result.url) {
              contentBucket.push({ src: result.url });
              toast.success(`Successfully uploaded ${file.name}`);
            }
          }

          if (contentBucket.length > 0) {
            editor.commands.setImages(contentBucket);
          }
        };

        await insertImages();
        close();
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('Failed to upload images');
      } finally {
        setUploading(false);
      }
    },
    [editor, close]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (link) {
        editor.commands.setImages([{ src: link }]);
        close();
      }
    },
    [editor, link, close]
  );

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-1'>
        <Label htmlFor='image-link'>Attach an image link</Label>
        <div className='flex'>
          <Input
            id='image-link'
            type='url'
            required
            placeholder='https://example.com'
            value={link}
            className='grow'
            disabled={uploading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
          <Button type='submit' className='ml-2' disabled={uploading}>
            Submit
          </Button>
        </div>
      </div>
      <Button
        type='button'
        className='w-full'
        onClick={handleClick}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload from your computer'}
      </Button>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        multiple
        className='hidden'
        onChange={handleFile}
        disabled={uploading}
      />
    </form>
  );
};

export default ImageEditBlock;
