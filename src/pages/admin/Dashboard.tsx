import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import DynamicAboutManager from '@/components/admin/DynamicAboutManager';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('content');
  const [heroTitle, setHeroTitle] = useState('We Can Voice For Women');
  const [heroDescription, setHeroDescription] = useState('Empowering women through education, health, and economic opportunities');

  const handleContentUpdate = (e) => {
    e.preventDefault();
    toast.success('Content updated successfully!');
  };

  const handleMediaUpload = (e) => {
    e.preventDefault();
    toast.success('Media uploaded successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your website content</p>
        </div>
        <Button>Publish Changes</Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="media">Media Gallery</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
        </TabsList>

        {/* Existing TabsContent */}
        {/* ... all your previous TabsContent for content, media, events, donations ... */}

        <TabsContent value="about" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About Page Control</CardTitle>
              <CardDescription>Manage team and leadership sections on the About page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Leadership / Advisory Board</h3>
                  <DynamicAboutManager type="leadership" />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Our Team</h3>
                  <DynamicAboutManager type="team" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
