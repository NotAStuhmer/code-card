import pool from '../config/database.js';

// Get all snippets
export const getAllSnippets = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM snippets ORDER BY created_at DESC'
  ); // Example: Can be modified
  return rows;
};

// Get a single snippet by ID
export const getSnippetById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM snippets WHERE id = $1', [
    id,
  ]);
  return rows[0];
};

// Create a new snippet
export const createSnippet = async ({
  title,
  description,
  difficulty,
  code,
}) => {
  const { rows } = await pool.query(
    'INSERT INTO snippets (title, description, difficulty, code) VALUES ($1, $2, $3, $4) RETURNING *', // Can be modified based on props being saved into snippet
    [title, description, difficulty, code]
  );
  return rows[0];
};

// Update an existing snippet
export const updateSnippet = async (
  id,
  { title, description, difficulty, code }
) => {
  const { rows } = await pool.query(
    'UPDATE snippets SET title = $1, description = $2, difficulty = $3, code = $4 WHERE id = $5 RETURNING *', // Also can be modified based on props being saved during snippet construction
    [title, description, difficulty, code, id]
  );
  return rows[0];
};

// Delete a snippet
export const deleteSnippet = async (id) => {
  await pool.query('DELETE FROM snippets WHERE id = $1', [id]);
  return { message: 'Snippet deleted' };
};
