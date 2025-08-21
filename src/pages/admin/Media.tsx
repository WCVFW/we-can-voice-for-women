import React, { useState, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Upload,
  Search,
  Trash2,
  Eye,
  Image,
  Grid,
  List,
  Copy,
  Folder
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  category: string;
}

export default function Media() {
  const [files, setFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-banner.jpg',
      url: '/api/placeholder/800/400',
      size: 245760,
      type: 'image/jpeg',
      uploadedAt: new Date().toISOString(),
      category: 'homepage'
    },
    {
      id: '2',
      name: 'about-us-team.jpg',
      url: '/api/placeholder/600/400',
      size: 198432,
      type: 'image/jpeg',
      uploadedAt: new Date().toISOString(),
      category: 'about'
    },
    {
      id: '3',
      name: 'empowerment-banner.jpg',
      url: '/api/placeholder/800/300',
      size: 312876,
      type: 'image/jpeg',
      uploadedAt: new Date().toISOString(),
      category: 'empowerment'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dragOver, setDragOver] = useState(false);

  const categories = [
    { id: 'all', name: 'All Photos', count: files.length },
    { id: 'homepage', name: 'Homepage', count: files.filter(f => f.category === 'homepage').length },
    { id: 'about', name: 'About Page', count: files.filter(f => f.category === 'about').length },
    { id: 'empowerment', name: 'Empowerment', count: files.filter(f => f.category === 'empowerment').length },
    { id: 'enlightenment', name: 'Enlightenment', count: files.filter(f => f.category === 'enlightenment').length },
    { id: 'enhealthment', name: 'Enhealthment', count: files.filter(f => f.category === 'enhealthment').length },
    { id: 'events', name: 'Events', count: files.filter(f => f.category === 'events').length }
  ];

  const handleFileUpload = async (uploadFiles: FileList | File[]) => {
    setLoading(true);
    
    try {
      // Simulate file upload
      const newFiles = Array.from(uploadFiles).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        category: selectedCategory === 'all' ? 'general' : selectedCategory
      }));
      
      setFiles(prev => [...newFiles, ...prev]);
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    } catch (error) {
      toast.error('Failed to upload files');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    } else {
      toast.error('Please upload only image files');
    }
  }, [selectedCategory]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      
      if (imageFiles.length > 0) {
        handleFileUpload(imageFiles);
      } else {
        toast.error('Please select only image files');
      }
    }
  };

  const handleDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setFiles(files.filter(f => f.id !== fileId));
      toast.success('Image deleted successfully');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Image URL copied to clipboard');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Photos & Media</h1>
          <p className="text-gray-500">Upload and manage website images</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="h-4 w-4" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Upload Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                  dragOver ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">Drop photos here</p>
                <p className="text-xs text-gray-500">or click to browse</p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
              </div>
              {loading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2 text-sm">Uploading...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Media Grid */}
        <div className="lg:col-span-3">
          {/* Search */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Photos Display */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {selectedCategory === 'all' ? 'All Photos' : categories.find(c => c.id === selectedCategory)?.name}
                </CardTitle>
                <Badge variant="secondary">
                  {filteredFiles.length} photos
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {filteredFiles.length === 0 ? (
                <div className="text-center py-12">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'Try a different search term' : 'Upload your first photo to get started'}
                  </p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="group relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 w-7 p-0"
                          onClick={() => copyToClipboard(file.url)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 w-7 p-0"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-7 w-7 p-0"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(file.url)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
