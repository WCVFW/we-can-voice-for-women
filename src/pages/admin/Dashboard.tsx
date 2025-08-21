import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  TrendingUp,
  Activity,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardStats {
  totalUsers: number;
  totalPages: number;
  totalBlogs: number;
  totalEvents: number;
  totalDonations: number;
  totalVisitors: number;
  totalPageViews: number;
  recentActivity: Array<{
    action: string;
    timestamp: string;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPages: 0,
    totalBlogs: 0,
    totalEvents: 0,
    totalDonations: 0,
    totalVisitors: 0,
    totalPageViews: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats', {
        headers: {
          'Authorization': 'Bearer admin-session'
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Content Pages",
      value: stats.totalPages,
      icon: <FileText className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogs,
      icon: <FileText className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Events",
      value: stats.totalEvents,
      icon: <Calendar className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Donations",
      value: stats.totalDonations,
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      title: "Visitors",
      value: stats.totalVisitors,
      icon: <Eye className="h-6 w-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Page Views",
      value: stats.totalPageViews,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={fetchDashboardStats} size="sm">
            Refresh Stats
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                Add Content
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Create Event
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Upload className="h-6 w-6" />
                Upload Media
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <p className="font-medium">Server Status</p>
              <p className="text-sm text-green-600">Online</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <p className="font-medium">Database</p>
              <p className="text-sm text-blue-600">Connected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <p className="font-medium">CDN</p>
              <p className="text-sm text-purple-600">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
