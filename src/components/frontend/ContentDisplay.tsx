import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, ArrowRight, Image as ImageIcon } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: 'page' | 'blog' | 'news' | 'announcement';
  status: 'published' | 'draft' | 'archived';
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  author_name?: string;
  views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  event_date: string;
  event_time?: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured_image?: string;
  current_registrations: number;
  max_capacity?: number;
  registration_fee: number;
}

interface Album {
  id: string;
  title: string;
  description?: string;
  cover_image: string;
  category?: string;
  is_published: boolean;
  view_count: number;
  created_at: string;
}

// Content service to fetch from API
class ContentService {
  private baseUrl = '/api/admin';

  async getPublishedContent(type?: string): Promise<ContentItem[]> {
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      params.append('status', 'published');
      
      const response = await fetch(`${this.baseUrl}/content?${params}`);
      if (!response.ok) return [];
      
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Failed to fetch content:', error);
      return [];
    }
  }

  async getUpcomingEvents(): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/events?status=upcoming`);
      if (!response.ok) return [];
      
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return [];
    }
  }

  async getPublishedAlbums(): Promise<Album[]> {
    try {
      const response = await fetch(`${this.baseUrl}/albums`);
      if (!response.ok) return [];
      
      const result = await response.json();
      return (result.data || []).filter((album: Album) => album.is_published);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
      return [];
    }
  }

  async getContentBySlug(slug: string): Promise<ContentItem | null> {
    try {
      const response = await fetch(`${this.baseUrl}/content`);
      if (!response.ok) return null;
      
      const result = await response.json();
      const content = (result.data || []).find((item: ContentItem) => item.slug === slug);
      return content || null;
    } catch (error) {
      console.error('Failed to fetch content by slug:', error);
      return null;
    }
  }
}

const contentService = new ContentService();

// News/Blog Feed Component
export const NewsFeed: React.FC<{ limit?: number }> = ({ limit = 6 }) => {
  const [news, setNews] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await contentService.getPublishedContent('news');
      setNews(data.slice(0, limit));
      setLoading(false);
    };
    fetchNews();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest News & Updates</h2>
        <Button variant="outline">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            {item.featured_image && (
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <LazyImage
                  src={item.featured_image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{item.type}</Badge>
                </div>
              </div>
            )}
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </CardTitle>
              <CardDescription className="mb-4 line-clamp-3">
                {item.excerpt || item.content?.substring(0, 150) + '...'}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{item.author_name || 'Admin'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.published_at || item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              {item.views > 0 && (
                <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400">
                  <Eye className="h-3 w-3" />
                  <span>{item.views} views</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Events Display Component
export const EventsDisplay: React.FC<{ limit?: number }> = ({ limit = 4 }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await contentService.getUpcomingEvents();
      setEvents(data.slice(0, limit));
      setLoading(false);
    };
    fetchEvents();
  }, [limit]);

  if (loading) {
    return <div className="animate-pulse">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Button variant="outline">
          View All Events <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            {event.featured_image && (
              <div className="relative h-40 overflow-hidden rounded-t-lg">
                <LazyImage
                  src={event.featured_image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
              </div>
            )}
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
              <CardDescription className="mb-4 line-clamp-2">
                {event.short_description || event.description?.substring(0, 100) + '...'}
              </CardDescription>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(event.event_date).toLocaleDateString()}
                    {event.event_time && ` at ${event.event_time}`}
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 text-primary">📍</div>
                    <span>{event.location}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    {event.current_registrations} registered
                    {event.max_capacity && ` / ${event.max_capacity} max`}
                  </div>
                  {event.registration_fee > 0 && (
                    <div className="text-sm font-semibold text-primary">
                      ${event.registration_fee}
                    </div>
                  )}
                </div>
              </div>
              
              <Button className="w-full mt-4">
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Gallery/Albums Display Component
export const GalleryDisplay: React.FC<{ limit?: number }> = ({ limit = 6 }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await contentService.getPublishedAlbums();
      setAlbums(data.slice(0, limit));
      setLoading(false);
    };
    fetchAlbums();
  }, [limit]);

  if (loading) {
    return <div className="animate-pulse">Loading gallery...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <Button variant="outline">
          View All Albums <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Card key={album.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              {album.cover_image ? (
                <LazyImage
                  src={album.cover_image}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              {album.category && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{album.category}</Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                {album.title}
              </CardTitle>
              {album.description && (
                <CardDescription className="mb-2 line-clamp-2">
                  {album.description}
                </CardDescription>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(album.created_at).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{album.view_count} views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Blog Posts Display Component
export const BlogDisplay: React.FC<{ limit?: number }> = ({ limit = 4 }) => {
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await contentService.getPublishedContent('blog');
      setBlogs(data.slice(0, limit));
      setLoading(false);
    };
    fetchBlogs();
  }, [limit]);

  if (loading) {
    return <div className="animate-pulse">Loading blogs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
        <Button variant="outline">
          View All Posts <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <article key={blog.id} className="group">
            {blog.featured_image && (
              <div className="relative h-56 overflow-hidden rounded-lg mb-4">
                <LazyImage
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <User className="h-4 w-4" />
                <span>{blog.author_name || 'Admin'}</span>
              </div>
              
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors cursor-pointer">
                {blog.title}
              </h3>
              
              <p className="text-gray-600 line-clamp-3">
                {blog.excerpt || blog.content?.substring(0, 200) + '...'}
              </p>
              
              <div className="flex items-center justify-between">
                <Button variant="link" className="p-0">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// Main Content Display Component
export const ContentDisplay: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      <NewsFeed limit={6} />
      <EventsDisplay limit={4} />
      <BlogDisplay limit={4} />
      <GalleryDisplay limit={6} />
    </div>
  );
};

export default ContentDisplay;
