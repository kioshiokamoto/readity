import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config();

//Rutas
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/subs'
import miscRoutes from './routes/misc'

import trim from './middleware/trim'

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN,
    optionsSuccessStatus: 200,
}))


app.get('/',(_,res)=>res.send('Working well!'))

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/misc', miscRoutes);

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

