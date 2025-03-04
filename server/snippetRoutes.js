// snippetRoutes.js (for example)
import express from 'express';
import {
  getAllSnippetsController,
  getSnippetByIdController,
  createSnippetController,
  updateSnippetController,
  deleteSnippetController,
} from './controllers/snippetController.js';

const snippetRoutes = express.Router();

// GET all snippets
snippetRoutes.get('/', getAllSnippetsController);

// GET one snippet by ID
snippetRoutes.get('/:id', getSnippetByIdController);

// POST (create) a snippet
snippetRoutes.post('/', createSnippetController);

// PUT (update) a snippet
snippetRoutes.put('/:id', updateSnippetController);

// DELETE a snippet
snippetRoutes.delete('/:id', deleteSnippetController);

export default snippetRoutes;
