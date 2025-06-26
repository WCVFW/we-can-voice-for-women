import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('content');
  const [heroTitle, setHeroTitle] = useState('We Can Voice For Women');
  const [heroDescription, setHeroDescription] = useState('Empowering women through education, health, and economic opportunities');

  const handleContentUpdate = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    toast.success('Content updated successfully!');
  };

  const handleMediaUpload = (e) => {
    e.preventDefault();
    // Here you would typically handle file uploads
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
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="media">Media Gallery</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit your homepage hero section content</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContentUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Title</Label>
                  <Input 
                    id="hero-title" 
                    value={heroTitle} 
                    onChange={(e) => setHeroTitle(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea 
                    id="hero-description" 
                    value={heroDescription} 
                    onChange={(e) => setHeroDescription(e.target.value)} 
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-image">Hero Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="border rounded-md p-2 w-32 h-24 flex items-center justify-center bg-gray-50">
                      <span className="text-gray-400 text-sm">Preview</span>
                    </div>
                    <Input id="hero-image" type="file" />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Edit content for various pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="font-semibold">Home</span>
                  <span className="text-xs text-gray-500">Edit homepage content</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="font-semibold">Enlightenment</span>
                  <span className="text-xs text-gray-500">Edit enlightenment page</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="font-semibold">Enhealthment</span>
                  <span className="text-xs text-gray-500">Edit enhealthment page</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="font-semibold">Empowerment</span>
                  <span className="text-xs text-gray-500">Edit empowerment page</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="font-semibold">Donate</span>
                  <span className="text-xs text-gray-500">Edit donation page</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Upload and manage your media files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <form onSubmit={handleMediaUpload} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="file-upload">Upload File</Label>
                      <Input id="file-upload" type="file" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="media-type">Media Type</Label>
                      <select 
                        id="media-type" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="document">Document</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="media-title">Title</Label>
                      <Input id="media-title" placeholder="Media title" className="mt-1" />
                    </div>
                  </div>
                  <Button type="submit">Upload Media</Button>
                </form>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-semibold mb-4">Media Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="border rounded-md p-2 bg-gray-50 aspect-square flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Media {item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>YouTube Links</CardTitle>
              <CardDescription>Manage embedded YouTube videos</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube-url">YouTube URL</Label>
                  <Input id="youtube-url" placeholder="https://www.youtube.com/watch?v=..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube-title">Title</Label>
                  <Input id="youtube-title" placeholder="Video title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube-description">Description</Label>
                  <Textarea id="youtube-description" placeholder="Video description" rows={3} />
                </div>
                <Button>Add YouTube Link</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Manage events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Event title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Event Time</Label>
                    <Input id="event-time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" placeholder="Event location" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea id="event-description" placeholder="Event description" rows={3} />
                </div>
                <Button>Add Event</Button>
              </form>

              <div>
                <h3 className="font-semibold mb-4">Event List</h3>
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Digital Literacy Workshop</h4>
                      <p className="text-sm text-gray-500">June 25, 2023 | 10:00 AM</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Financial Education Seminar</h4>
                      <p className="text-sm text-gray-500">July 10, 2023 | 2:00 PM</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Donation Statistics</CardTitle>
              <CardDescription>Overview of donation activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Total Donations</h3>
                  <p className="text-3xl font-bold">₹24,500</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Donation Count</h3>
                  <p className="text-3xl font-bold">183</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Average Donation</h3>
                  <p className="text-3xl font-bold">₹134</p>
                  <p className="text-sm text-green-600">+4% from last month</p>
                </div>
              </div>

              <h3 className="font-semibold mb-4">Recent Donations</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                        <div className="text-sm text-gray-500">sarah@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹250.00</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Monthly
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        June 12, 2023
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Michael Chen</div>
                        <div className="text-sm text-gray-500">michael@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹100.00</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          One-time
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        June 10, 2023
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Jessica Rodriguez</div>
                        <div className="text-sm text-gray-500">jessica@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹500.00</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          One-time
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        June 8, 2023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}