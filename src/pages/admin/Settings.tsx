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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Save,
  Settings as SettingsIcon,
  Globe,
  Mail,
  Shield,
  Palette,
  Database,
  Bell,
  Users,
  Activity
} from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  notifications: {
    emailOnContact: boolean;
    emailOnDonation: boolean;
    emailOnNewUser: boolean;
  };
  security: {
    requirePasswordChange: boolean;
    sessionTimeout: number;
    twoFactorAuth: boolean;
  };
  appearance: {
    primaryColor: string;
    darkMode: boolean;
    customCSS: string;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'We Can Voice For Women',
    siteDescription: 'Empowering women through voice and action',
    contactEmail: 'wecanvoiceforwomen@gmail.com',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    notifications: {
      emailOnContact: true,
      emailOnDonation: true,
      emailOnNewUser: false
    },
    security: {
      requirePasswordChange: false,
      sessionTimeout: 30,
      twoFactorAuth: false
    },
    appearance: {
      primaryColor: '#3b82f6',
      darkMode: false,
      customCSS: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': 'Bearer admin-session'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(prevSettings => ({ ...prevSettings, ...data }));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-session'
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings as any;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Configure your website settings and preferences</p>
        </div>
        <Button onClick={saveSettings} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSetting('contactEmail', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.socialMedia.facebook}
                    onChange={(e) => updateSetting('socialMedia.facebook', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={settings.socialMedia.twitter}
                    onChange={(e) => updateSetting('socialMedia.twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.socialMedia.instagram}
                    onChange={(e) => updateSetting('socialMedia.instagram', e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={settings.socialMedia.linkedin}
                    onChange={(e) => updateSetting('socialMedia.linkedin', e.target.value)}
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contact Form Submissions</p>
                  <p className="text-sm text-gray-500">Get notified when someone submits the contact form</p>
                </div>
                <Switch
                  checked={settings.notifications.emailOnContact}
                  onCheckedChange={(checked) => updateSetting('notifications.emailOnContact', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Donations</p>
                  <p className="text-sm text-gray-500">Get notified when someone makes a donation</p>
                </div>
                <Switch
                  checked={settings.notifications.emailOnDonation}
                  onCheckedChange={(checked) => updateSetting('notifications.emailOnDonation', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New User Registrations</p>
                  <p className="text-sm text-gray-500">Get notified when new users register</p>
                </div>
                <Switch
                  checked={settings.notifications.emailOnNewUser}
                  onCheckedChange={(checked) => updateSetting('notifications.emailOnNewUser', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Password Change</p>
                  <p className="text-sm text-gray-500">Force users to change passwords periodically</p>
                </div>
                <Switch
                  checked={settings.security.requirePasswordChange}
                  onCheckedChange={(checked) => updateSetting('security.requirePasswordChange', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Enable 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting('security.twoFactorAuth', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security.sessionTimeout', parseInt(e.target.value))}
                  min="5"
                  max="480"
                />
                <p className="text-sm text-gray-500 mt-1">Users will be logged out after this period of inactivity</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => updateSetting('appearance.primaryColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.appearance.primaryColor}
                    onChange={(e) => updateSetting('appearance.primaryColor', e.target.value)}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Enable dark theme for the admin panel</p>
                </div>
                <Switch
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => updateSetting('appearance.darkMode', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={settings.appearance.customCSS}
                  onChange={(e) => updateSetting('appearance.customCSS', e.target.value)}
                  placeholder="/* Add your custom CSS here */"
                  rows={8}
                />
                <p className="text-sm text-gray-500 mt-1">Add custom styles to override default appearance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Server Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Backup</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="text-sm">v1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Environment</span>
                    <Badge variant="secondary">Development</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="text-sm">2.5 GB / 10 GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Database className="h-6 w-6" />
                  Backup Database
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Activity className="h-6 w-6" />
                  Clear Cache
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Export Users
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <SettingsIcon className="h-6 w-6" />
                  System Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
