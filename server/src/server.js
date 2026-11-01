import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { setMongoReady } from './services/caseService.js';

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`AI Mystery Room API listening on port ${port}`));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
    setMongoReady(true);
    console.log('MongoDB connected.');
    })
    .catch(() => {
    console.warn('MongoDB is unavailable; using temporary in-memory case storage.');
    });
}
