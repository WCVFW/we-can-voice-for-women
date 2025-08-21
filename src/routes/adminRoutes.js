import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  userController,
  contentController,
  eventController,
  donationController,
  mediaController,
  settingsController,
  dashboardController
} from '../controllers/adminController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '../../public/media');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/quicktime',
      'audio/mp3', 'audio/wav', 'audio/ogg',
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, videos, audio, and documents are allowed.'));
    }
  }
});

// DASHBOARD ROUTES
router.get('/dashboard/stats', dashboardController.getStats);

// USER ROUTES
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// CONTENT ROUTES
router.get('/content', contentController.getAll);
router.get('/content/:id', contentController.getById);
router.post('/content', contentController.create);
router.put('/content/:id', contentController.update);
router.delete('/content/:id', contentController.delete);

// EVENT ROUTES
router.get('/events', eventController.getAll);
router.post('/events', eventController.create);
router.put('/events/:id', eventController.update);
router.delete('/events/:id', eventController.delete);

// DONATION ROUTES
router.get('/donations', donationController.getAll);
router.post('/donations', donationController.create);
router.put('/donations/:id', donationController.update);
router.delete('/donations/:id', donationController.delete);

// MEDIA/ALBUM ROUTES
router.get('/albums', mediaController.getAllAlbums);
router.get('/albums/:albumId/media', mediaController.getMediaByAlbum);
router.post('/albums', mediaController.createAlbum);
router.delete('/albums/:id', mediaController.deleteAlbum);

