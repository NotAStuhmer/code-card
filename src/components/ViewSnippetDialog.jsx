import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { copyToClipboard, detectLanguage } from '../utils/codeUtils';

const ViewSnippetDialog = ({
  open,
  handleClose,
  selectedSnippet,
  onDelete,
  onUpdate,
  onShowSnackbar
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedSnippet, setEditedSnippet] = useState(null);
  const navigate = useNavigate();

  // Initialize editedSnippet when selectedSnippet changes
  useEffect(() => {
    if (selectedSnippet) {
      setEditedSnippet({ ...selectedSnippet });
    }
  }, [selectedSnippet]);

  const handleEditClick = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditMode(false);
    if (selectedSnippet) {
      setEditedSnippet({ ...selectedSnippet });
    }
  }, [selectedSnippet]);

  const handleEditChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedSnippet(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editedSnippet) return;
    
    try {
      await onUpdate(editedSnippet.id, editedSnippet);
      setEditMode(false);
      onShowSnackbar('Snippet updated successfully!', 'success');
    } catch (error) {
      onShowSnackbar(`Error updating snippet: ${error.message}`, 'error');
    }
  }, [editedSnippet, onUpdate, onShowSnackbar]);

  const handleDeleteClick = useCallback(() => {
    if (selectedSnippet) {
      onDelete(selectedSnippet);
    }
  }, [selectedSnippet, onDelete]);

  const handleCopyCode = useCallback(async () => {
    if (!selectedSnippet) return;
    
    try {
      const success = await copyToClipboard(selectedSnippet.code);
      if (success) {
        onShowSnackbar('Code copied to clipboard!', 'success');
      } else {
        throw new Error('Failed to copy');
      }
    } catch (error) {
      onShowSnackbar('Failed to copy code to clipboard', 'error');
    }
  }, [selectedSnippet, onShowSnackbar]);

  const handleRunInPlayground = useCallback(() => {
    if (!selectedSnippet) return;
    
    // Store the code in localStorage to access it in the playground
    localStorage.setItem('playgroundCode', selectedSnippet.code);
    navigate('/playground');
  }, [selectedSnippet, navigate]);

  // Early return if no snippet is selected
  if (!selectedSnippet) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {editMode ? (
          <TextField
            name="title"
            value={editedSnippet?.title || ''}
            onChange={handleEditChange}
            fullWidth
            variant="standard"
            sx={{ fontSize: '1.25rem' }}
          />
        ) : (
          <Typography variant="h6">{selectedSnippet.title}</Typography>
        )}
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {editMode ? (
          <>
            <TextField
              name="description"
              label="Description"
              value={editedSnippet?.description || ''}
              onChange={handleEditChange}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-label"
                  name="difficulty"
                  value={editedSnippet?.difficulty || 'Easy'}
                  label="Difficulty"
                  onChange={handleEditChange}
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={editedSnippet?.category || 'Uncategorized'}
                  label="Category"
                  onChange={handleEditChange}
                >
                  <MenuItem value="Uncategorized">Uncategorized</MenuItem>
                  <MenuItem value="Arrays">Arrays</MenuItem>
                  <MenuItem value="Strings">Strings</MenuItem>
                  <MenuItem value="Linked Lists">Linked Lists</MenuItem>
                  <MenuItem value="Trees">Trees</MenuItem>
                  <MenuItem value="Graphs">Graphs</MenuItem>
                  <MenuItem value="Dynamic Programming">Dynamic Programming</MenuItem>
                  <MenuItem value="Sorting">Sorting</MenuItem>
                  <MenuItem value="Searching">Searching</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              name="code"
              label="Code"
              value={editedSnippet?.code || ''}
              onChange={handleEditChange}
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              sx={{ mb: 2, fontFamily: 'monospace' }}
            />
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedSnippet.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  backgroundColor:
                    selectedSnippet.difficulty === 'Easy'
                      ? 'rgba(46, 204, 113, 0.2)'
                      : selectedSnippet.difficulty === 'Medium'
                      ? 'rgba(241, 196, 15, 0.2)'
                      : 'rgba(231, 76, 60, 0.2)',
                  color:
                    selectedSnippet.difficulty === 'Easy'
                      ? '#2ecc71'
                      : selectedSnippet.difficulty === 'Medium'
                      ? '#f1c40f'
                      : '#e74c3c',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              >
                {selectedSnippet.difficulty}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(52, 152, 219, 0.2)',
                  color: '#3498db',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              >
                {selectedSnippet.category || 'Uncategorized'}
              </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Button
                size="small"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopyCode}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  },
                }}
              >
                Copy
              </Button>
              <SyntaxHighlighter
                language={detectLanguage(selectedSnippet.code)}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '8px',
                  marginBottom: '16px',
                  maxHeight: '400px',
                  fontSize: '14px',
                }}
              >
                {selectedSnippet.code}
              </SyntaxHighlighter>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<PlayArrowIcon />}
                onClick={handleRunInPlayground}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  }
                }}
              >
                Run in Playground
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          pt: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {editMode ? (
          <>
            <Button onClick={handleCancelEdit} color='inherit'>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              variant='contained'
              color='primary'
              startIcon={<EditIcon />}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Box>
              <Button
                onClick={handleDeleteClick}
                variant='contained'
                color='error'
                sx={{
                  backgroundColor: 'rgba(231, 76, 60, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(231, 76, 60, 1)',
                  },
                  mr: 1,
                }}
              >
                Delete
              </Button>
              <Button
                onClick={handleEditClick}
                variant='contained'
                color='secondary'
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: '#9C27B0',
                  '&:hover': {
                    backgroundColor: '#AB47BC',
                  },
                }}
              >
                Edit
              </Button>
            </Box>
            <Button
              onClick={handleClose}
              variant='contained'
              color='primary'
            >
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewSnippetDialog; 