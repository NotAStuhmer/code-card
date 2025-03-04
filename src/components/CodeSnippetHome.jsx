import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid2,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import NavBar from './components/NavBar';

const cards = [
  {
    id: 1,
    title: 'Snippet 1',
    description: 'This is where the prompt will be',
    //how to access embedded code
  },
  {
    id: 2,
    title: 'Snippet 2',
    description: 'This is where the prompt will be',
    //how to access embedded code
  },
  {
    id: 3,
    title: 'Snippet 3',
    description: 'This is where the prompt will be',
    //how to access embedded code
  },
  {
    id: 4,
    title: 'Snippet 4',
    description: 'This is where the prompt will be',
    //how to access embedded code
  },
  {
    id: 5,
    title: 'Snippet 5',
    description: 'This is where the prompt will be',
    //how to access embedded code
  },
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#ff5252',
    // },
  },
});

export default function CodeSnippetHome() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' noWrap>
            Code Card
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color='#E06A34'>Home</Button>
          <Button color='#E06A34'>Cards</Button>
          <Button color='#E06A34'>About</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: '#373C3E',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Code Card
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='lg'>
          <Grid2 container spacing={4}>
            {cards.map((card) => (
              <Grid2 item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component='img'
                    height='200'
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small'>View</Button>
                    <Button size='small'>Edit</Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </main>
    </ThemeProvider>
  );
}

//good job! :) thanks
