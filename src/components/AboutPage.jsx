import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import { theme } from '../theme';

export default function AboutPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        sx={{ 
          py: 8, 
          maxWidth: '100%',
          px: { xs: 2, sm: 3, md: 5 }
        }} 
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            backgroundColor: 'background.paper',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            About Code Cards
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Code Cards is a platform designed to help developers store, organize, and practice code snippets. 
            Whether you're learning a new language, preparing for technical interviews, or simply want to keep 
            your frequently used code patterns in one place, Code Cards provides an elegant solution.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', backgroundColor: 'background.paper', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.light' }}>
                    Our Mission
                  </Typography>
                  <Typography variant="body2">
                    We believe that efficient coding requires both knowledge and practice. Code Cards aims to 
                    provide a centralized repository for your code snippets, making it easier to recall and 
                    reuse solutions to common programming challenges. Our goal is to help you become a more 
                    efficient and knowledgeable developer.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', backgroundColor: 'background.paper', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.light' }}>
                    How It Works
                  </Typography>
                  <Typography variant="body2">
                    Simply create cards for your code snippets, categorize them by language and difficulty, 
                    and access them whenever you need. You can view, edit, and practice with your snippets 
                    anytime. The platform is designed to be intuitive and focused on what matters most: 
                    your code.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.light', mb: 3 }}>
              Key Features
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <StorageIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Organized Storage" 
                  secondary="Keep all your code snippets in one place, organized by language and difficulty."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CodeIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Syntax Highlighting" 
                  secondary="View your code with proper syntax highlighting for better readability."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <BuildIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Easy Editing" 
                  secondary="Update your snippets as you refine your solutions or learn new techniques."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Practice Mode" 
                  secondary="Test your recall and coding skills by practicing with your saved snippets."
                />
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
} 