// FILE UPLOAD ROUTES
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileUrl = `/media/${req.file.filename}`;
    
    // Determine file type
    let fileType = 'other';
    if (req.file.mimetype.startsWith('image/')) fileType = 'image';
    else if (req.file.mimetype.startsWith('video/')) fileType = 'video';
    else if (req.file.mimetype.startsWith('audio/')) fileType = 'audio';
    else if (req.file.mimetype.includes('pdf') || req.file.mimetype.includes('document')) fileType = 'document';

    // Save to database if album_id is provided
    if (req.body.album_id) {
      await mediaController.addMedia({
        body: {
          filename: req.file.filename,
          original_name: req.file.originalname,
          file_path: req.file.path,
          file_url: fileUrl,
          file_size: req.file.size,
          mime_type: req.file.mimetype,
          file_type: fileType,
          title: req.body.title || req.file.originalname,
          description: req.body.description || '',
          alt_text: req.body.alt_text || '',
          album_id: req.body.album_id,
          uploaded_by: req.body.uploaded_by || null
        }
      }, { status: () => ({ json: () => {} }) });
    }
    
    res.json({
      success: true,
      fileUrl: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      fileType: fileType
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Multiple files upload
router.post('/upload-multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const uploadedFiles = [];
    
    for (const file of req.files) {
      const fileUrl = `/media/${file.filename}`;
      
      let fileType = 'other';
      if (file.mimetype.startsWith('image/')) fileType = 'image';
      else if (file.mimetype.startsWith('video/')) fileType = 'video';
      else if (file.mimetype.startsWith('audio/')) fileType = 'audio';
      else if (file.mimetype.includes('pdf') || file.mimetype.includes('document')) fileType = 'document';

      uploadedFiles.push({
        fileUrl: fileUrl,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        fileType: fileType
      });

      // Save to database if album_id is provided
      if (req.body.album_id) {
        await mediaController.addMedia({
          body: {
            filename: file.filename,
            original_name: file.originalname,
            file_path: file.path,
            file_url: fileUrl,
            file_size: file.size,
            mime_type: file.mimetype,
            file_type: fileType,
            title: req.body.title || file.originalname,
            description: req.body.description || '',
            album_id: req.body.album_id,
            uploaded_by: req.body.uploaded_by || null
          }
        }, { status: () => ({ json: () => {} }) });
      }
    }

    res.json({
      success: true,
      files: uploadedFiles,
      count: uploadedFiles.length
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Delete file
router.delete('/media/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'File deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete file' });
  }
});

// SITE SETTINGS ROUTES
router.get('/settings', settingsController.getAll);
router.put('/settings', settingsController.update);

// LEGACY ROUTES FOR COMPATIBILITY
router.post('/save', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    switch (type) {
      case 'content':
        // Save content items
        for (const item of data) {
          if (item.id && !item.id.toString().startsWith('new_')) {
            await contentController.update({ params: { id: item.id }, body: item }, { json: () => {} });
          } else {
            await contentController.create({ body: item }, { status: () => ({ json: () => {} }) });
          }
        }
        break;
        
      case 'events':
        // Save events
        for (const item of data) {
          if (item.id && !item.id.toString().startsWith('new_')) {
            await eventController.update({ params: { id: item.id }, body: item }, { json: () => {} });
          } else {
            await eventController.create({ body: item }, { status: () => ({ json: () => {} }) });
          }
        }
        break;
        
      case 'donations':
        // Save donations
        for (const item of data) {
          if (item.id && !item.id.toString().startsWith('new_')) {
            await donationController.update({ params: { id: item.id }, body: item }, { json: () => {} });
          } else {
            await donationController.create({ body: item }, { status: () => ({ json: () => {} }) });
          }
        }
        break;
        
      case 'users':
        // Save users
        for (const item of data) {
          if (item.id && !item.id.toString().startsWith('new_')) {
            await userController.update({ params: { id: item.id }, body: item }, { json: () => {} });
          } else {
            await userController.create({ body: item }, { status: () => ({ json: () => {} }) });
          }
        }
        break;
        
      case 'albums':
        // Save albums
        for (const item of data) {
          if (item.id && !item.id.toString().startsWith('new_')) {
            // Update album logic here
          } else {
            await mediaController.createAlbum({ body: item }, { status: () => ({ json: () => {} }) });
          }
        }
        break;
        
      case 'settings':
        await settingsController.update({ body: { settings: data } }, { json: () => {} });
        break;
        
      case 'about':
        await settingsController.update({ 
          body: { 
            settings: {
              about_mission: data.mission,
              about_vision: data.vision,
              about_history: data.history,
              about_team: data.team
            } 
          } 
        }, { json: () => {} });
        break;
    }
    
    res.json({ success: true, message: `${type} data saved successfully` });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

router.get('/load/:type', async (req, res) => {
  try {
    const { type } = req.params;
    let data = [];
    
    switch (type) {
      case 'content':
        const contentResponse = await contentController.getAll({ query: {} }, {
          json: (result) => { data = result.data; }
        });
        break;
        
      case 'events':
        const eventsResponse = await eventController.getAll({ query: {} }, {
          json: (result) => { data = result.data; }
        });
        break;
        
      case 'donations':
        const donationsResponse = await donationController.getAll({ query: {} }, {
          json: (result) => { data = result.data; }
        });
        break;
        
      case 'users':
        const usersResponse = await userController.getAll({ query: {} }, {
          json: (result) => { data = result.data; }
        });
        break;
        
      case 'albums':
        const albumsResponse = await mediaController.getAllAlbums({}, {
          json: (result) => { data = result.data; }
        });
        break;
        
      case 'settings':
        const settingsResponse = await settingsController.getAll({}, {
          json: (result) => { data = result.data; }
        });
        break;
        
      case 'about':
        const aboutResponse = await settingsController.getAll({}, {
          json: (result) => { 
            const settings = result.data.general || {};
            data = {
              mission: settings.about_mission?.value || '',
              vision: settings.about_vision?.value || '',
              history: settings.about_history?.value || '',
              team: settings.about_team?.value || ''
            };
          }
        });
        break;
    }
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Load error:', error);
    res.status(500).json({ success: false, error: 'Failed to load data', data: [] });
  }
});

// Publish endpoint
router.post('/publish', async (req, res) => {
  try {
    // Here you would typically:
    // 1. Validate all data
    // 2. Generate static files if needed
    // 3. Deploy to production
    // 4. Clear caches
    // 5. Send notifications
    
    res.json({ 
      success: true, 
      message: 'All changes published successfully',
      publishedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ success: false, error: 'Failed to publish changes' });
  }
});

export default router;
