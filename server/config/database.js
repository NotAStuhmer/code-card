// import dotenv from 'dotenv';
import pkg from 'pg';

// dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    // 'postgres://postgres:IfCvGxfdda04jo6R@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
    'postgresql://postgres.ysixmugojpkfxxhsfcjh:IfCvGxfdda04jo6R@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
  // user: 'postgres.ysixmugojpkfxxhsfcjh',
  // password: [YOUR-PASSWORD],
  // host: 'aws-0-us-west-1.pooler.supabase.com',
  // port: 5432,
  // database: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
