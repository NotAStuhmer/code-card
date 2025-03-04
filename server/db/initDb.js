import { readFileSync } from 'fs';
import pool from '../config/database.js';

const initializeDatabase = async () => {
  try {
    // ✅ Read and execute schema.sql
    const schema = readFileSync('./db/schema.sql', 'utf-8');
    await pool.query(schema);
    console.log('✅ Database schema applied successfully.');

    // ✅ Read and execute seed.sql
    const seedData = readFileSync('./db/seed.sql', 'utf-8');
    await pool.query(seedData);
    console.log('✅ Seed data inserted successfully.');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
};

export default initializeDatabase;
