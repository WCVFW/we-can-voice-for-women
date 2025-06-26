import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentFormProps {
  title: string;
  initialData?: {
    heading?: string;
    subheading?: string;
    content?: string;
    image?: string;
  };
  onSave: (data: {
    heading: string;
    subheading: string;
    content: string;
    image?: string;
  }) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ title, initialData = {}, onSave }) => {
  const [heading, setHeading] = useState(initialData.heading || '');
  const [subheading, setSubheading] = useState(initialData.subheading || '');
  const [content, setContent] = useState(initialData.content || '');
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState(initialData.image || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would typically upload the image first, then save the content
    try {
      // Simulate API call
      setTimeout(() => {
        onSave({
          heading,
          subheading,
          content,
          image: image ? URL.createObjectURL(image) : currentImage,
        });
        toast.success('Content updated successfully!');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to update content. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter heading"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Input
              id="subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="Enter subheading"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              rows={6}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-start gap-4">
              {currentImage && (
                <div className="border rounded-md p-2 w-32 h-24 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img 
                    src={currentImage.startsWith('http') ? currentImage : `/assets/images/₹{currentImage}`} 
                    alt="Current" 
                    className="max-h-full object-cover" 
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentForm;