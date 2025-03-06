import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button
} from '@mui/material';

const AddSnippetDialog = ({ 
  open, 
  handleClose, 
  newCard, 
  handleChange, 
  handleSubmit 
}) => {
  return (
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
  );
};

export default AddSnippetDialog; 