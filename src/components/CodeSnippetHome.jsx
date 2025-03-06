import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  Alert,
  ThemeProvider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { algorithmTopics } from '../data/algorithmTopics.js';
import AnimatedBackground from './AnimatedBackground';
import CategoryFilter from './CategoryFilter';
import CardContainer from './CardContainer';
import AddSnippetDialog from './AddSnippetDialog';
import ViewSnippetDialog from './ViewSnippetDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { useSnackbar } from '../hooks/useSnackbar';
import { useDialog } from '../hooks/useDialog';
import { useSnippets } from '../hooks/useSnippets';

export default function CodeSnippetHome() {
  // Use custom hooks
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  const addDialog = useDialog();
  const viewDialog = useDialog();
  const deleteDialog = useDialog();
  const { 
    snippets, 
    filteredSnippets, 
    loading, 
    categoryFilter, 
    addSnippet, 
    updateSnippet, 
    deleteSnippet, 
    handleCategoryToggle, 
    clearFilters 
  } = useSnippets();
  
  // Local state
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [snippetToDelete, setSnippetToDelete] = useState(null);

  // Handle card click to view snippet
  const handleCardClick = (snippet) => {
    setSelectedSnippet(snippet);
    viewDialog.handleOpen();
  };

  // Handle delete click
  const handleDeleteClick = (snippet) => {
    setSnippetToDelete(snippet);
    viewDialog.handleClose();
    deleteDialog.handleOpen();
  };

  // Handle view dialog close
  const handleViewDialogClose = () => {
    setSelectedSnippet(null);
    viewDialog.handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatedBackground />
      <Container
        sx={{
          py: 8,
          maxWidth: '100%',
          px: { xs: 2, sm: 3, md: 5 },
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CategoryFilter 
          categories={algorithmTopics}
          categoryFilter={categoryFilter}
          handleCategoryToggle={handleCategoryToggle}
          clearFilters={clearFilters}
        />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <CardContainer 
              snippets={snippets}
              loading={loading}
              filteredSnippets={filteredSnippets}
              handleCardClick={handleCardClick}
              handleClickOpen={addDialog.handleOpen}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Add Card Dialog */}
      <AddSnippetDialog 
        open={addDialog.open}
        handleClose={addDialog.handleClose}
        onAddSnippet={addSnippet}
        onShowSnackbar={showSnackbar}
      />

      {/* View Snippet Dialog */}
      <ViewSnippetDialog 
        open={viewDialog.open}
        handleClose={handleViewDialogClose}
        selectedSnippet={selectedSnippet}
        onDelete={handleDeleteClick}
        onUpdate={updateSnippet}
        onShowSnackbar={showSnackbar}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog 
        open={deleteDialog.open}
        handleClose={deleteDialog.handleClose}
        snippetToDelete={snippetToDelete}
        onDeleteConfirm={deleteSnippet}
        onShowSnackbar={showSnackbar}
      />

      {/* Notification Snackbar */}
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
