import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'wcvfw_admin.db');

// Initialize SQLite database
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database with schema
export const initializeDatabase = async () => {
  try {
    // Create tables
    await createTables();
    await insertDefaultData();
    console.log('✅ SQLite database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
};

const createTables = async () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'editor', 'subscriber', 'volunteer')) DEFAULT 'subscriber',
      status TEXT CHECK(status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
      avatar TEXT,
      bio TEXT,
      permissions TEXT,
      last_login DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Content table (pages, blogs, news)
  db.exec(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT,
      excerpt TEXT,
      type TEXT CHECK(type IN ('page', 'blog', 'news', 'announcement')) NOT NULL,
      status TEXT CHECK(status IN ('published', 'draft', 'archived')) DEFAULT 'draft',
      featured_image TEXT,
      meta_title TEXT,
      meta_description TEXT,
      meta_keywords TEXT,
      tags TEXT,
      author_id INTEGER,
      views INTEGER DEFAULT 0,
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Events table
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      short_description TEXT,
      event_date DATE NOT NULL,
      event_time TIME,
      end_date DATE,
      end_time TIME,
      location TEXT,
      address TEXT,
      organizer TEXT,
      contact_email TEXT,
      contact_phone TEXT,
      status TEXT CHECK(status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
      featured_image TEXT,
      gallery TEXT,
      max_capacity INTEGER,
      current_registrations INTEGER DEFAULT 0,
      registration_fee REAL DEFAULT 0,
      registration_deadline DATE,
      is_public BOOLEAN DEFAULT 1,
      tags TEXT,
      meta_title TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Donations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_id TEXT UNIQUE,
      donor_name TEXT NOT NULL,
      donor_email TEXT,
      donor_phone TEXT,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      campaign TEXT,
      campaign_id INTEGER,
      payment_method TEXT CHECK(payment_method IN ('card', 'bank', 'paypal', 'cash', 'check', 'other')) DEFAULT 'card',
      status TEXT CHECK(status IN ('completed', 'pending', 'failed', 'refunded', 'cancelled')) DEFAULT 'pending',
      message TEXT,
      is_anonymous BOOLEAN DEFAULT 0,
      is_recurring BOOLEAN DEFAULT 0,
      recurring_frequency TEXT CHECK(recurring_frequency IN ('weekly', 'monthly', 'quarterly', 'yearly')),
      receipt_sent BOOLEAN DEFAULT 0,
      tax_deductible BOOLEAN DEFAULT 1,
      processor_fee REAL DEFAULT 0,
      donated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      processed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Albums table
  db.exec(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      cover_image TEXT,
      category TEXT,
      is_published BOOLEAN DEFAULT 0,
      is_featured BOOLEAN DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      meta_title TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Media files table
  db.exec(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      mime_type TEXT NOT NULL,
      file_type TEXT CHECK(file_type IN ('image', 'video', 'audio', 'document', 'other')) NOT NULL,
      title TEXT,
      description TEXT,
      alt_text TEXT,
      album_id INTEGER,
      uploaded_by INTEGER,
      is_public BOOLEAN DEFAULT 1,
      download_count INTEGER DEFAULT 0,
      width INTEGER,
      height INTEGER,
      duration INTEGER,
      metadata TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Site settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_key TEXT UNIQUE NOT NULL,
      setting_value TEXT,
      setting_type TEXT CHECK(setting_type IN ('string', 'number', 'boolean', 'json', 'text')) DEFAULT 'string',
      description TEXT,
      is_public BOOLEAN DEFAULT 0,
      category TEXT DEFAULT 'general',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Pages/Navigation structure table
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT,
      template TEXT DEFAULT 'default',
      parent_id INTEGER,
      sort_order INTEGER DEFAULT 0,
      status TEXT CHECK(status IN ('published', 'draft', 'private')) DEFAULT 'draft',
      is_in_menu BOOLEAN DEFAULT 1,
      menu_title TEXT,
      menu_icon TEXT,
      featured_image TEXT,
      meta_title TEXT,
      meta_description TEXT,
      meta_keywords TEXT,
      custom_css TEXT,
      custom_js TEXT,
      access_level TEXT CHECK(access_level IN ('public', 'members', 'admin')) DEFAULT 'public',
      view_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES pages(id) ON DELETE SET NULL
    )
  `);

  // Navigation menus table
  db.exec(`
    CREATE TABLE IF NOT EXISTS menus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      items TEXT,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Activity log table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      old_values TEXT,
      new_values TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  console.log('✅ All database tables created successfully');
};

const insertDefaultData = async () => {
  // Check if admin user exists
  const adminUser = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@wcvfw.org');
  
  if (!adminUser) {
    // Insert default admin user
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    db.prepare(`
      INSERT INTO users (name, email, password, role, status) 
      VALUES (?, ?, ?, ?, ?)
    `).run('Admin User', 'admin@wcvfw.org', hashedPassword, 'admin', 'active');
  }

  // Insert default site settings
  const defaultSettings = [
    ['site_name', 'We Can Voice For Women', 'string', 'Website name', 1, 'general'],
    ['site_tagline', 'Empowering Women Through Voice', 'string', 'Website tagline', 1, 'general'],
    ['site_description', 'We Can Voice For Women is dedicated to empowering women through advocacy, education, and community support.', 'text', 'Website description', 1, 'general'],
    ['contact_email', 'contact@wcvfw.org', 'string', 'Main contact email', 1, 'contact'],
    ['contact_phone', '+1-555-0123', 'string', 'Main contact phone', 1, 'contact'],
    ['address', '123 Main St, City, State 12345', 'text', 'Physical address', 1, 'contact'],
    ['social_facebook', 'https://facebook.com/wcvfw', 'string', 'Facebook URL', 1, 'social'],
    ['social_twitter', 'https://twitter.com/wcvfw', 'string', 'Twitter URL', 1, 'social'],
    ['social_instagram', 'https://instagram.com/wcvfw', 'string', 'Instagram URL', 1, 'social'],
    ['maintenance_mode', 'false', 'boolean', 'Maintenance mode status', 0, 'system'],
    ['registration_enabled', 'true', 'boolean', 'User registration enabled', 0, 'system']
  ];

  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO site_settings (setting_key, setting_value, setting_type, description, is_public, category) 
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const setting of defaultSettings) {
    insertSetting.run(...setting);
  }

  // Insert sample content
  const sampleContent = [
    {
      title: 'Welcome to We Can Voice For Women',
      slug: 'welcome',
      content: 'Welcome to our organization dedicated to empowering women through voice, advocacy, and community support.',
      excerpt: 'Learn about our mission and how we empower women.',
      type: 'page',
      status: 'published',
      author_id: 1
    },
    {
      title: 'Our Mission and Vision',
      slug: 'mission-vision',
      content: 'Our mission is to empower women through voice, advocacy, and community support, creating opportunities for growth and positive change.',
      excerpt: 'Discover our mission to empower women.',
      type: 'page',
      status: 'published',
      author_id: 1
    },
    {
      title: 'Latest Community Updates',
      slug: 'community-updates',
      content: 'Stay updated with the latest news and developments in our community.',
      excerpt: 'Latest news and community updates.',
      type: 'news',
      status: 'published',
      author_id: 1
    }
  ];

  const insertContent = db.prepare(`
    INSERT OR IGNORE INTO content (title, slug, content, excerpt, type, status, author_id, published_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  for (const content of sampleContent) {
    insertContent.run(
      content.title,
      content.slug,
      content.content,
      content.excerpt,
      content.type,
      content.status,
      content.author_id
    );
  }

  console.log('✅ Default data inserted successfully');
};

// Query helper functions
export const executeQuery = (query, params = []) => {
  try {
    if (query.trim().toLowerCase().startsWith('select')) {
      const stmt = db.prepare(query);
      return stmt.all(params);
    } else {
      const stmt = db.prepare(query);
      return stmt.run(params);
    }
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const getDatabase = () => db;

export default db;
