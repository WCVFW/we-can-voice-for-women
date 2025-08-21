import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Save, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  Info, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

import DynamicGalleryManager from '@/components/admin/DynamicGalleryManager';
import MediaUpload from '@/components/admin/MediaUpload';
import adminService, { ContentItem, Event, Donation, User, Album, SiteSettings, AboutPageContent } from '@/lib/adminService';

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'page' | 'news';
  status: 'published' | 'draft';
  lastModified: string;
  author: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrations: number;
}

interface Donation {
  id: string;
  amount: number;
  donor: string;
  date: string;
  campaign: string;
  status: 'completed' | 'pending' | 'failed';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'subscriber';
  joinDate: string;
  status: 'active' | 'inactive';
}

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab from URL
  const getActiveTab = () => {
    const path = location.pathname.split('/admin/')[1];
    return path || 'overview';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [isLoading, setIsLoading] = useState(false);

  // State for all admin data
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'We Can Voice For Women',
    tagline: 'Empowering Women Through Voice',
    contactEmail: 'contact@wcvfw.org',
    phone: '+1-555-0123',
    address: '123 Main St, City, State 12345',
    socialMedia: {
      facebook: 'https://facebook.com/wcvfw',
      twitter: 'https://twitter.com/wcvfw',
      instagram: 'https://instagram.com/wcvfw'
    },
    maintenanceMode: false,
    registrationEnabled: true
  });
  const [aboutContent, setAboutContent] = useState<AboutPageContent>({
    mission: 'To empower women through voice, advocacy, and community support, creating opportunities for growth and positive change.',
    vision: 'A world where every woman has the power to voice her opinions, pursue her dreams, and create meaningful impact in her community.',
    history: 'Founded in 2020, We Can Voice For Women has been dedicated to empowering women through various initiatives including education, healthcare, and advocacy programs.',
    team: 'Our diverse team of professionals is committed to making a difference in women\'s lives through dedicated service and innovative programs.'
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  // Load all data on component mount
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        // Small delay to ensure API server is ready
        await new Promise(resolve => setTimeout(resolve, 500));

        const [contentData, eventsData, donationsData, usersData, albumsData, settingsData, aboutData] = await Promise.all([
          adminService.loadContent(),
          adminService.loadEvents(),
          adminService.loadDonations(),
          adminService.loadUsers(),
          adminService.loadAlbums(),
          adminService.loadSiteSettings(),
          adminService.loadAboutContent()
        ]);

        setContentItems(contentData);
        setEvents(eventsData);
        setDonations(donationsData);
        setUsers(usersData);
        setAlbums(albumsData);

        if (settingsData) {
          setSiteSettings(settingsData);
        }

        if (aboutData) {
          setAboutContent(aboutData);
        }

        setDataLoaded(true);
      } catch (error) {
        console.error('Failed to load admin data:', error);
        toast.error('Some admin data could not be loaded. Using defaults.');
        // Set default data so the interface still works
        setContentItems([
          { id: '1', title: 'Welcome to Our Website', type: 'page', status: 'published', lastModified: '2024-01-15', author: 'Admin' },
          { id: '2', title: 'Latest News Update', type: 'news', status: 'draft', lastModified: '2024-01-14', author: 'Editor' },
          { id: '3', title: 'How to Get Involved', type: 'blog', status: 'published', lastModified: '2024-01-13', author: 'Admin' }
        ]);
        setEvents([
          { id: '1', title: 'Community Workshop', date: '2024-02-15', location: 'Main Hall', description: 'Learn new skills', status: 'upcoming', registrations: 25 },
          { id: '2', title: 'Fundraising Gala', date: '2024-03-01', location: 'Grand Hotel', description: 'Annual fundraising event', status: 'upcoming', registrations: 150 }
        ]);
        setDonations([
          { id: '1', amount: 100, donor: 'John Smith', date: '2024-01-15', campaign: 'Education Fund', status: 'completed' },
          { id: '2', amount: 250, donor: 'Jane Doe', date: '2024-01-14', campaign: 'Healthcare Initiative', status: 'completed' },
          { id: '3', amount: 50, donor: 'Anonymous', date: '2024-01-13', campaign: 'General Fund', status: 'pending' }
        ]);
        setUsers([
          { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', joinDate: '2024-01-01', status: 'active' },
          { id: '2', name: 'Content Editor', email: 'editor@example.com', role: 'editor', joinDate: '2024-01-05', status: 'active' },
          { id: '3', name: 'Regular User', email: 'user@example.com', role: 'subscriber', joinDate: '2024-01-10', status: 'inactive' }
        ]);
        setDataLoaded(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    const tab = getActiveTab();
    setActiveTab(tab);
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const path = value === 'overview' ? '/admin' : `/admin/${value}`;
    navigate(path);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Save all data to server
      await Promise.all([
        adminService.saveContent(contentItems),
        adminService.saveEvents(events),
        adminService.saveDonations(donations),
        adminService.saveUsers(users),
        adminService.saveAlbums(albums),
        adminService.saveSiteSettings(siteSettings),
        adminService.saveAboutContent(aboutContent)
      ]);

      toast.success('All changes saved successfully!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishChanges = async () => {
    setIsLoading(true);
    try {
      // First save all changes
      await handleSaveChanges();

      // Then publish
      await adminService.publishAllChanges();

      toast.success('Changes published successfully!');
    } catch (error) {
      console.error('Failed to publish changes:', error);
      toast.error('Failed to publish changes');
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations for different data types
  const handleCreateContent = async (newContent: Omit<ContentItem, 'id'>) => {
    try {
      const created = await adminService.createContent(newContent);
      setContentItems(prev => [...prev, created]);
      toast.success('Content created successfully!');
    } catch (error) {
      toast.error('Failed to create content');
    }
  };

  const handleUpdateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      await adminService.updateContent(id, updates);
      setContentItems(prev => prev.map(item =>
        item.id === id ? { ...item, ...updates, lastModified: new Date().toISOString() } : item
      ));
      toast.success('Content updated successfully!');
    } catch (error) {
      toast.error('Failed to update content');
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      await adminService.deleteContent(id);
      setContentItems(prev => prev.filter(item => item.id !== id));
      toast.success('Content deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  const handleCreateEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      const created = await adminService.createEvent(newEvent);
      setEvents(prev => [...prev, created]);
      toast.success('Event created successfully!');
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  const handleUpdateEvent = async (id: string, updates: Partial<Event>) => {
    try {
      await adminService.updateEvent(id, updates);
      setEvents(prev => prev.map(event =>
        event.id === id ? { ...event, ...updates } : event
      ));
      toast.success('Event updated successfully!');
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await adminService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      toast.success('Event deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    try {
      const created = await adminService.createUser(newUser);
      setUsers(prev => [...prev, created]);
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (id: string, updates: Partial<User>) => {
    try {
      await adminService.updateUser(id, updates);
      setUsers(prev => prev.map(user =>
        user.id === id ? { ...user, ...updates } : user
      ));
      toast.success('User updated successfully!');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await adminService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleAlbumsChange = async (newAlbums: Album[]) => {
    setAlbums(newAlbums);
    try {
      await adminService.saveAlbums(newAlbums);
    } catch (error) {
      console.error('Failed to save albums:', error);
    }
  };

  const StatCard = ({ title, value, icon, change, changeType }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'negative' ? 'text-red-600' : 
            'text-muted-foreground'
          }`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const ContentTable = ({ items, type }: { items: ContentItem[], type: string }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Content Management</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New {type}
        </Button>
      </div>
      <div className="border rounded-lg">
        <div className="grid grid-cols-5 gap-4 p-4 font-semibold border-b bg-gray-50">
          <div>Title</div>
          <div>Type</div>
          <div>Status</div>
          <div>Last Modified</div>
          <div>Actions</div>
        </div>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
            <div className="font-medium">{item.title}</div>
            <div>
              <Badge variant="outline">{item.type}</Badge>
            </div>
            <div>
              <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                {item.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">{item.lastModified}</div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!dataLoaded && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Complete control panel for your website</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSaveChanges} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button onClick={handlePublishChanges} disabled={isLoading}>
            <Upload className="h-4 w-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Content"
              value={contentItems.length}
              icon={<FileText className="h-4 w-4" />}
              change="+2 this month"
              changeType="positive"
            />
            <StatCard
              title="Active Events"
              value={events.filter(e => e.status === 'upcoming').length}
              icon={<Calendar className="h-4 w-4" />}
              change="2 upcoming"
              changeType="neutral"
            />
            <StatCard
              title="Total Donations"
              value={`$${donations.reduce((sum, d) => sum + d.amount, 0)}`}
              icon={<DollarSign className="h-4 w-4" />}
              change="+$350 this week"
              changeType="positive"
            />
            <StatCard
              title="Total Users"
              value={users.length}
              icon={<Users className="h-4 w-4" />}
              change={`${users.filter(u => u.status === 'active').length} active`}
              changeType="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest changes and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm">New blog post published: "Community Updates"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm">Event registration received: Community Workshop</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm">New donation received: $100</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Content
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Event
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Content Management
              </CardTitle>
              <CardDescription>
                Manage all website content including pages, blogs, and news
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable items={contentItems} type="Content" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Media Gallery Management
              </CardTitle>
              <CardDescription>
                Upload and organize photos, videos, and other media files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <MediaUpload onUploadComplete={(media) => {
                  toast.success(`${media.length} files uploaded successfully!`);
                }} />
                <Separator />
                <DynamicGalleryManager
                  albums={albums}
                  onAlbumsChange={handleAlbumsChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Events Management
              </CardTitle>
              <CardDescription>
                Create, edit, and manage events and workshops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Search events..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={() => {
                    const title = prompt('Enter event title:');
                    const date = prompt('Enter event date (YYYY-MM-DD):');
                    const location = prompt('Enter event location:');
                    if (title && date && location) {
                      handleCreateEvent({
                        title,
                        date,
                        location,
                        description: '',
                        status: 'upcoming',
                        registrations: 0
                      });
                    }
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Event
                  </Button>
                </div>
                
                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 font-semibold border-b bg-gray-50">
                    <div>Event Title</div>
                    <div>Date</div>
                    <div>Location</div>
                    <div>Status</div>
                    <div>Registrations</div>
                    <div>Actions</div>
                  </div>
                  {events.map((event) => (
                    <div key={event.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm">{event.date}</div>
                      <div className="text-sm">{event.location}</div>
                      <div>
                        <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="text-sm">{event.registrations}</div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => {
                        const newTitle = prompt('Edit event title:', event.title);
                        const newStatus = prompt('Edit status (upcoming/ongoing/completed/cancelled):', event.status) as 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
                        if (newTitle && newStatus) {
                          handleUpdateEvent(event.id, {
                            title: newTitle,
                            status: newStatus
                          });
                        }
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        if (confirm('Are you sure you want to delete this event?')) {
                          handleDeleteEvent(event.id);
                        }
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Donations Management
              </CardTitle>
              <CardDescription>
                Track and manage all donations and fundraising campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="Total Donations"
                    value={`$${donations.reduce((sum, d) => sum + d.amount, 0)}`}
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                  <StatCard
                    title="This Month"
                    value={`$${donations.filter(d => d.date.startsWith('2024-01')).reduce((sum, d) => sum + d.amount, 0)}`}
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                  <StatCard
                    title="Pending"
                    value={donations.filter(d => d.status === 'pending').length}
                    icon={<DollarSign className="h-4 w-4" />}
                  />
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 font-semibold border-b bg-gray-50">
                    <div>Donor</div>
                    <div>Amount</div>
                    <div>Campaign</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {donations.map((donation) => (
                    <div key={donation.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                      <div className="font-medium">{donation.donor}</div>
                      <div className="font-semibold">${donation.amount}</div>
                      <div className="text-sm">{donation.campaign}</div>
                      <div className="text-sm">{donation.date}</div>
                      <div>
                        <Badge variant={donation.status === 'completed' ? 'default' : 
                                     donation.status === 'pending' ? 'secondary' : 'destructive'}>
                          {donation.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Search users..." 
                      className="w-64"
                    />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="subscriber">Subscriber</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 font-semibold border-b bg-gray-50">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Join Date</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {users.map((user) => (
                    <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm">{user.email}</div>
                      <div>
                        <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                          {user.role}
                        </Badge>
                      </div>
                      <div className="text-sm">{user.joinDate}</div>
                      <div>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                About Page Management
              </CardTitle>
              <CardDescription>
                Edit the content and information displayed on the About page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    placeholder="Enter your organization's mission statement..."
                    className="min-h-[100px]"
                    value={aboutContent.mission}
                    onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision">Vision Statement</Label>
                  <Textarea
                    id="vision"
                    placeholder="Enter your organization's vision statement..."
                    className="min-h-[100px]"
                    value={aboutContent.vision}
                    onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="history">Organization History</Label>
                  <Textarea
                    id="history"
                    placeholder="Enter the history and background of your organization..."
                    className="min-h-[150px]"
                    value={aboutContent.history}
                    onChange={(e) => setAboutContent({...aboutContent, history: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team">Team Information</Label>
                  <Textarea
                    id="team"
                    placeholder="Information about your team and leadership..."
                    className="min-h-[100px]"
                    value={aboutContent.team}
                    onChange={(e) => setAboutContent({...aboutContent, team: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Site Settings
              </CardTitle>
              <CardDescription>
                Configure global settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input 
                      id="tagline"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({...siteSettings, tagline: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input 
                      id="contactEmail"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={siteSettings.phone}
                      onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input 
                      id="facebook"
                      value={siteSettings.socialMedia.facebook}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialMedia: {...siteSettings.socialMedia, facebook: e.target.value}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input 
                      id="twitter"
                      value={siteSettings.socialMedia.twitter}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialMedia: {...siteSettings.socialMedia, twitter: e.target.value}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input 
                      id="instagram"
                      value={siteSettings.socialMedia.instagram}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialMedia: {...siteSettings.socialMedia, instagram: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Site Configuration</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Enable to show maintenance page to visitors</p>
                  </div>
                  <Switch 
                    checked={siteSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, maintenanceMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <p className="text-sm text-gray-600">Allow new users to register accounts</p>
                  </div>
                  <Switch 
                    checked={siteSettings.registrationEnabled}
                    onCheckedChange={(checked) => setSiteSettings({...siteSettings, registrationEnabled: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Alert */}
      {isLoading && (
        <Alert>
          <AlertDescription>
            Processing your request...
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminDashboard;
