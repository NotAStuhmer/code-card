import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#1E2129',
      }}
    >
      {/* Subtle gradient overlay */}
      <Box
        component={motion.div}
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255, 167, 38, 0.03) 0%, rgba(30, 33, 41, 0) 50%)',
            'radial-gradient(circle at 60% 30%, rgba(255, 167, 38, 0.03) 0%, rgba(30, 33, 41, 0) 50%)',
            'radial-gradient(circle at 40% 70%, rgba(255, 167, 38, 0.03) 0%, rgba(30, 33, 41, 0) 50%)',
            'radial-gradient(circle at 80% 60%, rgba(255, 167, 38, 0.03) 0%, rgba(30, 33, 41, 0) 50%)',
            'radial-gradient(circle at 20% 20%, rgba(255, 167, 38, 0.03) 0%, rgba(30, 33, 41, 0) 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Very subtle grid */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundSize: '40px 40px',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          opacity: 0.5,
        }}
      />
    </Box>
  );
};

export default AnimatedBackground;

