import { createTheme, alpha } from '@mui/material/styles';

// Create a theme with a matte feel
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFA726', // Orange from your logo
      light: '#FFB74D',
      dark: '#F57C00',
    },
    secondary: {
      main: '#78909C', // Blue-gray
    },
    background: {
      default: '#1E2129', // Dark background
      paper: '#2D3748', // Slightly lighter for cards
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#A0AEC0',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'none',
          backgroundColor: '#1E2129', // Match this with AnimatedBackground
          backgroundAttachment: 'fixed',
        },
        '@font-face': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap)`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D3748', // Slightly lighter than background
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
        },
        containedPrimary: {
          backgroundColor: '#FFA726',
          '&:hover': {
            backgroundColor: '#FFB74D',
            boxShadow: '0 4px 12px rgba(255, 167, 38, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundImage: 'none',
          backgroundColor: '#1A1E2A', // Slightly darker than background
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundColor: '#282C34',
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});