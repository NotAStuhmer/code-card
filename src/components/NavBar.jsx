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

function NavBar() {
  const pages = [
    { name: 'About', path: '/about' }
  ];

  return (
    <AppBar 
      position='static' 
      sx={{ 
        backgroundColor: '#893a33',
        borderRadius: '0 0 16px 16px', // Rounded bottom corners
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Desktop Logo */}
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
                height: 40,
                mr: 1,
              }}
            />
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
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
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  mx: 1,
                  px: 2,
                  borderRadius: 2
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
