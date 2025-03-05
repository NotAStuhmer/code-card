import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CodeSnippetDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [snippet, setSnippet] = useState({
    title: 'Example Sorting Algorithm',
    language: 'javascript',
    code: 'function bubbleSort(arr) {\n  let len = arr.length;\n  for (let i = 0; i < len; i++) {\n    for (let j = 0; j < len - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        // Swap\n        let tmp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = tmp;\n      }\n    }\n  }\n  return arr;\n}',
    description:
      'A simple implementation of the bubble sort algorithm in JavaScript.',
  });

  useEffect(() => {
    // TODO: Backend integration - fetch snippet by ID
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSnippet({
      ...snippet,
      [name]: value,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    // TODO: Backend integration - notification system
  };

  const handleSave = () => {
    // TODO: Backend integration - save snippet changes
    console.log('Saving changes:', snippet);
  };

  const handleDelete = () => {
    // TODO: Backend integration - delete snippet API call
    navigate('/CodeSnippetHome');
  };

  return (
    <Container
      maxWidth='md'
      sx={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: 0,
        overflow: 'hidden',
        boxShadow: 2,
      }}
    >
      <AppBar position='static' color='default' elevation={0}>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center' }}>
            NavBar
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
          }}
        >
          <Typography variant='h5' align='center' gutterBottom>
            Code Snippet Details Page
          </Typography>

          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <TextField
                name='title'
                label='Title'
                fullWidth
                variant='outlined'
                value={snippet.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid2>

            <Grid2 xs={12}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
                >
                  Description
                </Typography>
                <TextField
                  name='description'
                  multiline
                  fullWidth
                  rows={4}
                  variant='outlined'
                  value={snippet.description}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pt: 5,
                    },
                  }}
                />
              </Box>
            </Grid2>

            <Grid2 xs={12}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography
                  sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
                >
                  Code Snippet
                </Typography>
                <IconButton
                  sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
                  onClick={handleCopy}
                >
                  <Typography variant='caption' sx={{ mr: 0.5 }}>
                    Copy
                  </Typography>
                  <ContentCopyIcon fontSize='small' />
                </IconButton>
                <TextField
                  name='code'
                  multiline
                  fullWidth
                  rows={12}
                  variant='outlined'
                  value={snippet.code}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pt: 5,
                      fontFamily: 'monospace',
                    },
                  }}
                />
              </Box>
            </Grid2>
          </Grid2>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}
          >
            <Button
              variant='contained'
              color='error'
              onClick={handleDelete}
              sx={{
                bgcolor: '#ffcdd2',
                color: '#c62828',
                '&:hover': {
                  bgcolor: '#ef9a9a',
                },
              }}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={handleSave}
              sx={{
                bgcolor: '#c8e6c9',
                color: '#2e7d32',
                '&:hover': {
                  bgcolor: '#a5d6a7',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CodeSnippetDetailsPage;
