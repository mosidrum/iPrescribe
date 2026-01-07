import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Colors derived from design
const PRIMARY_BLUE = '#2E4C93'; // Approximate from "Join Waitlist"
const PRIMARY_DARK = '#1C2B5C'; // Footer background
const ACCENT_RED = '#E63946'; // Logo red (approx)
const TEXT_DARK = '#1A1A1A';
const TEXT_SECONDARY = '#666666';

let theme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_BLUE,
            dark: PRIMARY_DARK,
            contrastText: '#ffffff',
        },
        secondary: {
            main: ACCENT_RED,
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: TEXT_DARK,
            secondary: TEXT_SECONDARY,
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '3.5rem',
            lineHeight: 1.2,
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px', // Pill shape for main buttons
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                    },
                },
                containedPrimary: {
                    background: PRIMARY_BLUE,
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'lg',
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
