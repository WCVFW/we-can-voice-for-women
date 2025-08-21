import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  Calendar,
  Image,
  Eye,
  Save
} from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  type: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  excerpt?: string;
  featured?: boolean;
}

export default function Content() {
  const [pages, setPages] = useState<ContentItem[]>([]);
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pages');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published',
    featured: false
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [pagesRes, blogsRes, eventsRes] = await Promise.all([
        fetch('/api/admin/content/pages', {
          headers: { 'Authorization': 'Bearer admin-session' }
        }),
        fetch('/api/admin/content/blogs', {
          headers: { 'Authorization': 'Bearer admin-session' }
        }),
        fetch('/api/admin/content/events', {
          headers: { 'Authorization': 'Bearer admin-session' }
        })
      ]);

      setPages(await pagesRes.json() || []);
      setBlogs(await blogsRes.json() || []);
      setEvents(await eventsRes.json() || []);
    } catch (error) {
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async () => {
    try {
      const response = await fetch(`/api/admin/content/${activeTab}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-session'
        },
        body: JSON.stringify({
          ...formData,
          type: activeTab.slice(0, -1) // Remove 's' from plural
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update the appropriate state
        switch (activeTab) {
          case 'pages':
            setPages([...pages, result.content]);
            break;
          case 'blogs':
            setBlogs([...blogs, result.content]);
            break;
          case 'events':
            setEvents([...events, result.content]);
            break;
        }

        setShowAddDialog(false);
        resetForm();
        toast.success(`${activeTab.slice(0, -1)} added successfully`);
      } else {
        toast.error('Failed to add content');
      }
    } catch (error) {
      toast.error('Error adding content');
    }
  };

  const handleEditContent = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch(`/api/admin/content/${activeTab}/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-session'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update the appropriate state
        switch (activeTab) {
          case 'pages':
            setPages(pages.map(p => p.id === editingItem.id ? result.content : p));
            break;
          case 'blogs':
            setBlogs(blogs.map(b => b.id === editingItem.id ? result.content : b));
            break;
          case 'events':
            setEvents(events.map(e => e.id === editingItem.id ? result.content : e));
            break;
        }

        setEditingItem(null);
        resetForm();
        toast.success('Content updated successfully');
      } else {
        toast.error('Failed to update content');
      }
    } catch (error) {
      toast.error('Error updating content');
    }
  };

  const handleDeleteContent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      const response = await fetch(`/api/admin/content/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer admin-session' }
      });

      if (response.ok) {
        // Update the appropriate state
        switch (activeTab) {
          case 'pages':
            setPages(pages.filter(p => p.id !== id));
            break;
          case 'blogs':
            setBlogs(blogs.filter(b => b.id !== id));
            break;
          case 'events':
            setEvents(events.filter(e => e.id !== id));
            break;
        }

        toast.success('Content deleted successfully');
      } else {
        toast.error('Failed to delete content');
      }
    } catch (error) {
      toast.error('Error deleting content');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      status: 'draft',
      featured: false
    });
  };

  const openEditDialog = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || '',
      status: item.status,
      featured: item.featured || false
    });
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'pages':
        return pages;
      case 'blogs':
        return blogs;
      case 'events':
        return events;
      default:
        return [];
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'pages':
        return <FileText className="h-4 w-4" />;
      case 'blogs':
        return <FileText className="h-4 w-4" />;
      case 'events':
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-500">Manage pages, blog posts, and events</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add {activeTab.slice(0, -1)}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New {activeTab.slice(0, -1)}</DialogTitle>
              <DialogDescription>
                Create a new {activeTab.slice(0, -1)} for your website.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your content here..."
                  rows={10}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddContent}>
                <Save className="h-4 w-4 mr-2" />
                Save {activeTab.slice(0, -1)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            {getTabIcon('pages')}
            Pages ({pages.length})
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            {getTabIcon('blogs')}
            Blogs ({blogs.length})
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            {getTabIcon('events')}
            Events ({events.length})
          </TabsTrigger>
        </TabsList>

        {/* Content List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getTabIcon(activeTab)}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getCurrentContent().length > 0 ? (
                getCurrentContent().map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                          {item.featured && (
                            <Badge variant="outline" className="border-yellow-400 text-yellow-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                        {item.excerpt && (
                          <p className="text-gray-600 mb-2">{item.excerpt}</p>
                        )}
                        <div className="text-sm text-gray-500">
                          Created: {new Date(item.createdAt).toLocaleDateString()} | 
                          Updated: {new Date(item.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteContent(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} yet</h3>
                  <p className="text-gray-500 mb-4">Get started by creating your first {activeTab.slice(0, -1)}.</p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add {activeTab.slice(0, -1)}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Tabs>

      {/* Edit Content Dialog */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {activeTab.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Update your {activeTab.slice(0, -1)} content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="edit-excerpt">Excerpt</Label>
              <Textarea
                id="edit-excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your content here..."
                rows={10}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="edit-featured">Featured</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditContent}>
              <Save className="h-4 w-4 mr-2" />
              Update {activeTab.slice(0, -1)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
