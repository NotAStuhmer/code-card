import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import initializeDatabase from './db/initDb.js';
import snippetRoutes from './snippetRoutes.js';

//initialize the express app
const app = express();
const PORT = 3000;

//midlewares
app.use(cors()); //enable cors for all routes
app.use(express.json()); //parse json request bodies

app.use('/snippets', snippetRoutes);

// Initialize database (schema + seed data)
// initializeDatabase();

//error handling middlewares
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Global Error');
});

//listening port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
