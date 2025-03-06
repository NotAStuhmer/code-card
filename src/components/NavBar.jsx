// src/components/NavBar.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import logo from '../assets/codecard_logo.png';
import { alpha } from '@mui/material/styles';

function NavBar() {
  const pages = [
    { name: 'Playground', path: '/playground' },
    { name: 'About', path: '/about' }
  ];

  return (
    <AppBar 
      position='sticky' 
      sx={{ 
        backgroundColor: '#232A38', // Slightly darker than background
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: 1100
      }}
      elevation={0}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo and Brand */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Box
              component='img'
              src={logo}
              alt='code card logo'
              sx={{
                height: 36,
                mr: 1.5,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ 
                mr: 2, 
                display: { xs: 'none', md: 'flex' },
                fontWeight: 600,
                color: '#FFA726',
                letterSpacing: '0.5px'
              }}
            >
              Code Card
            </Typography>
          </Box>

          {/* Desktop Menu Items */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                sx={{ 
                  my: 1, 
                  color: '#E2E8F0', 
                  display: 'block',
                  mx: 1,
                  px: 2.5,
                  py: 0.8,
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha('#FFA726', 0.1),
                    color: '#FFA726'
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
