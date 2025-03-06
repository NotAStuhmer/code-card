import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CodeCard = ({ snippet, onClick }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.1,
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '12px',
          backgroundColor: '#2D3748',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.05)',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #FFA726, #FF8F00)',
          },
        }}
        onClick={() => onClick(snippet)}
      >
        <CardContent sx={{ flexGrow: 1, pt: 4, pb: 2 }}>
          <Typography
            gutterBottom
            variant='h5'
            component='h2'
            sx={{
              color: '#FFA726',
              fontWeight: 500,
              mb: 2,
            }}
          >
            {snippet.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {snippet.description}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              display: 'inline-block',
              backgroundColor:
                snippet.difficulty === 'Easy'
                  ? 'rgba(46, 204, 113, 0.2)'
                  : snippet.difficulty === 'Medium'
                  ? 'rgba(241, 196, 15, 0.2)'
                  : 'rgba(231, 76, 60, 0.2)',
              color:
                snippet.difficulty === 'Easy'
                  ? '#2ecc71'
                  : snippet.difficulty === 'Medium'
                  ? '#f1c40f'
                  : '#e74c3c',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500,
            }}
          >
            {snippet.difficulty}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CodeCard; 