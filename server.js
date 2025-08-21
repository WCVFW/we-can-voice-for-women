import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/config/database.js';
import adminRoutes from './src/routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize database
initializeDatabase().then((success) => {
  if (success) {
    console.log('✅ Database initialized successfully');
  } else {
    console.log('❌ Database initialization failed - some features may not work');
  }
});

// Serve static files from public/media
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));

// Admin API routes
app.use('/api/admin', adminRoutes);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'media');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for legacy upload endpoints
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${baseName}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'application/pdf'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, videos, and PDFs are allowed.'));
    }
  }
});

// Upload endpoints
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/media/${req.file.filename}`;

    res.json({
      success: true,
      fileUrl: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Multiple files upload
app.post('/api/upload-multiple', upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      fileUrl: `/media/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype
    }));

    res.json({
      success: true,
      files: uploadedFiles,
      count: uploadedFiles.length
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Delete file endpoint
app.delete('/api/media/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'File deleted successfully' });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Admin data persistence endpoints
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save admin data
app.post('/api/admin/save', (req, res) => {
  try {
    const { type, data } = req.body;
    const filePath = path.join(dataDir, `${type}.json`);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true, message: `${type} data saved successfully` });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Load admin data
app.get('/api/admin/load/:type', (req, res) => {
  try {
    const { type } = req.params;
    const filePath = path.join(dataDir, `${type}.json`);

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.json({ success: true, data });
    } else {
      res.json({ success: true, data: [] });
    }
  } catch (error) {
    console.error('Load error:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// Publish changes
app.post('/api/admin/publish', (req, res) => {
  try {
    // Here you would typically:
    // 1. Validate all data
    // 2. Generate static files
    // 3. Deploy to production
    // 4. Clear caches
    // For now, we'll just simulate the process

    const publishLog = {
      timestamp: new Date().toISOString(),
      status: 'success',
      message: 'All changes published successfully'
    };

    const logPath = path.join(dataDir, 'publish_log.json');
    let logs = [];

    if (fs.existsSync(logPath)) {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    }

    logs.push(publishLog);

    // Keep only last 50 logs
    if (logs.length > 50) {
      logs = logs.slice(-50);
    }

    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

    res.json({ success: true, message: 'Changes published successfully', publishLog });
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ error: 'Failed to publish changes' });
  }
});

// Get admin statistics
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = {
      totalContent: 0,
      totalEvents: 0,
      totalDonations: 0,
      totalUsers: 0,
      totalAlbums: 0,
      recentActivity: []
    };

    // Count data from files
    const dataTypes = ['content', 'events', 'donations', 'users', 'albums'];

    dataTypes.forEach(type => {
      const filePath = path.join(dataDir, `${type}.json`);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        stats[`total${type.charAt(0).toUpperCase() + type.slice(1)}`] = Array.isArray(data) ? data.length : 0;
      }
    });

    // Get recent activity from publish logs
    const logPath = path.join(dataDir, 'publish_log.json');
    if (fs.existsSync(logPath)) {
      const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      stats.recentActivity = logs.slice(-10).reverse();
    }

    res.json({ success: true, stats });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: "wecanvoiceforwomen@gmail.com",
    subject: "New Contact Message",
    html: `
      <h2>Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Media files served from: ${uploadDir}`);
});
