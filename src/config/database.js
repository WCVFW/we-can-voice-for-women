import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wcvfw_admin',
  charset: 'utf8mb4',
  timezone: '+00:00'
};

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
});

// Database initialization with schema creation
export const initializeDatabase = async () => {
  let connection;
  try {
    // Create database if it doesn't exist
    connection = await mysql.createConnection({
      ...dbConfig,
      database: undefined // Connect without specifying database
    });

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.end();

    // Connect to the created database
    connection = await pool.getConnection();

    // Create tables
    await createTables(connection);
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Create all necessary tables
const createTables = async (connection) => {
  // Users table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'editor', 'subscriber', 'volunteer') DEFAULT 'subscriber',
      status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
      avatar VARCHAR(500),
      bio TEXT,
      permissions JSON,
      last_login TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_role (role),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Content table (pages, blogs, news)
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) UNIQUE NOT NULL,
      content LONGTEXT,
      excerpt TEXT,
      type ENUM('page', 'blog', 'news', 'announcement') NOT NULL,
      status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
      featured_image VARCHAR(500),
      meta_title VARCHAR(255),
      meta_description TEXT,
      meta_keywords JSON,
      tags JSON,
      author_id INT,
      views INT DEFAULT 0,
      published_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_type (type),
      INDEX idx_status (status),
      INDEX idx_slug (slug),
      INDEX idx_published_at (published_at),
      FULLTEXT KEY ft_content (title, content, excerpt)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Events table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) UNIQUE NOT NULL,
      description LONGTEXT,
      short_description TEXT,
      event_date DATE NOT NULL,
      event_time TIME,
      end_date DATE,
      end_time TIME,
      location VARCHAR(500),
      address TEXT,
      organizer VARCHAR(255),
      contact_email VARCHAR(255),
      contact_phone VARCHAR(50),
      status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
      featured_image VARCHAR(500),
      gallery JSON,
      max_capacity INT,
      current_registrations INT DEFAULT 0,
      registration_fee DECIMAL(10,2) DEFAULT 0,
      registration_deadline DATE,
      is_public BOOLEAN DEFAULT true,
      tags JSON,
      meta_title VARCHAR(255),
      meta_description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_event_date (event_date),
      INDEX idx_status (status),
      INDEX idx_slug (slug),
      FULLTEXT KEY ft_events (title, description, location)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Donations table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      transaction_id VARCHAR(100) UNIQUE,
      donor_name VARCHAR(255) NOT NULL,
      donor_email VARCHAR(255),
      donor_phone VARCHAR(50),
      amount DECIMAL(10,2) NOT NULL,
      currency VARCHAR(3) DEFAULT 'USD',
      campaign VARCHAR(255),
      campaign_id INT,
      payment_method ENUM('card', 'bank', 'paypal', 'cash', 'check', 'other') DEFAULT 'card',
      status ENUM('completed', 'pending', 'failed', 'refunded', 'cancelled') DEFAULT 'pending',
      message TEXT,
      is_anonymous BOOLEAN DEFAULT false,
      is_recurring BOOLEAN DEFAULT false,
      recurring_frequency ENUM('weekly', 'monthly', 'quarterly', 'yearly'),
      receipt_sent BOOLEAN DEFAULT false,
      tax_deductible BOOLEAN DEFAULT true,
      processor_fee DECIMAL(10,2) DEFAULT 0,
      net_amount DECIMAL(10,2) GENERATED ALWAYS AS (amount - processor_fee) STORED,
      donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      processed_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_donor_email (donor_email),
      INDEX idx_campaign (campaign),
      INDEX idx_donated_at (donated_at),
      INDEX idx_amount (amount)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Media/Albums table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS albums (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) UNIQUE NOT NULL,
      description TEXT,
      cover_image VARCHAR(500),
      category VARCHAR(100),
      is_published BOOLEAN DEFAULT false,
      is_featured BOOLEAN DEFAULT false,
      sort_order INT DEFAULT 0,
      view_count INT DEFAULT 0,
      meta_title VARCHAR(255),
      meta_description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_slug (slug),
      INDEX idx_category (category),
      INDEX idx_published (is_published),
      INDEX idx_featured (is_featured)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Media files table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS media (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      original_name VARCHAR(255) NOT NULL,
      file_path VARCHAR(500) NOT NULL,
      file_url VARCHAR(500) NOT NULL,
      file_size INT NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      file_type ENUM('image', 'video', 'audio', 'document', 'other') NOT NULL,
      title VARCHAR(500),
      description TEXT,
      alt_text VARCHAR(255),
      album_id INT,
      uploaded_by INT,
      is_public BOOLEAN DEFAULT true,
      download_count INT DEFAULT 0,
      width INT,
      height INT,
      duration INT,
      metadata JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_album_id (album_id),
      INDEX idx_file_type (file_type),
      INDEX idx_mime_type (mime_type),
      FULLTEXT KEY ft_media (title, description, alt_text)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Site settings table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(100) UNIQUE NOT NULL,
      setting_value LONGTEXT,
      setting_type ENUM('string', 'number', 'boolean', 'json', 'text') DEFAULT 'string',
      description TEXT,
      is_public BOOLEAN DEFAULT false,
      category VARCHAR(50) DEFAULT 'general',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_key (setting_key),
      INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Pages/Navigation structure table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) UNIQUE NOT NULL,
      content LONGTEXT,
      template VARCHAR(100) DEFAULT 'default',
      parent_id INT,
      sort_order INT DEFAULT 0,
      status ENUM('published', 'draft', 'private') DEFAULT 'draft',
      is_in_menu BOOLEAN DEFAULT true,
      menu_title VARCHAR(255),
      menu_icon VARCHAR(100),
      featured_image VARCHAR(500),
      meta_title VARCHAR(255),
      meta_description TEXT,
      meta_keywords JSON,
      custom_css TEXT,
      custom_js TEXT,
      access_level ENUM('public', 'members', 'admin') DEFAULT 'public',
      view_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES pages(id) ON DELETE SET NULL,
      INDEX idx_parent_id (parent_id),
      INDEX idx_slug (slug),
      INDEX idx_status (status),
      INDEX idx_menu (is_in_menu, sort_order),
      FULLTEXT KEY ft_pages (title, content)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Navigation menus table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS menus (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      location VARCHAR(50) NOT NULL,
      items JSON,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_location (location)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Activity log table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      action VARCHAR(100) NOT NULL,
      entity_type VARCHAR(50) NOT NULL,
      entity_id INT,
      old_values JSON,
      new_values JSON,
      ip_address VARCHAR(45),
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_user_id (user_id),
      INDEX idx_entity (entity_type, entity_id),
      INDEX idx_action (action),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Insert default admin user if not exists
  await connection.execute(`
    INSERT IGNORE INTO users (name, email, password, role, status) 
    VALUES ('Admin User', 'admin@wcvfw.org', '$2a$10$X8b1vJ3XcCw5v4.ySNy4hOqFnA6KPh8tWpGzPjzYtNjCqH3nWs9ZW', 'admin', 'active')
  `);

  // Insert default site settings
  const defaultSettings = [
    ['site_name', 'We Can Voice For Women', 'string', 'Website name', true, 'general'],
    ['site_tagline', 'Empowering Women Through Voice', 'string', 'Website tagline', true, 'general'],
    ['site_description', 'We Can Voice For Women is dedicated to empowering women through advocacy, education, and community support.', 'text', 'Website description', true, 'general'],
    ['contact_email', 'contact@wcvfw.org', 'string', 'Main contact email', true, 'contact'],
    ['contact_phone', '+1-555-0123', 'string', 'Main contact phone', true, 'contact'],
    ['address', '123 Main St, City, State 12345', 'text', 'Physical address', true, 'contact'],
    ['social_facebook', 'https://facebook.com/wcvfw', 'string', 'Facebook URL', true, 'social'],
    ['social_twitter', 'https://twitter.com/wcvfw', 'string', 'Twitter URL', true, 'social'],
    ['social_instagram', 'https://instagram.com/wcvfw', 'string', 'Instagram URL', true, 'social'],
    ['maintenance_mode', 'false', 'boolean', 'Maintenance mode status', false, 'system'],
    ['registration_enabled', 'true', 'boolean', 'User registration enabled', false, 'system']
  ];

  for (const setting of defaultSettings) {
    await connection.execute(`
      INSERT IGNORE INTO site_settings (setting_key, setting_value, setting_type, description, is_public, category) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, setting);
  }

  console.log('All database tables created successfully');
};

export { pool };
export default pool;
