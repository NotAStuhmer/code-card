import pool from '../config/database.js';

// Get all snippets
export const getAllSnippets = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM snippets ORDER BY created_at DESC'
  );
  return rows;
};

// Get snippets by category
export const getSnippetsByCategory = async (category) => {
  const { rows } = await pool.query(
    'SELECT * FROM snippets WHERE category = $1 ORDER BY created_at DESC',
    [category]
  );
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
  category,
}) => {
  const { rows } = await pool.query(
    'INSERT INTO snippets (title, description, difficulty, code, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, description, difficulty, code, category]
  );
  return rows[0];
};

// Update an existing snippet
export const updateSnippet = async (
  id,
  { title, description, difficulty, code, category }
) => {
  const { rows } = await pool.query(
    'UPDATE snippets SET title = $1, description = $2, difficulty = $3, code = $4, category = $5 WHERE id = $6 RETURNING *',
    [title, description, difficulty, code, category, id]
  );
  return rows[0];
};

// Delete a snippet
export const deleteSnippet = async (id) => {
  await pool.query('DELETE FROM snippets WHERE id = $1', [id]);
  return { message: 'Snippet deleted' };
};
