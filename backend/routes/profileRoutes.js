import express from "express";
import multer from "multer";
import path from "path";
import Profile from "../models/Profile.js";
import mongoose from "mongoose";
import upload from "../middleware/upload.js";

const router = express.Router();



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

// ✅ Create or Update User Profile
router.post("/users", async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // 🔍 Check if profile exists
    let profile = await Profile.findOne({ userId });

    if (profile) {
      // 🔄 Update existing profile
      profile = await Profile.findOneAndUpdate({ userId }, profileData, { new: true });
      return res.json(profile);
    }

    // 🆕 Create new profile
    const newProfile = new Profile({ userId, ...profileData });
    await newProfile.save();
    
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("🔴 Error creating/updating profile:", error);
    res.status(500).json({ error: "Failed to process profile" });
  }
});

// ✅ Fetch User Profile
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("🔵 Fetching profile for userId:", userId);

    const user = await Profile.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("🔴 Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Upload profile picture (POST /api/upload)


export default router;
