import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import CodeCard from './CodeCard';

const CardContainer = ({ 
  snippets, 
  loading, 
  filteredSnippets, 
  handleCardClick, 
  handleClickOpen 
}) => {
  return (
    <>
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
          Code Snippets
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
      
      {/* Snippet count */}
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
      </Box>
      
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
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            mt: 2
          }}
        >
          {filteredSnippets.map((snippet) => (
            <Box 
              key={snippet.id} 
              sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)', lg: 'calc(25% - 16px)' } 
              }}
            >
              <CodeCard 
                snippet={snippet} 
                onClick={handleCardClick} 
              />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default CardContainer; 