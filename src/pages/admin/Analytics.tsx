import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  contactForms: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; visitors: number }>;
  dailyStats: Array<{ date: string; visitors: number; pageViews: number }>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    contactForms: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    trafficSources: [],
    dailyStats: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        visitors: 1250,
        pageViews: 3480,
        contactForms: 45,
        bounceRate: 42.5,
        avgSessionDuration: 185,
        topPages: [
          { page: '/home', views: 1200 },
          { page: '/about', views: 850 },
          { page: '/empowerment', views: 720 },
          { page: '/enlightenment', views: 650 },
          { page: '/enhealthment', views: 480 }
        ],
        trafficSources: [
          { source: 'Direct', visitors: 450 },
          { source: 'Social Media', visitors: 380 },
          { source: 'Search Engines', visitors: 320 },
          { source: 'Referrals', visitors: 100 }
        ],
        dailyStats: [
          { date: '2024-01-01', visitors: 120, pageViews: 340 },
          { date: '2024-01-02', visitors: 150, pageViews: 420 },
          { date: '2024-01-03', visitors: 180, pageViews: 510 },
          { date: '2024-01-04', visitors: 165, pageViews: 460 },
          { date: '2024-01-05', visitors: 200, pageViews: 580 },
          { date: '2024-01-06', visitors: 220, pageViews: 620 },
          { date: '2024-01-07', visitors: 215, pageViews: 590 }
        ]
      };
      
      setData(mockData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Visitors",
      value: data.visitors.toLocaleString(),
      icon: <Users className="h-6 w-6" />,
      change: "+12.5%",
      changeType: "increase" as const,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Page Views",
      value: data.pageViews.toLocaleString(),
      icon: <Eye className="h-6 w-6" />,
      change: "+8.2%",
      changeType: "increase" as const,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Contact Forms",
      value: data.contactForms.toString(),
      icon: <MousePointer className="h-6 w-6" />,
      change: "+15.8%",
      changeType: "increase" as const,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Bounce Rate",
      value: `${data.bounceRate}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      change: "-3.2%",
      changeType: "decrease" as const,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Track your website performance and user engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={fetchAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last period
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Visitors Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pageViews" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    dot={{ fill: '#82ca9d' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.trafficSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visitors"
                  >
                    {data.trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPages.map((page, index) => {
                const percentage = (page.views / data.pageViews) * 100;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{page.page}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-600">
                      {page.views.toLocaleString()} views
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Average Session Duration</p>
                  <p className="text-sm text-gray-600">Time spent on site</p>
                </div>
                <div className="text-2xl font-bold">
                  {Math.floor(data.avgSessionDuration / 60)}m {data.avgSessionDuration % 60}s
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Pages per Session</p>
                  <p className="text-sm text-gray-600">Average pages viewed</p>
                </div>
                <div className="text-2xl font-bold">
                  {(data.pageViews / data.visitors).toFixed(1)}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Conversion Rate</p>
                  <p className="text-sm text-gray-600">Contact form submissions</p>
                </div>
                <div className="text-2xl font-bold">
                  {((data.contactForms / data.visitors) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Real-time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">12</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">28</div>
              <p className="text-gray-600">Page Views (Last Hour)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">3</div>
              <p className="text-gray-600">New Contacts (Today)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
