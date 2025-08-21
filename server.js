import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from 'fs/promises';
import path from 'path';
import formidable from 'formidable';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data storage (in production, use a proper database)
let adminData = {
  users: [
    {
      id: 1,
      username: 'Prakash1482',
      password: '1417', // In production, hash this!
      role: 'admin',
      email: 'admin@wcvfw.org',
      createdAt: new Date().toISOString()
    }
  ],
  content: {
    pages: [],
    blogs: [],
    events: [],
    gallery: [],
    settings: {
      siteName: 'We Can Voice For Women',
      siteDescription: 'Empowering women through voice and action',
      contactEmail: 'wecanvoiceforwomen@gmail.com',
      socialMedia: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
      }
    }
  },
  donations: [],
  analytics: {
    visitors: 0,
    pageViews: 0,
    contactForms: 0
  }
};

// Simple auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== 'admin-session') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// AUTHENTICATION ROUTES
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = adminData.users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  res.json({ 
    success: true, 
    token: 'admin-session', 
    user: { id: user.id, username: user.username, role: user.role, email: user.email }
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

// USER MANAGEMENT ROUTES
app.get("/api/admin/users", authMiddleware, (req, res) => {
  const users = adminData.users.map(({ password, ...user }) => user);
  res.json(users);
});

app.post("/api/admin/users", authMiddleware, (req, res) => {
  const { username, email, role } = req.body;
  const newUser = {
    id: Date.now(),
    username,
    email,
    role: role || 'user',
    password: crypto.randomBytes(8).toString('hex'), // Generate random password
    createdAt: new Date().toISOString()
  };
  adminData.users.push(newUser);
  
  const { password, ...userResponse } = newUser;
  res.json({ success: true, user: userResponse });
});

app.put("/api/admin/users/:id", authMiddleware, (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = adminData.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  
  adminData.users[userIndex] = { ...adminData.users[userIndex], ...req.body };
  const { password, ...userResponse } = adminData.users[userIndex];
  res.json({ success: true, user: userResponse });
});

app.delete("/api/admin/users/:id", authMiddleware, (req, res) => {
  const userId = parseInt(req.params.id);
  adminData.users = adminData.users.filter(u => u.id !== userId);
  res.json({ success: true, message: "User deleted" });
});

// CONTENT MANAGEMENT ROUTES
app.get("/api/admin/content/:type", authMiddleware, (req, res) => {
  const { type } = req.params;
  const content = adminData.content[type] || [];
  res.json(content);
});

app.post("/api/admin/content/:type", authMiddleware, (req, res) => {
  const { type } = req.params;
  if (!adminData.content[type]) {
    adminData.content[type] = [];
  }
  
  const newContent = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  adminData.content[type].push(newContent);
  res.json({ success: true, content: newContent });
});

app.put("/api/admin/content/:type/:id", authMiddleware, (req, res) => {
  const { type, id } = req.params;
  const contentId = parseInt(id);
  
  if (!adminData.content[type]) {
    return res.status(404).json({ error: "Content type not found" });
  }
  
  const contentIndex = adminData.content[type].findIndex(c => c.id === contentId);
  if (contentIndex === -1) {
    return res.status(404).json({ error: "Content not found" });
  }
  
  adminData.content[type][contentIndex] = {
    ...adminData.content[type][contentIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json({ success: true, content: adminData.content[type][contentIndex] });
});

app.delete("/api/admin/content/:type/:id", authMiddleware, (req, res) => {
  const { type, id } = req.params;
  const contentId = parseInt(id);
  
  if (!adminData.content[type]) {
    return res.status(404).json({ error: "Content type not found" });
  }
  
  adminData.content[type] = adminData.content[type].filter(c => c.id !== contentId);
  res.json({ success: true, message: "Content deleted" });
});

// MEDIA UPLOAD ROUTES
app.post("/api/admin/upload", authMiddleware, async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: 'Upload failed' });
      }

      const file = files.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileName = `${Date.now()}-${file.originalFilename}`;
      const filePath = path.join(uploadDir, fileName);
      
      fs.rename(file.filepath, filePath);
      
      res.json({
        success: true,
        file: {
          name: fileName,
          url: `/uploads/${fileName}`,
          size: file.size,
          type: file.mimetype
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during upload' });
  }
});

// ANALYTICS ROUTES
app.get("/api/admin/analytics", authMiddleware, (req, res) => {
  res.json(adminData.analytics);
});

app.post("/api/admin/analytics/track", (req, res) => {
  const { action } = req.body;
  
  switch (action) {
    case 'pageview':
      adminData.analytics.pageViews++;
      break;
    case 'visitor':
      adminData.analytics.visitors++;
      break;
    case 'contact':
      adminData.analytics.contactForms++;
      break;
  }
  
  res.json({ success: true });
});

// SETTINGS ROUTES
app.get("/api/admin/settings", authMiddleware, (req, res) => {
  res.json(adminData.content.settings);
});

app.put("/api/admin/settings", authMiddleware, (req, res) => {
  adminData.content.settings = { ...adminData.content.settings, ...req.body };
  res.json({ success: true, settings: adminData.content.settings });
});

// DONATIONS ROUTES
app.get("/api/admin/donations", authMiddleware, (req, res) => {
  res.json(adminData.donations);
});

app.post("/api/admin/donations", authMiddleware, (req, res) => {
  const donation = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  adminData.donations.push(donation);
  res.json({ success: true, donation });
});

// DASHBOARD STATS ROUTE
app.get("/api/admin/dashboard-stats", authMiddleware, (req, res) => {
  const stats = {
    totalUsers: adminData.users.length,
    totalPages: adminData.content.pages?.length || 0,
    totalBlogs: adminData.content.blogs?.length || 0,
    totalEvents: adminData.content.events?.length || 0,
    totalDonations: adminData.donations.length,
    totalVisitors: adminData.analytics.visitors,
    totalPageViews: adminData.analytics.pageViews,
    recentActivity: [
      { action: 'New user registered', timestamp: new Date().toISOString() },
      { action: 'Content updated', timestamp: new Date().toISOString() },
      { action: 'Donation received', timestamp: new Date().toISOString() }
    ]
  };
  
  res.json(stats);
});

// EXISTING CONTACT ROUTE (Enhanced)
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Track contact form submission
  adminData.analytics.contactForms++;

  const transporter = nodemailer.createTransporter({
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

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Admin Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin API endpoints available at /api/admin/*`);
});
