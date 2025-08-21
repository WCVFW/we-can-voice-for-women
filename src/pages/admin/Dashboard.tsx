import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Image,
  Plus,
  Edit,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ContentSummary {
  pages: number;
  images: number;
  recentUpdates: Array<{
    title: string;
    type: string;
    updated: string;
  }>;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<ContentSummary>({
    pages: 0,
    images: 0,
    recentUpdates: []
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setSummary({
      pages: 12,
      images: 45,
      recentUpdates: [
        { title: "Home Page", type: "page", updated: "2 hours ago" },
        { title: "About Us", type: "page", updated: "1 day ago" },
        { title: "Gallery Images", type: "media", updated: "3 days ago" }
      ]
    });
  }, []);

  const quickActions = [
    {
      title: "Edit Home Page",
      description: "Update main homepage content",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/content",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Manage Photos",
      description: "Upload and organize images",
      icon: <Image className="h-6 w-6" />,
      href: "/admin/media",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Update About Page",
      description: "Edit about page content",
      icon: <Edit className="h-6 w-6" />,
      href: "/admin/content",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Dashboard</h1>
          <p className="text-gray-500">Manage your website content and photos</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/admin/content">
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Website
            </Link>
          </Button>
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Website Pages</p>
                <p className="text-3xl font-bold">{summary.pages}</p>
                <p className="text-sm text-gray-500 mt-1">Content pages managed</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Photos & Media</p>
                <p className="text-3xl font-bold">{summary.images}</p>
                <p className="text-sm text-gray-500 mt-1">Images in library</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Image className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.recentUpdates.length > 0 ? (
              summary.recentUpdates.map((update, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {update.type === 'page' ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : (
                        <Image className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{update.title}</p>
                      <p className="text-sm text-gray-500">Updated {update.updated}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {update.type}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No recent updates</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Website Status */}
      <Card>
        <CardHeader>
          <CardTitle>Website Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <p className="font-medium">Website</p>
              <p className="text-sm text-green-600">Online</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <p className="font-medium">Content</p>
              <p className="text-sm text-blue-600">Ready</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <p className="font-medium">Media</p>
              <p className="text-sm text-purple-600">Synced</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
