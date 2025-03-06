import {
  getAllSnippets,
  getSnippetById,
  getSnippetsByCategory,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from '../models/snippetModel.js';

// Get all snippets
const getAllSnippetsController = async (req, res, next) => {
  try {
    // Check if category filter is provided
    const { category } = req.query;
    
    let snippets;
    if (category) {
      snippets = await getSnippetsByCategory(category);
    } else {
      snippets = await getAllSnippets();
    }
    
    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};

// Get single snippet by id
const getSnippetByIdController = async (req, res, next) => {
  try {
    const snippet = await getSnippetById(req.params.id);
    if (!snippet) {
      res.status(404);
      throw new Error('Snippet not found');
    }
    res.status(200).json({ message: '✅ Snippet found', snippet });
  } catch (error) {
    next(error);
  }
};

//create a new snippet
const createSnippetController = async (req, res, next) => {
  try {
    const { title, description, difficulty, code, category } = req.body;
    if (!code) {
      res.status(400);
      throw new Error('Code is required');
    }
    const createdSnippet = await createSnippet({
      title: title || 'Untitled',
      description: description || '',
      difficulty: difficulty || 'Easy',
      code,
      category: category || 'Uncategorized',
    });
    res.status(201).json({ message: '✅ Snippet created', createdSnippet });
  } catch (error) {
    next(error);
  }
};

//update an existing snippet
const updateSnippetController = async (req, res, next) => {
  try {
    const { title, description, difficulty, code, category } = req.body;
    const snippet = await getSnippetById(req.params.id);

    //check if the snippet exists
    if (!snippet) {
      res.status(404);
      throw new Error('Snippet not found');
    }
    //create update object with fallbacks to existing values
    const updatedSnippet = await updateSnippet(req.params.id, {
      title: title || snippet.title || 'untitled',
      description: description || snippet.description || '',
      difficulty: difficulty || snippet.difficulty || 'undefined',
      code: code || snippet.code,
      category: category || snippet.category || 'Uncategorized',
    });
    res.status(200).json({ message: '✅ Snippet updated', updatedSnippet });
  } catch (error) {
    next(error);
  }
};

//delete a snippet
const deleteSnippetController = async (req, res, next) => {
  try {
    const snippet = await getSnippetById(req.params.id);
    //check if the snippet exists
    if (!snippet) {
      res.status(404);
      throw new Error('Snippet not found');
    }
    //delete snippet
    const deletedSnippet = await deleteSnippet(req.params.id);
    res.status(200).json({ message: '✅ Snippet deleted', deletedSnippet });
  } catch (error) {
    next(error);
  }
};

export {
  getAllSnippetsController,
  getSnippetByIdController,
  createSnippetController,
  updateSnippetController,
  deleteSnippetController,
};
