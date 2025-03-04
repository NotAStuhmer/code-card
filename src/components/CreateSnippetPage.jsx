import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//defining languages. uses mui format
const languages = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'typescript', label: 'Typescript' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
];

const SnippetCreatorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    language: '',
    code: '',
    description: '',
    timeComplexity: 'O(n)',
    status: 'Draft',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Add API call to save the snippet here
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.code);
    //successnotification here?
  };

  return (
    //create container, sx prop for custom styling, md for medium width
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
      {/* //navbar using mui appbar
  
  //main content, containing 9 fields/buttons
  //box is the container for form, paper is mui visual effect for some elevation */}
      <Box component='form' onSubmit={handleSubmit} sx={{ p: 3 }}>
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
            Create Snippet Page
          </Typography>

          {/* //spacing provides space between grid items. first text field is for user to create a custom title for the snippet */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                name='title'
                label='Title'
                fullWidth
                variant='outlined'
                value={formData.title}
                onChange={handleChange}
                margin='normal'
                size='small'
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* //time complexity chip here */}

            {/* //language dropdown */}
            <Grid item xs={12} sm={8}>
              <TextField
                select
                name='language'
                label='Language'
                fullWidth
                variant='outlined'
                value={formData.language}
                onChange={handleChange}
                margin='normal'
                size='small'
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: 300 },
                  },
                }}
              >
                {languages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* //code editor */}
            <Grid item xs={12}>
              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography sx={{ position: 'absolute', top: 10, left: 10 }}>
                  Code Editor
                </Typography>
                <IconButton
                  sx={{ position: 'absolute', top: 5, right: 5 }}
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
                  rows={8}
                  variant='outlined'
                  value={formData.code}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pt: 5,
                      fontFamily: 'monospace',
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ position: 'relative', mt: 2 }}>
                <Typography sx={{ position: 'absolute', top: 10, left: 10 }}>
                  Description
                </Typography>
                <TextField
                  name='description'
                  multiline
                  fullWidth
                  rows={3}
                  variant='outlined'
                  value={formData.description}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      pt: 5,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}
          >
            <Button
              variant='contained'
              color='error'
              onClick={() => navigate('/CodeSnippetHome')}
              sx={{
                bgcolor: '#ffcdd2',
                color: '#c62828',
                '&:hover': {
                  bgcolor: '#ef9a9a',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='success'
              sx={{
                bgcolor: '#c8e6c9',
                color: '#2e7d32',
                '&:hover': {
                  bgcolor: '#a5d6a7',
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SnippetCreatorPage;
