import { executeQuery } from '../config/sqlite-database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

// Wrapper for database queries to handle SQLite vs MySQL differences
const queryDatabase = async (query, params = []) => {
  try {
    // SQLite uses different result format
    const result = executeQuery(query, params);

    // Handle SELECT queries (return array)
    if (query.trim().toLowerCase().startsWith('select')) {
      return Array.isArray(result) ? result : [result];
    }

    // Handle INSERT/UPDATE/DELETE queries
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// USERS CRUD OPERATIONS
export const userController = {
  // Get all users
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 50, role, status, search } = req.query;
      const offset = (page - 1) * limit;
      
      let query = `
        SELECT id, name, email, role, status, avatar, bio, last_login, created_at, updated_at
        FROM users 
        WHERE 1=1
      `;
      const params = [];
      
      if (role) {
        query += ' AND role = ?';
        params.push(role);
      }
      
      if (status) {
        query += ' AND status = ?';
        params.push(status);
      }
      
      if (search) {
        query += ' AND (name LIKE ? OR email LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
      
      const users = await queryDatabase(query, params);
      const totalQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1' +
        (role ? ' AND role = ?' : '') +
        (status ? ' AND status = ?' : '') +
        (search ? ' AND (name LIKE ? OR email LIKE ?)' : '');

      const countParams = params.slice(0, -2); // Remove limit and offset
      const totalResult = await queryDatabase(totalQuery, countParams);
      const total = totalResult[0]?.total || 0;
      
      res.json({
        success: true,
        data: users,
        pagination: {
          total: parseInt(total),
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get user by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [user] = await executeQuery(
        'SELECT id, name, email, role, status, avatar, bio, permissions, last_login, created_at FROM users WHERE id = ?',
        [id]
      );
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create user
  create: async (req, res) => {
    try {
      const { name, email, password, role = 'subscriber', status = 'active', bio, permissions } = req.body;
      
      // Check if user exists
      const [existingUser] = await executeQuery('SELECT id FROM users WHERE email = ?', [email]);
      if (existingUser) {
        return res.status(400).json({ success: false, error: 'User with this email already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await executeQuery(
        'INSERT INTO users (name, email, password, role, status, bio, permissions) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, role, status, bio, JSON.stringify(permissions || [])]
      );
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, name, email, role, status }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update user
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, role, status, bio, permissions, password } = req.body;
      
      let query = 'UPDATE users SET name = ?, email = ?, role = ?, status = ?, bio = ?, permissions = ?, updated_at = CURRENT_TIMESTAMP';
      let params = [name, email, role, status, bio, JSON.stringify(permissions || [])];
      
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += ', password = ?';
        params.push(hashedPassword);
      }
      
      query += ' WHERE id = ?';
      params.push(id);
      
      await executeQuery(query, params);
      
      res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete user
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await executeQuery('DELETE FROM users WHERE id = ?', [id]);
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// CONTENT CRUD OPERATIONS
export const contentController = {
  // Get all content
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 50, type, status, search } = req.query;
      const offset = (page - 1) * limit;
      
      let query = `
        SELECT c.*, u.name as author_name
        FROM content c
        LEFT JOIN users u ON c.author_id = u.id
        WHERE 1=1
      `;
      const params = [];
      
      if (type) {
        query += ' AND c.type = ?';
        params.push(type);
      }
      
      if (status) {
        query += ' AND c.status = ?';
        params.push(status);
      }
      
      if (search) {
        query += ' AND (c.title LIKE ? OR c.content LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      
      query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
      
      const content = await executeQuery(query, params);
      
      res.json({ success: true, data: content });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get content by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [content] = await executeQuery(`
        SELECT c.*, u.name as author_name
        FROM content c
        LEFT JOIN users u ON c.author_id = u.id
        WHERE c.id = ?
      `, [id]);
      
      if (!content) {
        return res.status(404).json({ success: false, error: 'Content not found' });
      }
      
      res.json({ success: true, data: content });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create content
  create: async (req, res) => {
    try {
      const {
        title, content, excerpt, type, status = 'draft',
        featured_image, meta_title, meta_description, meta_keywords,
        tags, author_id
      } = req.body;
      
      const slug = generateSlug(title);
      
      const result = await executeQuery(`
        INSERT INTO content (title, slug, content, excerpt, type, status, featured_image, 
                           meta_title, meta_description, meta_keywords, tags, author_id,
                           published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        title, slug, content, excerpt, type, status, featured_image,
        meta_title, meta_description, JSON.stringify(meta_keywords || []),
        JSON.stringify(tags || []), author_id,
        status === 'published' ? new Date() : null
      ]);
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, title, slug, type, status }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update content
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title, content, excerpt, status, featured_image,
        meta_title, meta_description, meta_keywords, tags
      } = req.body;
      
      const slug = title ? generateSlug(title) : undefined;
      
      let query = `
        UPDATE content SET 
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        content = COALESCE(?, content),
        excerpt = COALESCE(?, excerpt),
        status = COALESCE(?, status),
        featured_image = COALESCE(?, featured_image),
        meta_title = COALESCE(?, meta_title),
        meta_description = COALESCE(?, meta_description),
        meta_keywords = COALESCE(?, meta_keywords),
        tags = COALESCE(?, tags),
        updated_at = CURRENT_TIMESTAMP
      `;
      
      let params = [
        title, slug, content, excerpt, status, featured_image,
        meta_title, meta_description,
        meta_keywords ? JSON.stringify(meta_keywords) : null,
        tags ? JSON.stringify(tags) : null
      ];
      
      // Update published_at if status changed to published
      if (status === 'published') {
        query += ', published_at = COALESCE(published_at, CURRENT_TIMESTAMP)';
      }
      
      query += ' WHERE id = ?';
      params.push(id);
      
      await executeQuery(query, params);
      
      res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete content
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await executeQuery('DELETE FROM content WHERE id = ?', [id]);
      res.json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// EVENTS CRUD OPERATIONS
export const eventController = {
  // Get all events
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 50, status, search } = req.query;
      const offset = (page - 1) * limit;
      
      let query = 'SELECT * FROM events WHERE 1=1';
      const params = [];
      
      if (status) {
        query += ' AND status = ?';
        params.push(status);
      }
      
      if (search) {
        query += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      
      query += ' ORDER BY event_date DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
      
      const events = await executeQuery(query, params);
      
      res.json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create event
  create: async (req, res) => {
    try {
      const {
        title, description, short_description, event_date, event_time,
        end_date, end_time, location, address, organizer, contact_email,
        contact_phone, status = 'upcoming', featured_image, max_capacity,
        registration_fee = 0, registration_deadline, tags
      } = req.body;
      
      const slug = generateSlug(title);
      
      const result = await executeQuery(`
        INSERT INTO events (title, slug, description, short_description, event_date, 
                          event_time, end_date, end_time, location, address, organizer,
                          contact_email, contact_phone, status, featured_image, 
                          max_capacity, registration_fee, registration_deadline, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        title, slug, description, short_description, event_date, event_time,
        end_date, end_time, location, address, organizer, contact_email,
        contact_phone, status, featured_image, max_capacity, registration_fee,
        registration_deadline, JSON.stringify(tags || [])
      ]);
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, title, slug, event_date, status }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update event
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
      
      if (updateFields.title) {
        updateFields.slug = generateSlug(updateFields.title);
      }
      
      const fields = Object.keys(updateFields);
      const values = Object.values(updateFields);
      
      if (updateFields.tags) {
        updateFields.tags = JSON.stringify(updateFields.tags);
      }
      
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      
      await executeQuery(
        `UPDATE events SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [...values, id]
      );
      
      res.json({ success: true, message: 'Event updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete event
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await executeQuery('DELETE FROM events WHERE id = ?', [id]);
      res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// DONATIONS CRUD OPERATIONS
export const donationController = {
  // Get all donations
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 50, status, campaign, search } = req.query;
      const offset = (page - 1) * limit;
      
      let query = 'SELECT * FROM donations WHERE 1=1';
      const params = [];
      
      if (status) {
        query += ' AND status = ?';
        params.push(status);
      }
      
      if (campaign) {
        query += ' AND campaign LIKE ?';
        params.push(`%${campaign}%`);
      }
      
      if (search) {
        query += ' AND (donor_name LIKE ? OR donor_email LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      
      query += ' ORDER BY donated_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
      
      const donations = await executeQuery(query, params);
      
      // Get donation statistics
      const statsQuery = `
        SELECT 
          COUNT(*) as total_count,
          SUM(amount) as total_amount,
          SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as completed_amount,
          AVG(amount) as average_amount
        FROM donations
      `;
      const [stats] = await executeQuery(statsQuery);
      
      res.json({ 
        success: true, 
        data: donations,
        stats
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create donation
  create: async (req, res) => {
    try {
      const {
        transaction_id, donor_name, donor_email, donor_phone, amount,
        campaign, payment_method = 'card', status = 'completed',
        message, is_anonymous = false
      } = req.body;
      
      const result = await executeQuery(`
        INSERT INTO donations (transaction_id, donor_name, donor_email, donor_phone,
                             amount, campaign, payment_method, status, message, is_anonymous)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        transaction_id, donor_name, donor_email, donor_phone, amount,
        campaign, payment_method, status, message, is_anonymous
      ]);
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, donor_name, amount, campaign, status }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update donation
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
      
      const fields = Object.keys(updateFields);
      const values = Object.values(updateFields);
      
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      
      await executeQuery(
        `UPDATE donations SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [...values, id]
      );
      
      res.json({ success: true, message: 'Donation updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete donation
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await executeQuery('DELETE FROM donations WHERE id = ?', [id]);
      res.json({ success: true, message: 'Donation deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// MEDIA CRUD OPERATIONS
export const mediaController = {
  // Get all albums
  getAllAlbums: async (req, res) => {
    try {
      const albums = await executeQuery(`
        SELECT a.*, COUNT(m.id) as media_count
        FROM albums a
        LEFT JOIN media m ON a.id = m.album_id
        GROUP BY a.id
        ORDER BY a.created_at DESC
      `);
      
      res.json({ success: true, data: albums });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get media by album
  getMediaByAlbum: async (req, res) => {
    try {
      const { albumId } = req.params;
      const media = await executeQuery(
        'SELECT * FROM media WHERE album_id = ? ORDER BY created_at DESC',
        [albumId]
      );
      
      res.json({ success: true, data: media });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create album
  createAlbum: async (req, res) => {
    try {
      const { title, description, category, cover_image } = req.body;
      const slug = generateSlug(title);
      
      const result = await executeQuery(`
        INSERT INTO albums (title, slug, description, category, cover_image)
        VALUES (?, ?, ?, ?, ?)
      `, [title, slug, description, category, cover_image]);
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, title, slug }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Add media to album
  addMedia: async (req, res) => {
    try {
      const { 
        filename, original_name, file_path, file_url, file_size, 
        mime_type, file_type, title, description, alt_text, 
        album_id, uploaded_by, width, height, duration 
      } = req.body;
      
      const result = await executeQuery(`
        INSERT INTO media (filename, original_name, file_path, file_url, file_size,
                          mime_type, file_type, title, description, alt_text,
                          album_id, uploaded_by, width, height, duration)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        filename, original_name, file_path, file_url, file_size,
        mime_type, file_type, title, description, alt_text,
        album_id, uploaded_by, width, height, duration
      ]);
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, filename, file_url }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete album
  deleteAlbum: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete associated media files
      const media = await executeQuery('SELECT file_path FROM media WHERE album_id = ?', [id]);
      for (const item of media) {
        if (fs.existsSync(item.file_path)) {
          fs.unlinkSync(item.file_path);
        }
      }
      
      // Delete media records
      await executeQuery('DELETE FROM media WHERE album_id = ?', [id]);
      
      // Delete album
      await executeQuery('DELETE FROM albums WHERE id = ?', [id]);
      
      res.json({ success: true, message: 'Album and media deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// SITE SETTINGS CRUD OPERATIONS
export const settingsController = {
  // Get all settings
  getAll: async (req, res) => {
    try {
      const settings = await executeQuery('SELECT * FROM site_settings ORDER BY category, setting_key');
      
      // Group by category
      const grouped = settings.reduce((acc, setting) => {
        if (!acc[setting.category]) {
          acc[setting.category] = {};
        }
        acc[setting.category][setting.setting_key] = {
          value: setting.setting_value,
          type: setting.setting_type,
          description: setting.description,
          is_public: setting.is_public
        };
        return acc;
      }, {});
      
      res.json({ success: true, data: grouped });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update settings
  update: async (req, res) => {
    try {
      const { settings } = req.body;
      
      for (const [key, value] of Object.entries(settings)) {
        await executeQuery(`
          INSERT INTO site_settings (setting_key, setting_value, updated_at) 
          VALUES (?, ?, CURRENT_TIMESTAMP)
          ON DUPLICATE KEY UPDATE 
          setting_value = VALUES(setting_value), 
          updated_at = CURRENT_TIMESTAMP
        `, [key, typeof value === 'object' ? JSON.stringify(value) : value]);
      }
      
      res.json({ success: true, message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// DASHBOARD STATS
export const dashboardController = {
  getStats: async (req, res) => {
    try {
      const stats = {};
      
      // User stats
      const [userStats] = await executeQuery(`
        SELECT 
          COUNT(*) as total_users,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_users,
          SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin_users
        FROM users
      `);
      stats.users = userStats;
      
      // Content stats
      const [contentStats] = await executeQuery(`
        SELECT 
          COUNT(*) as total_content,
          SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_content,
          SUM(CASE WHEN type = 'blog' THEN 1 ELSE 0 END) as blog_posts,
          SUM(CASE WHEN type = 'page' THEN 1 ELSE 0 END) as pages
        FROM content
      `);
      stats.content = contentStats;
      
      // Event stats
      const [eventStats] = await executeQuery(`
        SELECT 
          COUNT(*) as total_events,
          SUM(CASE WHEN status = 'upcoming' THEN 1 ELSE 0 END) as upcoming_events,
          SUM(current_registrations) as total_registrations
        FROM events
      `);
      stats.events = eventStats;
      
      // Donation stats
      const [donationStats] = await executeQuery(`
        SELECT 
          COUNT(*) as total_donations,
          SUM(amount) as total_amount,
          SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as completed_amount,
          AVG(amount) as average_donation
        FROM donations
      `);
      stats.donations = donationStats;
      
      // Media stats
      const [mediaStats] = await executeQuery(`
        SELECT 
          COUNT(DISTINCT a.id) as total_albums,
          COUNT(m.id) as total_media_files,
          SUM(m.file_size) as total_storage_used
        FROM albums a
        LEFT JOIN media m ON a.id = m.album_id
      `);
      stats.media = mediaStats;
      
      // Recent activity
      const recentActivity = await executeQuery(`
        SELECT action, entity_type, entity_id, created_at, u.name as user_name
        FROM activity_log al
        LEFT JOIN users u ON al.user_id = u.id
        ORDER BY created_at DESC
        LIMIT 10
      `);
      stats.recent_activity = recentActivity;
      
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
