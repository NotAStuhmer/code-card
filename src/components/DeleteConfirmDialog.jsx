import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const DeleteConfirmDialog = ({ 
  open, 
  handleClose, 
  snippetToDelete, 
  handleDeleteSnippet 
}) => {
  if (!snippetToDelete) return null;
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          Are you sure you want to delete "{snippetToDelete.title}"? This
          action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={handleClose} color='primary'>
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
  );
};

export default DeleteConfirmDialog; 