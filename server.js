import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'
import cors from 'cors'

const app = express();


const corsOptions = {
    origin: 'http://localhost:56593', // Substitua pelo URL do seu frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(3000, () => {
    console.log("Servidor Rodando");
});
