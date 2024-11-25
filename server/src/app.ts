import express from 'express';
import riderRoutes from './routes/riderRoutes';
import driverRoutes from './routes/driverRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/riders', riderRoutes);
app.use('/api/drivers', driverRoutes);

export default app;
