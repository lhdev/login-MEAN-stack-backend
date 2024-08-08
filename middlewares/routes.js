import express from 'express';
import auth from './middleware/auth.js'; // Corrija o caminho do middleware
import userRoutes from '../routes/public.js'; // Corrija o caminho do arquivo de rotas

const router = express.Router();

// Rotas públicas
router.use('/login', userRoutes);
router.use('/cadastro', userRoutes);

// Rotas protegidas
router.use(auth); // Aplica o middleware de autenticação a todas as rotas seguintes
// Adicione outras rotas protegidas aqui

export default router;
