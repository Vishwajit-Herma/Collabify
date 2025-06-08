// backend/routes/upload.js
import { Router } from 'express';
import express from 'express';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err); // Debugging
      return res.status(400).json({ message: err });
    }
    if (!req.file) {
      console.error('No file uploaded'); // Debugging
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('File uploaded successfully:', req.file); // Debugging
    res.json({ filePath: `http://localhost:8080/uploads/${req.file.filename}` });
  });
});

export default router;