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

  // Generic save method
  private async saveData(type: string, data: any): Promise<void> {
    try {
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
    } catch (error) {
      console.error(`Save error for ${type}:`, error);
      throw error;
    }
  }

  // Generic load method
  private async loadData<T>(type: string): Promise<T[]> {
    try {
      const response = await fetch(`${this.baseUrl}/load/${type}`);

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
    const newContent: ContentItem = {
      ...content,
      id: Date.now().toString(),
      lastModified: new Date().toISOString(),
    };

    const existingContent = await this.loadContent();
    const updatedContent = [...existingContent, newContent];
    await this.saveContent(updatedContent);
    
    return newContent;
  }

  async updateContent(id: string, updates: Partial<ContentItem>): Promise<void> {
    const content = await this.loadContent();
    const index = content.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error('Content not found');
    }

    content[index] = {
      ...content[index],
      ...updates,
      lastModified: new Date().toISOString(),
    };

    await this.saveContent(content);
  }

  async deleteContent(id: string): Promise<void> {
    const content = await this.loadContent();
    const filteredContent = content.filter(item => item.id !== id);
    await this.saveContent(filteredContent);
  }

  // Events Management
  async saveEvents(events: Event[]): Promise<void> {
    return this.saveData('events', events);
  }

  async loadEvents(): Promise<Event[]> {
    return this.loadData<Event>('events');
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };

    const existingEvents = await this.loadEvents();
    const updatedEvents = [...existingEvents, newEvent];
    await this.saveEvents(updatedEvents);
    
    return newEvent;
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<void> {
    const events = await this.loadEvents();
    const index = events.findIndex(event => event.id === id);
    
    if (index === -1) {
      throw new Error('Event not found');
    }

    events[index] = { ...events[index], ...updates };
    await this.saveEvents(events);
  }

  async deleteEvent(id: string): Promise<void> {
    const events = await this.loadEvents();
    const filteredEvents = events.filter(event => event.id !== id);
    await this.saveEvents(filteredEvents);
  }

  // Donations Management
  async saveDonations(donations: Donation[]): Promise<void> {
    return this.saveData('donations', donations);
  }

  async loadDonations(): Promise<Donation[]> {
    return this.loadData<Donation>('donations');
  }

  async createDonation(donation: Omit<Donation, 'id'>): Promise<Donation> {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
    };

    const existingDonations = await this.loadDonations();
    const updatedDonations = [...existingDonations, newDonation];
    await this.saveDonations(updatedDonations);
    
    return newDonation;
  }

  async updateDonation(id: string, updates: Partial<Donation>): Promise<void> {
    const donations = await this.loadDonations();
    const index = donations.findIndex(donation => donation.id === id);
    
    if (index === -1) {
      throw new Error('Donation not found');
    }

    donations[index] = { ...donations[index], ...updates };
    await this.saveDonations(donations);
  }

  // Users Management
  async saveUsers(users: User[]): Promise<void> {
    return this.saveData('users', users);
  }

  async loadUsers(): Promise<User[]> {
    return this.loadData<User>('users');
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
    };

    const existingUsers = await this.loadUsers();
    const updatedUsers = [...existingUsers, newUser];
    await this.saveUsers(updatedUsers);
    
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    const users = await this.loadUsers();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }

    users[index] = { ...users[index], ...updates };
    await this.saveUsers(users);
  }

  async deleteUser(id: string): Promise<void> {
    const users = await this.loadUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    await this.saveUsers(filteredUsers);
  }

  // Albums Management
  async saveAlbums(albums: Album[]): Promise<void> {
    return this.saveData('albums', albums);
  }

  async loadAlbums(): Promise<Album[]> {
    return this.loadData<Album>('albums');
  }

  async createAlbum(album: Omit<Album, 'id'>): Promise<Album> {
    const newAlbum: Album = {
      ...album,
      id: Date.now().toString(),
      createdDate: new Date().toISOString(),
    };

    const existingAlbums = await this.loadAlbums();
    const updatedAlbums = [...existingAlbums, newAlbum];
    await this.saveAlbums(updatedAlbums);
    
    return newAlbum;
  }

  async updateAlbum(id: string, updates: Partial<Album>): Promise<void> {
    const albums = await this.loadAlbums();
    const index = albums.findIndex(album => album.id === id);
    
    if (index === -1) {
      throw new Error('Album not found');
    }

    albums[index] = { ...albums[index], ...updates };
    await this.saveAlbums(albums);
  }

  async deleteAlbum(id: string): Promise<void> {
    const albums = await this.loadAlbums();
    const filteredAlbums = albums.filter(album => album.id !== id);
    await this.saveAlbums(filteredAlbums);
  }

  // Site Settings
  async saveSiteSettings(settings: SiteSettings): Promise<void> {
    return this.saveData('settings', settings);
  }

  async loadSiteSettings(): Promise<SiteSettings | null> {
    const settings = await this.loadData<SiteSettings>('settings');
    return settings.length > 0 ? settings[0] : null;
  }

  // About Page Content
  async saveAboutContent(content: AboutPageContent): Promise<void> {
    return this.saveData('about', content);
  }

  async loadAboutContent(): Promise<AboutPageContent | null> {
    const content = await this.loadData<AboutPageContent>('about');
    return content.length > 0 ? content[0] : null;
  }

  // Bulk operations
  async publishAllChanges(): Promise<void> {
    // This could trigger a build/deployment process
    const response = await fetch(`${this.baseUrl}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to publish changes');
    }
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
        // This would be populated with actual recent activities
        { type: 'content', message: 'New blog post published', timestamp: new Date().toISOString() },
        { type: 'event', message: 'Event registration received', timestamp: new Date().toISOString() },
        { type: 'donation', message: 'New donation received', timestamp: new Date().toISOString() },
      ],
    };
  }
}

export const adminService = new AdminService();
export default adminService;
