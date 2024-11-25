import express from 'express';
import mongoose from 'mongoose';
import router from './router';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the enviroment.');
}
const mongodbUri: string = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use(router);

mongoose
  .connect(mongodbUri, {})
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error('Error connecting to database:', error);
  });

export default app;
