import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { userInfo } from 'os';

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const testConnection = async () => {
    try {
        await prisma.$connect();
        console.log("Conexão com o banco de dados estabelecida com sucesso");
    } catch (err) {
        console.error("Erro ao conectar com o banco de dados:", err);
    }
};

router.use(cors());
router.use(express.json());

router.post('/signup', async (req, res) => {
    try {
        const userInfo = req.body;
        
        if (!userInfo.email || !userInfo.name || !userInfo.password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const hasLetter = /[A-Za-z]/.test(userInfo.password);  
        const hasNumber = /[0-9]/.test(userInfo.password);     
        
        console.log('Dados recebidos na requisição:', userInfo.password, hasLetter, hasNumber);
        
        if (!hasLetter || !hasNumber) {
            return res.status(400).json({ message: 'A senha deve conter pelo menos uma letra e um número' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(String(userInfo.password), salt);

        const userDB = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                password: hashPassword,
            },
        });

        res.status(201).json(userDB);
    } catch (err) {
        console.error("Erro durante a criação do usuário:", err);
        res.status(500).json({ message: 'Erro no Servidor, tente novamente' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body;
        console.log('Dados recebidos na requisição:', userInfo);

        const user = await prisma.user.findUnique({
            where: { email: userInfo.email },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Senha invalida" });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ token });
    } catch (err) {
        console.error('Erro no servidor:', err);
        return res.status(500).json({ message: 'Erro no Servidor, tente novamente' });
    }
});

export default router;
