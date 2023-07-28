import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './route/userRoute';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(router);

mongoose.connect(process.env.DB_URI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection has been established');
});

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});
