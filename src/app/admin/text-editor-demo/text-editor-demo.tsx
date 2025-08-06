import React, { useState } from "react";
import { TextEditor } from "../../../components/ui/text-editor";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";

export const TextEditorDemo = () => {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [editorHeight, setEditorHeight] = useState(200);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    setSavedContent(content);
    console.log("Content saved:", content);
  };

  const handleClear = () => {
    setContent("");
    setSavedContent("");
  };

  const sampleContent = `
    <h2>Contoh Penggunaan Text Editor</h2>
    <p>Ini adalah contoh penggunaan <strong>Text Editor</strong> dengan berbagai fitur:</p>
    <ul>
      <li><strong>Bold text</strong></li>
      <li><em>Italic text</em></li>
      <li><u>Underlined text</u></li>
      <li>Text dengan <span style="color: #FF5400;">warna custom</span></li>
    </ul>
    <p>Anda juga bisa menambahkan:</p>
    <ul>
      <li>Gambar</li>
      <li>Tabel</li>
      <li>Link</li>
      <li>Matematika dengan KaTeX</li>
    </ul>
    <p>Contoh rumus matematika: <span class="math">E = mc^2</span></p>
    <p>Dan juga bisa membuat tabel:</p>
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="padding: 8px; border: 1px solid #ddd;">Header 1</th>
        <th style="padding: 8px; border: 1px solid #ddd;">Header 2</th>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">Data 1</td>
        <td style="padding: 8px; border: 1px solid #ddd;">Data 2</td>
      </tr>
    </table>
  `;

  const loadSampleContent = () => {
    setContent(sampleContent);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Text Editor Demo</h1>
        <p className="text-muted-foreground">
          Demonstrasi penggunaan komponen TextEditor dengan SunEditor dan KaTeX
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <Card>
          <CardHeader>
            <CardTitle>Text Editor</CardTitle>
            <CardDescription>
              Editor teks dengan fitur formatting, gambar, dan matematika
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Button onClick={loadSampleContent} variant="outline" size="sm">
                Load Sample Content
              </Button>
              <Button onClick={handleSave} size="sm">
                Save Content
              </Button>
              <Button onClick={handleClear} variant="destructive" size="sm">
                Clear
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="preview-mode"
                checked={showPreview}
                onCheckedChange={setShowPreview}
              />
              <Label htmlFor="preview-mode">Show Preview</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="height">Editor Height:</Label>
              <select
                id="height"
                value={editorHeight}
                onChange={(e) => setEditorHeight(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={150}>150px</option>
                <option value={200}>200px</option>
                <option value={300}>300px</option>
                <option value={400}>400px</option>
              </select>
            </div>
            
            <TextEditor 
              value={content}
              onChange={handleContentChange}
              height={editorHeight}
              showPreview={showPreview}
              placeholder="Ketik konten Anda di sini..."
            />
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview Content</CardTitle>
            <CardDescription>
              Hasil dari editor akan ditampilkan di sini
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedContent ? (
              <div 
                className="prose prose-sm max-w-none"
                // dangerouslySetInnerHTML={{ __html: savedContent }}
              >
                {savedContent}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-8">
                <p>Klik &quot;Save Content&quot; untuk melihat preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 