import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  Divider
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SaveIcon from '@mui/icons-material/Save';
import CodeExecutor from './CodeExecutor';
import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';

const CodePlayground = () => {
  const [code, setCode] = useState(() => {
    // Check if there's code in sessionStorage from a redirect
    const savedCode = sessionStorage.getItem('playgroundCode');
    if (savedCode) {
      // Clear the sessionStorage after retrieving the code
      sessionStorage.removeItem('playgroundCode');
      
      // Return the saved code with test case examples appended
      return `${savedCode}

// Test cases - add your own tests below
// Example:
console.log("Test with empty array:", maxDepth([]));
console.log("Test with flat array:", maxDepth([1, 2, 3]));
console.log("Test with nested array:", maxDepth([1, [2, 3], 4]));
`;
    }
    
    // Return the default code if no saved code exists
    return `// Write your JavaScript code here
function maxDepth(arr) {
  // Check if arr is an array; if not, throw an error
  if (!Array.isArray(arr)) {
    throw new Error("Invalid input: Expected an array");
  }

  // Base case: empty array
  if (arr.length === 0) {
    return 1;
  }

  let depth = 1;

  for (let ele of arr) {
    if (Array.isArray(ele)) {
      depth = Math.max(depth, 1 + maxDepth(ele));
    }
  }
  return depth;
}

// Test cases
console.log("Test 1: Empty array");
console.log("maxDepth([]) =", maxDepth([]));

console.log("\\nTest 2: Flat array");
console.log("maxDepth([1, 2, 3, 4]) =", maxDepth([1, 2, 3, 4]));

console.log("\\nTest 3: Nested array (depth 2)");
console.log("maxDepth([1, [2, 3], 4]) =", maxDepth([1, [2, 3], 4]));

console.log("\\nTest 4: Deeply nested array (depth 3)");
console.log("maxDepth([1, [2, [3]], 4]) =", maxDepth([1, [2, [3]], 4]));

console.log("\\nTest 5: Complex nested array");
console.log("maxDepth([1, [2, [3, [4]]], 5, [6, [7]]]) =", maxDepth([1, [2, [3, [4]]], 5, [6, [7]]]));
`;
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [snippetData, setSnippetData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    code: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

  // Handle code changes from the executor
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  // Open save dialog
  const handleSaveClick = () => {
    setSnippetData({
      ...snippetData,
      code: code
    });
    setSaveDialogOpen(true);
  };

  // Close save dialog
  const handleSaveDialogClose = () => {
    setSaveDialogOpen(false);
  };

  // Handle form field changes
  const handleSnippetDataChange = (e) => {
    const { name, value } = e.target;
    setSnippetData({
      ...snippetData,
      [name]: value
    });
  };

  // Save snippet to database
  const handleSaveSnippet = async () => {
    try {
      const response = await fetch('http://localhost:3000/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippetData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Close dialog
      setSaveDialogOpen(false);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Snippet saved successfully!',
        severity: 'success'
      });
      
      // Reset form
      setSnippetData({
        title: '',
        description: '',
        difficulty: 'Easy',
        code: ''
      });
      
      // Navigate back to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error saving snippet:', error);
      setSnackbar({
        open: true,
        message: `Error saving snippet: ${error.message}`,
        severity: 'error'
      });
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            JavaScript Playground
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={handleSaveClick}
            sx={{
              boxShadow: '0 4px 12px rgba(255, 167, 38, 0.2)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(255, 167, 38, 0.3)',
              }
            }}
          >
            Save as Snippet
          </Button>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
          Write, edit, and test JavaScript code. Use the console to see output and test your functions with different arguments.
          Add <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0 4px', borderRadius: '3px' }}>console.log()</code> statements to test your code with different inputs.
        </Typography>
        
        <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <CodeExecutor 
          initialCode={code} 
          onCodeChange={handleCodeChange} 
        />
      </Paper>
      
      {/* Save Dialog */}
      <Dialog 
        open={saveDialogOpen} 
        onClose={handleSaveDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          pb: 2,
          color: theme.palette.primary.main,
          fontWeight: 500
        }}>
          Save as Code Snippet
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={snippetData.title}
            onChange={handleSnippetDataChange}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 167, 38, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                }
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.text.secondary,
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.main,
              }
            }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={snippetData.description}
            onChange={handleSnippetDataChange}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 167, 38, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                }
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.text.secondary,
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.main,
              }
            }}
          />
          <FormControl fullWidth sx={{ 
            mb: 2,
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-root': {
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 167, 38, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              }
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.text.secondary,
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: theme.palette.primary.main,
            },
            '& .MuiSelect-icon': {
              color: theme.palette.text.secondary,
            }
          }}>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              name="difficulty"
              value={snippetData.difficulty}
              label="Difficulty"
              onChange={handleSnippetDataChange}
            >
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
          
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}>
            Code Preview:
          </Typography>
          <Box sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: theme.shape.borderRadius,
                fontSize: '0.9rem',
                maxHeight: '200px',
                overflow: 'auto'
              }}
              wrapLongLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          pt: 2
        }}>
          <Button onClick={handleSaveDialogClose} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button 
            onClick={handleSaveSnippet} 
            variant="contained" 
            color="primary"
            disabled={!snippetData.title || !code}
            sx={{
              boxShadow: '0 4px 12px rgba(255, 167, 38, 0.2)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(255, 167, 38, 0.3)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 167, 38, 0.3)',
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            Save Snippet
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: theme.shape.borderRadius,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CodePlayground; 