import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config();

//Rutas
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

import trim from './middleware/trim'

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());


app.get('/',(_,res)=>res.send('Working well!'))

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT
app.listen(PORT, async ()=>{
    console.log(`Server running at http://localhost:${PORT}`);

    try {
        await createConnection()
        console.log('database connected');
    } catch (error) {
        console.log(error)
    }
})

