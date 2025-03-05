import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgresql://postgres.ysixmugojpkfxxhsfcjh:IfCvGxfda04jo6R@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
