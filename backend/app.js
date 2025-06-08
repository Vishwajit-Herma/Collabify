import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';
import taskRoutes from './routes/taskRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRouter from './routes/upload.js';
import User from './models/user.model.js'; 
import multer from 'multer';  
import profileRoutes from './routes/profileRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connect();


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer();

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use("/ai", aiRoutes);
app.use('/api', uploadRouter);
app.use("/api/tasks", taskRoutes);
app.use('/api', profileRoutes);


  // Example: Serve files from GridFS

  

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app; 
