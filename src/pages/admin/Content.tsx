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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Edit,
  Save,
  Eye,
  FileText,
  Home,
  Info,
  Users,
  Phone,
  Calendar,
  Heart
} from 'lucide-react';

interface PageContent {
  id: string;
  name: string;
  title: string;
  content: string;
  lastUpdated: string;
  status: 'published' | 'draft';
}

export default function Content() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pages, setPages] = useState<Record<string, PageContent>>({
    home: {
      id: 'home',
      name: 'Home Page',
      title: 'We Can Voice For Women',
      content: 'Welcome to our empowerment platform...',
      lastUpdated: new Date().toISOString(),
      status: 'published'
    },
    about: {
      id: 'about',
      name: 'About Us',
      title: 'About WCVFW',
      content: 'Our mission is to empower women...',
      lastUpdated: new Date().toISOString(),
      status: 'published'
    },
    empowerment: {
      id: 'empowerment',
      name: 'Empowerment',
      title: 'Women Empowerment',
      content: 'Empowering women through various initiatives...',
      lastUpdated: new Date().toISOString(),
      status: 'published'
    },
    enlightenment: {
      id: 'enlightenment',
      name: 'Enlightenment',
      title: 'Enlightenment Programs',
      content: 'Educational and awareness programs...',
      lastUpdated: new Date().toISOString(),
      status: 'published'
    },
    enhealthment: {
      id: 'enhealthment',
      name: 'Enhealthment',
      title: 'Health & Wellness',
      content: 'Health and wellness initiatives...',
      lastUpdated: new Date().toISOString(),
      status: 'published'
    },
    contact: {
      id: 'contact',
      name: 'Contact Us',
      title: 'Get In Touch',
      content: 'Contact us for more information...',
      lastUpdated: new Date().toISOString(),
      status: 'published'
    }
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const pageIcons = {
    home: <Home className="h-4 w-4" />,
    about: <Info className="h-4 w-4" />,
    empowerment: <Users className="h-4 w-4" />,
    enlightenment: <FileText className="h-4 w-4" />,
    enhealthment: <Heart className="h-4 w-4" />,
    contact: <Phone className="h-4 w-4" />
  };

  const currentPage = pages[selectedPage];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPages(prev => ({
        ...prev,
        [selectedPage]: {
          ...prev[selectedPage],
          lastUpdated: new Date().toISOString()
        }
      }));
      
      setEditing(false);
      toast.success('Page content saved successfully!');
    } catch (error) {
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (field: string, value: string) => {
    setPages(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [field]: value
      }
    }));
  };

  const toggleStatus = () => {
    const newStatus = currentPage.status === 'published' ? 'draft' : 'published';
    handleContentChange('status', newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Content</h1>
          <p className="text-gray-500">Edit and manage your website pages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/', '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Website
          </Button>
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Page
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Website Pages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {Object.entries(pages).map(([pageId, page]) => (
                  <button
                    key={pageId}
                    onClick={() => {
                      setSelectedPage(pageId);
                      setEditing(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedPage === pageId ? 'bg-primary/10 text-primary border-r-2 border-primary' : ''
                    }`}
                  >
                    {pageIcons[pageId as keyof typeof pageIcons]}
                    <div className="flex-1">
                      <p className="font-medium">{page.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={page.status === 'published' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {page.status}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {pageIcons[selectedPage as keyof typeof pageIcons]}
                  <div>
                    <CardTitle>{currentPage.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date(currentPage.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={currentPage.status === 'published' ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={toggleStatus}
                  >
                    {currentPage.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Page Title */}
              <div>
                <Label htmlFor="title">Page Title</Label>
                {editing ? (
                  <Input
                    id="title"
                    value={currentPage.title}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="Enter page title"
                  />
                ) : (
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    {currentPage.title}
                  </div>
                )}
              </div>

              {/* Page Content */}
              <div>
                <Label htmlFor="content">Page Content</Label>
                {editing ? (
                  <Textarea
                    id="content"
                    value={currentPage.content}
                    onChange={(e) => handleContentChange('content', e.target.value)}
                    placeholder="Enter page content"
                    rows={15}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-4 bg-gray-50 rounded-md min-h-[400px] whitespace-pre-wrap">
                    {currentPage.content}
                  </div>
                )}
              </div>

              {/* Content Guidelines */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Content Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keep content clear and engaging</li>
                  <li>• Use simple language that's easy to understand</li>
                  <li>• Include relevant keywords for better SEO</li>
                  <li>• Save changes regularly to avoid losing work</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
