import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, X, ImagePlus, FileVideo, FileAudio } from 'lucide-react';

interface MediaUploadProps {
  onUploadComplete?: (media: Array<{
    id: string;
    title: string;
    description: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: string;
  }>) => void;
  allowedTypes?: string[];
  maxFileSize?: number; // in MB
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onUploadComplete,
  allowedTypes = ['image/*', 'video/*', 'audio/*'],
  maxFileSize = 10 // 10MB default
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      
      // Check file size
      const oversizedFiles = newFiles.filter(file => file.size > maxFileSize * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast.error(`Some files exceed the maximum size of ₹{maxFileSize}MB`);
        return;
      }
      
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const getMediaTypeIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImagePlus className="h-5 w-5" />;
    if (file.type.startsWith('video/')) return <FileVideo className="h-5 w-5" />;
    if (file.type.startsWith('audio/')) return <FileAudio className="h-5 w-5" />;
    return <ImagePlus className="h-5 w-5" />;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (files.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Here you would typically upload to your backend/storage
    try {
      const uploadedMedia = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        title: title || file.name,
        description,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }));
      
      onUploadComplete?.(uploadedMedia);
      toast.success(`₹{files.length} file(s) uploaded successfully!`);
      
      // Reset form
      setFiles([]);
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>Upload images, videos, or audio files</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="media-title">Title (optional)</Label>
            <Input
              id="media-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for all files"
              disabled={uploading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="media-description">Description (optional)</Label>
            <Textarea
              id="media-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              rows={3}
              className="resize-none"
              disabled={uploading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="media-files">Files</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              {files.length === 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Drag and drop files here, or click to select files
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Maximum file size: {maxFileSize}MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading}
                    onClick={() => document.getElementById('media-files')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {getMediaTypeIcon(file)}
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        disabled={uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => document.getElementById('media-files')?.click()}
                  >
                    Add More Files
                  </Button>
                </div>
              )}
              <Input
                id="media-files"
                type="file"
                multiple
                accept={allowedTypes.join(',')}
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </div>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `₹{progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Upload Files
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MediaUpload;