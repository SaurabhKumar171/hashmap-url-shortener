import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/url-route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



// routes
app.use('/api/v1', urlRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})