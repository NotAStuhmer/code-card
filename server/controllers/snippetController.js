import { getAllSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet } from "../models/snippetModel.js";

//get all snippets
const getAllSnippets = async (req, res, next) => {
    try {
        const snippets = await getAllSnippets();
        res.json(snippets);
    } catch (error) {
        next(error);
    }
}

//get single snippet by id
const getSnippetByIdController = async (req, res, next) => {
    try {
        const snippet = await getSnippetsById(req.params.id);
        if(!snippet) {
            res.status(404);
            throw new Error('Snippet not found');
        }
        res.json(snippets);
    } catch (error) {
        next(error);
    }
};
//create a new snippet
const createSnippetController = async (req, res, next) => {
    try {
        const { title, description, difficulty, code } = req.body;
        if(!code) {
            res.status(400);
            throw new Error('Code is required');
        }
        const newSnippet = await createSnippet({
            title: title || 'Untitled Snippet',
            description: description || '',
            difficulty: difficulty || 'undefined',
            code
        });
        res.json(201).json(newSnippet);
    } catch (error) {
        next(error);
    }
};
//update an existing snippet
const updateSnippetCon


//delete a snippet

