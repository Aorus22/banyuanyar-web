import React, { useEffect, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface TextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  height?: number;
  placeholder?: string;
  showPreview?: boolean;
  className?: string;
}

const editorOptions = {
  height: 200,
  buttonList: [
    ['undo', 'redo'],
    ['removeFormat'],
    ['bold', 'underline', 'italic', 'fontSize'],
    ['fontColor', 'hiliteColor'],
    ['align', 'horizontalRule', 'list'],
    ['table', 'link', 'image', 'imageGallery'],
    ['showBlocks', 'codeView'],
    ['math']
  ],
  katex: katex,
  imageRotation: false,
  fontSize: [12, 14, 16, 18, 20],
  colorList: [
    [
      '#828282',
      '#FF5400',
      '#676464',
      '#F1F2F4',
      '#FF9B00',
      '#F00',
      '#fa6e30',
      '#000',
      'rgba(255, 153, 0, 0.1)',
      '#FF6600',
      '#0099FF',
      '#74CC6D',
      '#FF9900',
      '#CCCCCC'
    ]
  ],
  imageUploadUrl: 'http://localhost:8080/chazki-gateway/orders/upload',
  imageGalleryUrl: 'http://localhost:8080/chazki-gateway/orders/gallery'
};

export const TextEditor = ({
  value = '',
  onChange,
  height = 200,
  placeholder = 'Ketik konten di sini...',
  showPreview = false,
  className = ''
}: TextEditorProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (!contentRef.current || !showPreview) return;
    contentRef.current.innerHTML = internalValue;
  }, [internalValue, showPreview]);

  const onChangeHandler = (content: string) => {
    setInternalValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  const editorConfig = {
    ...editorOptions,
    height,
    placeholder
  };

  return (
    <div className={className}>
      <SunEditor
        setOptions={editorConfig as any}
        lang='en'
        onChange={onChangeHandler}
        defaultValue={value}
      />
      {showPreview && (
        <div className='bg-muted/50 mt-4 rounded-lg border p-4'>
          <h4 className='mb-2 text-sm font-medium'>Preview:</h4>
          <div ref={contentRef} className='prose prose-sm max-w-none' />
        </div>
      )}
    </div>
  );
};
