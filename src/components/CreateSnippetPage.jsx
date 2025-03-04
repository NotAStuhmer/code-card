import React, { useState, useEffect } from 'react';
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
    const [formData, setFormData] = useState ({
        title: '',
        language: '',
        code: '',
        description: '',
        timeComplexity: 'O(n)',
        status: 'Draft',
    }

const handleChange {}

const handleSubmit {}
const handleCopy{}

return (
    //create container, sx prop for custom styling, md for medium width
    <Container 
    maxWidth="md" 
    sx={{ 
      border: '1px solid #ccc', 
      borderRadius: '10px', 
      padding: 0, 
      overflow: 'hidden',
      boxShadow: 2
    }}
  >
  {/* //navbar using mui appbar
  
  //main content, containing 9 fields/buttons
  //box is the container for form, paper is mui visual effect for some elevation */}
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
    <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: '10px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create Snippet Page
          </Typography>

{/* //spacing provides space between grid items. first text field is for user to create a custom title for the snippet */}
    <Grid container spacing={2}>
    <Grid item xs={12} sm={8}>
  <TextField
  name="title"
  label="Title"
  fullWidth
  variant="outlined"
  value={formData.title}
  onChange={handleChange}
  margin="normal"
  size="small"
  sx={{ mt: 1 }}
  />
  </Grid>

  {/* //time complexity chip here */}

    {/* //language dropdown */}
    <Grid item xs={12} sm={8}>
      <TextField select 
      name='language'
      label='Language'
      fullWidth
      variant="outlined"
      value={formData.language}
      onChange={handleChange}
      margin="normal"
      size="small"
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
    
)

}