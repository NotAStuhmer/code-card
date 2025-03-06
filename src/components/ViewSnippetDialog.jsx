import React from 'react';
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

const ViewSnippetDialog = ({
  open,
  handleClose,
  selectedSnippet,
  editMode,
  editedSnippet,
  handleEditChange,
  handleSaveEdit,
  handleCancelEdit,
  handleDeleteClick,
  handleEditClick,
  handleCopyCode,
  handleRunInPlayground,
  detectLanguage
}) => {
  if (!selectedSnippet) return null;

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
          overflow: 'hidden',
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
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRunInPlayground}
                startIcon={<PlayArrowIcon />}
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