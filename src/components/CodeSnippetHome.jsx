import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  ThemeProvider,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FilterListIcon from '@mui/icons-material/FilterList';
import { algorithmTopics } from '../data/algorithmTopics.js';

// Background animation component
const BackgroundAnimation = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
};

export default function CodeSnippetHome() {
  const [open, setOpen] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    code: '',
  });
  // Add state for the snippet modal
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  // Add state for delete confirmation dialog
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);
  // Add state for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editedSnippet, setEditedSnippet] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState([]);
  // Add state for filtered snippets
  const [filteredSnippets, setFilteredSnippets] = useState([]);

  // Fetch snippets from the server
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/snippets');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched snippets:', data); // Add logging to debug
      setSnippets(data);
      
      // Apply any existing filters
      applyFilters(data);
    } catch (error) {
      console.error('Error fetching snippets:', error);
      setSnackbar({
        open: true,
        message: `Error fetching snippets: ${error.message}`,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Load snippets when component mounts
  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        // Reset form and close dialog
        setNewCard({
          title: '',
          description: '',
          difficulty: 'Easy',
          code: '',
        });
        setOpen(false);

        // Show success message
        setSnackbar({
          open: true,
          message: 'Snippet added successfully!',
          severity: 'success',
        });

        // Refresh the snippets list
        fetchSnippets();
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to add snippet',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error adding snippet:', error);
      setSnackbar({
        open: true,
        message: `Error adding snippet: ${error.message}`,
        severity: 'error',
      });
    }
  };

  // Add handlers for the snippet modal
  const handleCardClick = (snippet) => {
    setSelectedSnippet(snippet);
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
  };

  // Modified to open confirmation dialog instead of deleting immediately
  const handleDeleteClick = (snippet) => {
    setSnippetToDelete(snippet);
    setDeleteConfirmOpen(true);
  };

  // Close the confirmation dialog
  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
    setSnippetToDelete(null);
  };

  // Actual delete function - called after confirmation
  const handleDeleteSnippet = async () => {
    if (!snippetToDelete) return;

    try {
      console.log(
        `Attempting to delete snippet with id: ${snippetToDelete.id}`
      );
      const response = await fetch(
        `http://localhost:3000/snippets/${snippetToDelete.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Close both dialogs
      setDeleteConfirmOpen(false);
      setViewModalOpen(false);

      // Show success message
      setSnackbar({
        open: true,
        message: 'Snippet deleted successfully!',
        severity: 'success',
      });

      // Refresh the snippets list
      fetchSnippets();
    } catch (error) {
      console.error('Error deleting snippet:', error);
      setSnackbar({
        open: true,
        message: `Error deleting snippet: ${error.message}`,
        severity: 'error',
      });
      setDeleteConfirmOpen(false);
    }
  };

  // Add handler for edit button
  const handleEditClick = () => {
    setEditedSnippet({ ...selectedSnippet });
    setEditMode(true);
  };

  // Add handler for edit changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedSnippet({
      ...editedSnippet,
      [name]: value,
    });
  };

  // Add handler for saving edits
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/snippets/${editedSnippet.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedSnippet),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the selected snippet with edited values
      setSelectedSnippet(editedSnippet);

      // Exit edit mode
      setEditMode(false);

      // Show success message
      setSnackbar({
        open: true,
        message: 'Snippet updated successfully!',
        severity: 'success',
      });

      // Refresh the snippets list
      fetchSnippets();
    } catch (error) {
      console.error('Error updating snippet:', error);
      setSnackbar({
        open: true,
        message: `Error updating snippet: ${error.message}`,
        severity: 'error',
      });
    }
  };

  // Add handler to cancel edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedSnippet(null);
  };

  // Add a function to detect language (optional enhancement)
  const detectLanguage = (code) => {
    // Simple detection based on common patterns
    if (
      code.includes('function') ||
      code.includes('const') ||
      code.includes('let') ||
      code.includes('var')
    ) {
      return 'javascript';
    } else if (code.includes('import') && code.includes('from')) {
      return 'jsx';
    } else if (code.includes('class') && code.includes('public')) {
      return 'java';
    } else if (code.includes('def ') && code.includes(':')) {
      return 'python';
    }
    // Default fallback
    return 'javascript';
  };

  const handleCategoryToggle = (category) => {
    if (categoryFilter.includes(category)) {
      setCategoryFilter(categoryFilter.filter((c) => c !== category));
    } else {
      setCategoryFilter([...categoryFilter, category]);
    }
  };

  // Add a function to apply filters
  const applyFilters = (snippetsToFilter = snippets) => {
    if (categoryFilter.length === 0) {
      // If no categories selected, show all snippets
      setFilteredSnippets(snippetsToFilter);
    } else {
      // Filter snippets by selected categories
      const filtered = snippetsToFilter.filter(snippet => 
        categoryFilter.includes(snippet.category || "Uncategorized")
      );
      setFilteredSnippets(filtered);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedSnippet.code);

      // Show success message
      setSnackbar({
        open: true,
        message: 'Code copied to clipboard!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setSnackbar({
        open: true,
        message: 'Failed to copy code to clipboard',
        severity: 'error',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundAnimation />
      <Container
        sx={{
          py: 8,
          maxWidth: '100%',
          px: { xs: 2, sm: 3, md: 5 },
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            mb: 5,
            pb: 3,
            borderBottom: '1px solid rgba(255,255,255,0.12)'
          }}
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)'
            }}>
              <FilterListIcon sx={{ mr: 1.5, color: '#FFA726' }} />
              Categories
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
              sx={{ 
                px: 3.5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(255, 167, 38, 0.3)',
                backgroundColor: '#FFA726',
                '&:hover': {
                  backgroundColor: '#FFB74D',
                  boxShadow: '0 8px 20px rgba(255, 167, 38, 0.4)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}
              component={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Add Card
            </Button>
          </Box>
          
          {/* Category chips with improved styling */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1.2,
            mx: -0.5,
            pb: 1
          }}>
            {algorithmTopics.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryToggle(category)}
                color={categoryFilter.includes(category) ? "primary" : "default"}
                variant={categoryFilter.includes(category) ? "filled" : "outlined"}
                sx={{ 
                  borderRadius: '20px',
                  py: 2.5,
                  px: 0.5,
                  fontSize: '0.9rem',
                  fontWeight: categoryFilter.includes(category) ? 500 : 400,
                  transition: 'all 0.2s ease',
                  borderColor: 'rgba(255,255,255,0.15)',
                  backgroundColor: categoryFilter.includes(category) 
                    ? '#FFA726' 
                    : 'rgba(255, 255, 255, 0.04)',
                  '&:hover': {
                    backgroundColor: categoryFilter.includes(category) 
                      ? '#FFB74D' 
                      : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: categoryFilter.includes(category)
                      ? '0 4px 12px rgba(255, 167, 38, 0.3)'
                      : 'none'
                  },
                  '& .MuiChip-label': {
                    px: 1.5
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Add snippet count */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              mt: 1
            }}>
              <Typography variant="body2" color="text.secondary">
                {loading ? 'Loading snippets...' : 
                  `Showing ${filteredSnippets.length} of ${snippets.length} snippets`}
              </Typography>
              
              {categoryFilter.length > 0 && (
                <Button 
                  size="small" 
                  onClick={() => setCategoryFilter([])}
                  startIcon={<FilterListIcon />}
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'none'
                  }}
                >
                  Clear filters
                </Button>
              )}
            </Box>
          </Grid>
          
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mt: 4,
              }}
            >
              <Typography variant='h6' color='text.secondary'>
                Loading snippets...
              </Typography>
            </Box>
          ) : snippets.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mt: 4,
              }}
            >
              <Typography variant='h6' color='text.secondary'>
                No snippets found. Add your first one!
              </Typography>
            </Box>
          ) : (
            filteredSnippets.map((snippet) => (
              <Grid item key={snippet.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: 0.1,
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      position: 'relative',
                      borderRadius: '12px',
                      backgroundColor: '#282C34',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '3px',
                        background: 'linear-gradient(90deg, #FFA726, #FF8F00)',
                      },
                    }}
                    onClick={() => handleCardClick(snippet)}
                  >
                    <CardContent sx={{ flexGrow: 1, pt: 4, pb: 2 }}>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='h2'
                        sx={{
                          color: '#FFA726',
                          fontWeight: 500,
                          mb: 2,
                        }}
                      >
                        {snippet.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {snippet.description}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{
                          display: 'inline-block',
                          backgroundColor:
                            snippet.difficulty === 'Easy'
                              ? 'rgba(46, 204, 113, 0.2)'
                              : snippet.difficulty === 'Medium'
                              ? 'rgba(241, 196, 15, 0.2)'
                              : 'rgba(231, 76, 60, 0.2)',
                          color:
                            snippet.difficulty === 'Easy'
                              ? '#2ecc71'
                              : snippet.difficulty === 'Medium'
                              ? '#f1c40f'
                              : '#e74c3c',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: 500,
                        }}
                      >
                        {snippet.difficulty}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Add Card Dialog - styled */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
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
          }}
        >
          Add New Code Card
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin='dense'
            name='title'
            label='Title'
            type='text'
            fullWidth
            variant='outlined'
            value={newCard.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin='dense'
            name='description'
            label='Description'
            type='text'
            fullWidth
            variant='outlined'
            multiline
            rows={2}
            value={newCard.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id='difficulty-label'>Difficulty</InputLabel>
            <Select
              labelId='difficulty-label'
              name='difficulty'
              value={newCard.difficulty}
              label='Difficulty'
              onChange={handleChange}
            >
              <MenuItem value='Easy'>Easy</MenuItem>
              <MenuItem value='Medium'>Medium</MenuItem>
              <MenuItem value='Hard'>Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            name='code'
            label='Code'
            type='text'
            fullWidth
            variant='outlined'
            multiline
            rows={6}
            value={newCard.code}
            onChange={handleChange}
            sx={{ mb: 2, fontFamily: 'monospace' }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            pt: 2,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Add Card
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Snippet Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={handleViewModalClose}
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
            overflow: 'hidden',
          },
        }}
      >
        {selectedSnippet && (
          <>
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
                  name='title'
                  value={editedSnippet.title}
                  onChange={handleEditChange}
                  fullWidth
                  variant='outlined'
                  sx={{ mr: 2 }}
                />
              ) : (
                <Typography
                  variant='h5'
                  component='div'
                  sx={{ color: '#FFA726', fontWeight: 500 }}
                >
                  {selectedSnippet.title}
                </Typography>
              )}
              {editMode ? (
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    name='difficulty'
                    value={editedSnippet.difficulty}
                    onChange={handleEditChange}
                    size='small'
                  >
                    <MenuItem value='Easy'>Easy</MenuItem>
                    <MenuItem value='Medium'>Medium</MenuItem>
                    <MenuItem value='Hard'>Hard</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Typography
                  variant='caption'
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
              )}
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              {editMode ? (
                <>
                  <TextField
                    name='description'
                    value={editedSnippet.description}
                    onChange={handleEditChange}
                    fullWidth
                    variant='outlined'
                    multiline
                    rows={3}
                    sx={{ mb: 3 }}
                  />
                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    Code:
                  </Typography>
                  <TextField
                    name='code'
                    value={editedSnippet.code}
                    onChange={handleEditChange}
                    fullWidth
                    variant='outlined'
                    multiline
                    rows={10}
                    sx={{
                      mb: 2,
                      fontFamily: 'monospace',
                      '& .MuiInputBase-input': {
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                </>
              ) : (
                <>
                  <Typography variant='body1' sx={{ mb: 3 }}>
                    {selectedSnippet.description}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    Code:
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        handleCopyCode();
                      }}
                      startIcon={<ContentCopyIcon />}
                      sx={{
                        color: '#FFA726',
                        borderColor: 'rgba(255, 167, 38, 0.5)',
                        '&:hover': {
                          borderColor: '#FFA726',
                          backgroundColor: 'rgba(255, 167, 38, 0.08)',
                        },
                      }}
                    >
                      Copy
                    </Button>
                  </Typography>
                  <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
                    <SyntaxHighlighter
                      language={detectLanguage(selectedSnippet.code)}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                      }}
                      wrapLongLines={true}
                    >
                      {selectedSnippet.code}
                    </SyntaxHighlighter>
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
                      onClick={() => handleDeleteClick(selectedSnippet)}
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
                    onClick={handleViewModalClose}
                    variant='contained'
                    color='primary'
                  >
                    Close
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add the Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteConfirmClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
            },
          },
        }}
      >
        <DialogTitle
          sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2 }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography>
            Are you sure you want to delete "{snippetToDelete?.title}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button onClick={handleDeleteConfirmClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSnippet}
            variant='contained'
            color='error'
            sx={{
              backgroundColor: 'rgba(231, 76, 60, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(231, 76, 60, 1)',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar - styled */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

//good job! :) thanks
