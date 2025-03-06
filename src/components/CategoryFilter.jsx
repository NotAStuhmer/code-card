import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from 'framer-motion';

const CategoryFilter = ({ 
  categories, 
  categoryFilter, 
  handleCategoryToggle, 
  clearFilters 
}) => {
  return (
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
        
        {categoryFilter.length > 0 && (
          <Button 
            size="small" 
            onClick={clearFilters}
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
      
      {/* Category chips with improved styling */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1.2,
        mx: -0.5,
        pb: 1
      }}>
        {categories.map((category) => (
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
  );
};

export default CategoryFilter; 