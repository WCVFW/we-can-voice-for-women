// Admin Service for data persistence

export interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'page' | 'news';
  status: 'published' | 'draft';
  lastModified: string;
  author: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrations: number;
  maxCapacity?: number;
  price?: number;
  organizer?: string;
  contactEmail?: string;
  featuredImage?: string;
}

export interface Donation {
  id: string;
  amount: number;
  donor: string;
  email?: string;
  date: string;
  campaign: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'subscriber' | 'volunteer';
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  avatar?: string;
  bio?: string;
  permissions?: string[];
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  images: string[];
  createdDate: string;
  isPublished: boolean;
  category?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description?: string;
  contactEmail: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin?: string;
    youtube?: string;
  };
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  timezone?: string;
  googleAnalytics?: string;
  metaKeywords?: string[];
}

export interface AboutPageContent {
  mission: string;
  vision: string;
  history: string;
  team: string;
  values?: string;
  goals?: string;
  achievements?: string[];
  contact?: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

class AdminService {
  private baseUrl = '/api/admin';

  // Helper method to handle API responses
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected JSON response');
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'API request failed');
    }

    return result.data;
  }

  // Generic save method - now uses specific endpoints
  private async saveData(type: string, data: any): Promise<void> {
    try {
      // Use specific endpoints for each data type
      const endpoints: Record<string, string> = {
        content: 'content',
        events: 'events',
        donations: 'donations',
        users: 'users',
        albums: 'albums',
        settings: 'settings'
      };

      const endpoint = endpoints[type];
      if (!endpoint) {
        // Fallback to legacy save endpoint
        const response = await fetch(`${this.baseUrl}/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, data }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save ${type} data: ${response.status} ${response.statusText}`);
        }
        return;
      }

      // For bulk saves, we need to handle each item individually
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.id && !item.id.toString().startsWith('new_')) {
            // Update existing item
            await this.updateItem(endpoint, item.id, item);
          } else {
            // Create new item
            await this.createItem(endpoint, item);
          }
        }
      } else {
        // Single item or settings object
        if (type === 'settings') {
          const response = await fetch(`${this.baseUrl}/settings`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ settings: data }),
          });

          await this.handleResponse(response);
        }
      }
    } catch (error) {
      console.error(`Save error for ${type}:`, error);
      throw error;
    }
  }

  // Helper methods for CRUD operations
  private async createItem(endpoint: string, item: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    return this.handleResponse(response);
  }

  private async updateItem(endpoint: string, id: string, item: any): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    await this.handleResponse(response);
  }

  private async deleteItem(endpoint: string, id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
      method: 'DELETE',
    });

    await this.handleResponse(response);
  }

  // Generic load method - now uses specific endpoints
  private async loadData<T>(type: string): Promise<T[]> {
    try {
      // Use specific endpoints for each data type
      const endpoints: Record<string, string> = {
        content: 'content',
        events: 'events',
        donations: 'donations',
        users: 'users',
        albums: 'albums'
      };

      const endpoint = endpoints[type] || `load/${type}`;
      const response = await fetch(`${this.baseUrl}/${endpoint}`);

      if (!response.ok) {
        console.warn(`API endpoint not available for ${type}, using empty data`);
        return [];
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`Expected JSON response for ${type}, got ${contentType}`);
        return [];
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.warn(`Failed to load ${type} data:`, error);
      return [];
    }
  }

  // Content Management
  async saveContent(content: ContentItem[]): Promise<void> {
    return this.saveData('content', content);
  }

  async loadContent(): Promise<ContentItem[]> {
    return this.loadData<ContentItem>('content');
  }

  async createContent(content: Omit<ContentItem, 'id'>): Promise<ContentItem> {
    const response = await fetch(`${this.baseUrl}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...content,
        lastModified: new Date().toISOString(),
      }),
    });

    return this.handleResponse(response);
  }

  async updateContent(id: string, updates: Partial<ContentItem>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/content/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        lastModified: new Date().toISOString(),
      }),
    });

    await this.handleResponse(response);
  }

  async deleteContent(id: string): Promise<void> {
    await this.deleteItem('content', id);
  }

  // Events Management
  async saveEvents(events: Event[]): Promise<void> {
    return this.saveData('events', events);
  }

  async loadEvents(): Promise<Event[]> {
    return this.loadData<Event>('events');
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    return this.createItem('events', event);
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<void> {
    await this.updateItem('events', id, updates);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.deleteItem('events', id);
  }

  // Donations Management
  async saveDonations(donations: Donation[]): Promise<void> {
    return this.saveData('donations', donations);
  }

  async loadDonations(): Promise<Donation[]> {
    return this.loadData<Donation>('donations');
  }

  async createDonation(donation: Omit<Donation, 'id'>): Promise<Donation> {
    return this.createItem('donations', donation);
  }

  async updateDonation(id: string, updates: Partial<Donation>): Promise<void> {
    await this.updateItem('donations', id, updates);
  }

  // Users Management
  async saveUsers(users: User[]): Promise<void> {
    return this.saveData('users', users);
  }

  async loadUsers(): Promise<User[]> {
    return this.loadData<User>('users');
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.createItem('users', user);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    await this.updateItem('users', id, updates);
  }

  async deleteUser(id: string): Promise<void> {
    await this.deleteItem('users', id);
  }

  // Albums Management
  async saveAlbums(albums: Album[]): Promise<void> {
    return this.saveData('albums', albums);
  }

  async loadAlbums(): Promise<Album[]> {
    return this.loadData<Album>('albums');
  }

  async createAlbum(album: Omit<Album, 'id'>): Promise<Album> {
    return this.createItem('albums', {
      ...album,
      createdDate: new Date().toISOString(),
    });
  }

  async updateAlbum(id: string, updates: Partial<Album>): Promise<void> {
    await this.updateItem('albums', id, updates);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.deleteItem('albums', id);
  }

  // Site Settings
  async saveSiteSettings(settings: SiteSettings): Promise<void> {
    const response = await fetch(`${this.baseUrl}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings }),
    });

    await this.handleResponse(response);
  }

  async loadSiteSettings(): Promise<SiteSettings | null> {
    try {
      const response = await fetch(`${this.baseUrl}/settings`);
      const result = await this.handleResponse(response);

      // Convert grouped settings back to flat object
      const settings: SiteSettings = {
        siteName: result.general?.site_name?.value || 'We Can Voice For Women',
        tagline: result.general?.site_tagline?.value || 'Empowering Women Through Voice',
        contactEmail: result.contact?.contact_email?.value || 'contact@wcvfw.org',
        phone: result.contact?.contact_phone?.value || '+1-555-0123',
        address: result.contact?.address?.value || '123 Main St, City, State 12345',
        socialMedia: {
          facebook: result.social?.social_facebook?.value || 'https://facebook.com/wcvfw',
          twitter: result.social?.social_twitter?.value || 'https://twitter.com/wcvfw',
          instagram: result.social?.social_instagram?.value || 'https://instagram.com/wcvfw'
        },
        maintenanceMode: result.system?.maintenance_mode?.value === 'true',
        registrationEnabled: result.system?.registration_enabled?.value === 'true'
      };

      return settings;
    } catch (error) {
      console.warn('Failed to load site settings:', error);
      return null;
    }
  }

  // About Page Content
  async saveAboutContent(content: AboutPageContent): Promise<void> {
    const settings = {
      about_mission: content.mission,
      about_vision: content.vision,
      about_history: content.history,
      about_team: content.team
    };

    await this.saveSiteSettings(settings as any);
  }

  async loadAboutContent(): Promise<AboutPageContent | null> {
    try {
      const response = await fetch(`${this.baseUrl}/settings`);
      const result = await this.handleResponse(response);

      const content: AboutPageContent = {
        mission: result.general?.about_mission?.value || 'To empower women through voice, advocacy, and community support, creating opportunities for growth and positive change.',
        vision: result.general?.about_vision?.value || 'A world where every woman has the power to voice her opinions, pursue her dreams, and create meaningful impact in her community.',
        history: result.general?.about_history?.value || 'Founded in 2020, We Can Voice For Women has been dedicated to empowering women through various initiatives including education, healthcare, and advocacy programs.',
        team: result.general?.about_team?.value || 'Our diverse team of professionals is committed to making a difference in women\'s lives through dedicated service and innovative programs.'
      };

      return content;
    } catch (error) {
      console.warn('Failed to load about content:', error);
      return null;
    }
  }

  // Bulk operations
  async publishAllChanges(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await this.handleResponse(response);
  }

  // Analytics/Stats
  async getStats(): Promise<{
    totalContent: number;
    totalEvents: number;
    totalDonations: number;
    totalUsers: number;
    totalAlbums: number;
    recentActivity: Array<{
      type: string;
      message: string;
      timestamp: string;
    }>;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/stats`);
      const stats = await this.handleResponse(response);

      return {
        totalContent: stats.content?.total_content || 0,
        totalEvents: stats.events?.total_events || 0,
        totalDonations: stats.donations?.total_amount || 0,
        totalUsers: stats.users?.total_users || 0,
        totalAlbums: stats.media?.total_albums || 0,
        recentActivity: stats.recent_activity || []
      };
    } catch (error) {
      console.warn('Failed to load stats, using fallback:', error);

      // Fallback to individual calls
      const [content, events, donations, users, albums] = await Promise.all([
        this.loadContent(),
        this.loadEvents(),
        this.loadDonations(),
        this.loadUsers(),
        this.loadAlbums(),
      ]);

      return {
        totalContent: content.length,
        totalEvents: events.length,
        totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
        totalUsers: users.length,
        totalAlbums: albums.length,
        recentActivity: [
          { type: 'content', message: 'New blog post published', timestamp: new Date().toISOString() },
          { type: 'event', message: 'Event registration received', timestamp: new Date().toISOString() },
          { type: 'donation', message: 'New donation received', timestamp: new Date().toISOString() },
        ],
      };
    }
  }
}

export const adminService = new AdminService();
export default adminService;
