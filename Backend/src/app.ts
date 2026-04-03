import express from 'express';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes';
import cookieParser from 'cookie-parser';
const app = express();
/** Middleware  */
app.use(express.json());
app.use(cookieParser());

/** Routes */ 
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
 
export default app;