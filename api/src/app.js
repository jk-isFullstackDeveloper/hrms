import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(cookieParser());
app.use('/api/v1', routes);
app.use(errorHandler);
export default app;