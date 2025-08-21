import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, Upload, Edit, Trash2, Plus, Code, Palette, Monitor, 
  Database, FileText, Image, Video, Mail, Settings, Menu,
  Eye, EyeOff, Globe, Smartphone, Tablet, Layout, Type,
  Download, Upload as UploadIcon, RefreshCw, Search,
  BarChart3, Users, Calendar, DollarSign, MessageSquare,
  Shield, Key, Bell, Link, Zap, Wrench, Cpu
} from 'lucide-react';
import { toast } from 'sonner';

// Enhanced Admin Dashboard with Complete Control
const EnhancedAdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveTab = () => {
    const path = location.pathname.split('/admin/')[1];
    return path || 'overview';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [isLoading, setIsLoading] = useState(false);

  // Complete website control states
  const [websiteContent, setWebsiteContent] = useState({
    headers: {},
    footers: {},
    menus: {},
    pages: {},
    components: {},
    styles: {},
    scripts: {}
  });

  const [siteConfig, setSiteConfig] = useState({
    theme: {
      primaryColor: '#e53888',
      secondaryColor: '#fde3ec',
      fontFamily: 'Roboto',
      fontSize: '16px',
      customCSS: ''
    },
    seo: {
      globalTitle: 'We Can Voice For Women',
      globalDescription: 'Empowering Women Through Voice',
      globalKeywords: ['women empowerment', 'advocacy', 'community'],
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg'
    },
    advanced: {
      customJS: '',
      gtag: '',
      analytics: '',
      customHead: '',
      customBody: ''
    }
  });

  // Form states for quick edits
  const [quickEdits, setQuickEdits] = useState({
    siteTitle: 'We Can Voice For Women',
    siteTagline: 'Empowering Women Through Voice',
    heroBannerText: 'Join us in our mission to empower women...'
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const path = value === 'overview' ? '/admin' : `/admin/${value}`;
    navigate(path);
  };

  // Rich Text Editor Component
  const RichTextEditor = ({ value, onChange, placeholder }: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex items-center space-x-2 bg-gray-50">
        <Button size="sm" variant="outline">
          <Type className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">B</Button>
        <Button size="sm" variant="outline">I</Button>
        <Button size="sm" variant="outline">U</Button>
        <Button size="sm" variant="outline">
          <Link className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">
          <Image className="h-4 w-4" />
        </Button>
      </div>
      <Textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] border-0 resize-none"
      />
    </div>
  );

  // Code Editor Component
  const CodeEditor = ({ value, onChange, language = 'html' }: {
    value: string;
    onChange: (value: string) => void;
    language?: string;
  }) => (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex items-center justify-between bg-gray-50">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4" />
          <span className="text-sm font-medium">{language.toUpperCase()} Editor</span>
        </div>
        <Button size="sm" variant="outline">
          Format Code
        </Button>
      </div>
      <Textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[300px] font-mono text-sm border-0 resize-none"
        placeholder={`Enter ${language} code here...`}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Complete Website Control</h1>
          <p className="text-gray-600">Edit every aspect of your website - A to Z control</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Backup
          </Button>
          <Button variant="outline" onClick={() => setIsLoading(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save All
          </Button>
          <Button onClick={() => setIsLoading(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-12 h-auto p-1">
          <TabsTrigger value="overview" className="text-xs">Dashboard</TabsTrigger>
          <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
          <TabsTrigger value="pages" className="text-xs">Pages</TabsTrigger>
          <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
          <TabsTrigger value="components" className="text-xs">Components</TabsTrigger>
          <TabsTrigger value="menus" className="text-xs">Menus</TabsTrigger>
          <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
          <TabsTrigger value="forms" className="text-xs">Forms</TabsTrigger>
          <TabsTrigger value="seo" className="text-xs">SEO</TabsTrigger>
          <TabsTrigger value="code" className="text-xs">Code</TabsTrigger>
          <TabsTrigger value="database" className="text-xs">Database</TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Live Website
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">View Live Site</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Quick Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">Preview Changes</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Backup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">Download Backup</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">View Stats</Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Edit Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Text Edits</CardTitle>
                <CardDescription>Edit any text on your website instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Site Title</Label>
                  <Input
                    value={quickEdits.siteTitle}
                    onChange={(e) => setQuickEdits({...quickEdits, siteTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site Tagline</Label>
                  <Input
                    value={quickEdits.siteTagline}
                    onChange={(e) => setQuickEdits({...quickEdits, siteTagline: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Banner Text</Label>
                  <Textarea
                    value={quickEdits.heroBannerText}
                    onChange={(e) => setQuickEdits({...quickEdits, heroBannerText: e.target.value})}
                  />
                </div>
                <Button size="sm">Update Text</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Style Changes</CardTitle>
                <CardDescription>Modify colors, fonts, and styling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={siteConfig.theme.primaryColor}
                      onChange={(e) => setSiteConfig({
                        ...siteConfig,
                        theme: {...siteConfig.theme, primaryColor: e.target.value}
                      })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={siteConfig.theme.primaryColor}
                      onChange={(e) => setSiteConfig({
                        ...siteConfig,
                        theme: {...siteConfig.theme, primaryColor: e.target.value}
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select defaultValue="roboto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm">Apply Styles</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Page Builder */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="h-5 w-5 mr-2" />
                Page Builder & Management
              </CardTitle>
              <CardDescription>Create, edit, and manage all website pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Website Pages</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Page
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Page Cards */}
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Homepage</h4>
                      <Badge variant="default">Published</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Main landing page</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">About Us</h4>
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Organization information</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-4 text-center">
                    <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Add New Page</p>
                  </CardContent>
                </Card>
              </div>

              {/* Page Editor */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Page Editor</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <RichTextEditor 
                      value=""
                      onChange={() => {}}
                      placeholder="Start writing your page content..."
                    />
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Page Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Page Title</Label>
                          <Input placeholder="Enter page title" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">URL Slug</Label>
                          <Input placeholder="page-url" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Template</Label>
                          <Select defaultValue="default">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="fullwidth">Full Width</SelectItem>
                              <SelectItem value="sidebar">With Sidebar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Design Customization */}
        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Website Design & Appearance
              </CardTitle>
              <CardDescription>Customize colors, fonts, layouts, and visual design</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Color Scheme */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Color Scheme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="color" value="#e53888" className="w-12 h-10" />
                        <Input value="#e53888" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="color" value="#fde3ec" className="w-12 h-10" />
                        <Input value="#fde3ec" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="color" value="#3b82f6" className="w-12 h-10" />
                        <Input value="#3b82f6" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="color" value="#ffffff" className="w-12 h-10" />
                        <Input value="#ffffff" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Typography</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Heading Font</Label>
                      <Select defaultValue="roboto">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="opensans">Open Sans</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                          <SelectItem value="playfair">Playfair Display</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Body Font</Label>
                      <Select defaultValue="roboto">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="opensans">Open Sans</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                          <SelectItem value="inter">Inter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Select defaultValue="16">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14">14px</SelectItem>
                          <SelectItem value="16">16px</SelectItem>
                          <SelectItem value="18">18px</SelectItem>
                          <SelectItem value="20">20px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom CSS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Custom CSS</h3>
                <CodeEditor 
                  value=""
                  onChange={() => {}}
                  language="css"
                />
              </div>

              <Button>Apply Design Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu Management */}
        <TabsContent value="menus" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Menu className="h-5 w-5 mr-2" />
                Navigation & Menu Management
              </CardTitle>
              <CardDescription>Create and manage website menus and navigation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Menu Builder */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Main Navigation</h3>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>Home</span>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>About</span>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>Services</span>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Menu Item
                    </Button>
                  </div>
                </div>

                {/* Menu Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Menu Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Menu Name</Label>
                      <Input defaultValue="Main Navigation" />
                    </div>
                    <div className="space-y-2">
                      <Label>Menu Location</Label>
                      <Select defaultValue="header">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header">Header</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Menu Style</Label>
                      <Select defaultValue="horizontal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="horizontal">Horizontal</SelectItem>
                          <SelectItem value="vertical">Vertical</SelectItem>
                          <SelectItem value="dropdown">Dropdown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Button>Save Menu</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Management */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                SEO & Meta Management
              </CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Global SEO */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Global SEO Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Site Title</Label>
                      <Input defaultValue="We Can Voice For Women" />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea defaultValue="Empowering women through voice, advocacy, and community support..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Keywords</Label>
                      <Input defaultValue="women empowerment, advocacy, community support" />
                    </div>
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <Input type="file" accept="image/*" />
                    </div>
                  </div>
                </div>

                {/* Page-specific SEO */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Page SEO</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Select Page</Label>
                      <Select defaultValue="home">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Homepage</SelectItem>
                          <SelectItem value="about">About</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="contact">Contact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Page Title</Label>
                      <Input defaultValue="Home - We Can Voice For Women" />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea defaultValue="Join us in empowering women through education..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Open Graph Image</Label>
                      <Input type="file" accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>

              <Button>Update SEO Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Code Editor */}
        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Code Editor & Scripts
              </CardTitle>
              <CardDescription>Edit HTML, CSS, JavaScript directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Custom CSS */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Custom CSS</h3>
                  <CodeEditor 
                    value={`/* Custom CSS */
.hero-banner {
  background: linear-gradient(135deg, #e53888, #fde3ec);
  padding: 60px 0;
}

.btn-primary {
  background-color: #e53888;
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
}`}
                    onChange={() => {}}
                    language="css"
                  />
                </div>

                {/* Custom JavaScript */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Custom JavaScript</h3>
                  <CodeEditor 
                    value={`// Custom JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});`}
                    onChange={() => {}}
                    language="javascript"
                  />
                </div>
              </div>

              {/* HTML Templates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">HTML Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Header Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" variant="outline" className="w-full">Edit Header HTML</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Footer Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" variant="outline" className="w-full">Edit Footer HTML</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button>Save Code Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Management */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Management
              </CardTitle>
              <CardDescription>Direct database access and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tables List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Database Tables</h3>
                  <div className="space-y-2">
                    {['users', 'content', 'events', 'donations', 'albums', 'media', 'site_settings'].map(table => (
                      <div key={table} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono text-sm">{table}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SQL Query */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">SQL Query Editor</h3>
                  <CodeEditor 
                    value="SELECT * FROM content WHERE status = 'published' ORDER BY created_at DESC;"
                    onChange={() => {}}
                    language="sql"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm">Execute Query</Button>
                    <Button size="sm" variant="outline">Save Query</Button>
                    <Button size="sm" variant="outline">Export Data</Button>
                  </div>
                </div>
              </div>

              {/* Database Actions */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Database Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Restore Database
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimize Tables
                  </Button>
                  <Button variant="outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Advanced Settings
              </CardTitle>
              <CardDescription>System configuration and advanced options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Maintenance Mode</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Debug Mode</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Cache Enabled</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Auto Backups</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Image Optimization</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Lazy Loading</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>CSS Minification</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>JavaScript Minification</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Google Analytics ID</Label>
                    <Input placeholder="GA-XXXXXXXXX-X" />
                  </div>
                  <div className="space-y-2">
                    <Label>Google Tag Manager</Label>
                    <Input placeholder="GTM-XXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>Facebook Pixel</Label>
                    <Input placeholder="Facebook Pixel ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Service API</Label>
                    <Input placeholder="API Key" />
                  </div>
                </div>
              </div>

              <Button>Save Advanced Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAdminDashboard;
