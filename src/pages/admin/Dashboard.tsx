"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DynamicGalleryManager, {
  Album,
} from "@/components/admin/DynamicGalleryManager";
// import DynamicAboutManager from "@/components/admin/DynamicAboutManager";

export default function Dashboard() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      title: "Empowerment Workshop",
      cover: "/assets/Gallerys/cover1.jpg",
      images: ["/assets/Gallerys/1.jpg", "/assets/Gallerys/2.jpg"],
    },
  ]);

  // ✅ This function will log all albums and simulate publish
  const handlePublish = () => {
    console.log("✅ Publishing Albums Data:", albums);
    alert("✅ Changes Published (simulated).\nSee console for details.");
  };

  return (
    <div>
      {/* Header with Publish Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your website content</p>
        </div>
        {/* ✅ Attach publish handler */}
        <Button
          onClick={handlePublish}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          Publish Changes
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media Gallery</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
        </TabsList>

        {/* Media Gallery Tab */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Manager</CardTitle>
              <CardDescription>Add or manage image albums</CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicGalleryManager albums={albums} setAlbums={setAlbums} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Page Tab */}
        <TabsContent value="about" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About Page Control</CardTitle>
              <CardDescription>
                Manage team and leadership sections on the About page
              </CardDescription>
            </CardHeader>
            {/* 
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">
                    Leadership / Advisory Board
                  </h3>
                  <DynamicAboutManager type="leadership" />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Our Team</h3>
                  <DynamicAboutManager type="team" />
                </div>
              </div>
            </CardContent> 
            */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
