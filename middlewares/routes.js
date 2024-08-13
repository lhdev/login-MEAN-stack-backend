import express from 'express';
import auth from './middleware/auth.js'; 
import userRoutes from '../routes/public.js'; 
const router = express.Router();

// Rotas públicas
router.use('/login', userRoutes);
router.use('/signup', userRoutes);

// Rotas protegidas
router.use(auth); 

export default router;
