import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const PRIMARY_BLUE = '#2E4C93';
const PRIMARY_DARK = '#1C2B5C';
const ACCENT_RED = '#E63946';

// Light Mode Colors
const LIGHT_BG_DEFAULT = '#ffffff';
const LIGHT_BG_PAPER = '#ffffff';
const LIGHT_TEXT_PRIMARY = '#1A1A1A';
const LIGHT_TEXT_SECONDARY = '#666666';

// Dark Mode Colors
const DARK_BG_DEFAULT = '#000000';
const DARK_BG_PAPER = '#111111'; // Slightly lighter for cards to distinguish from pure black bg
const DARK_TEXT_PRIMARY = '#ffffff';
const DARK_TEXT_SECONDARY = '#A0A0A0';

export const getTheme = (mode: 'light' | 'dark', fontFamily: string = 'Montserrat') => {
    const isDark = mode === 'dark';

    let theme = createTheme({
        palette: {
            mode,
            primary: {
                main: PRIMARY_BLUE,
                dark: PRIMARY_DARK,
                contrastText: '#ffffff',
            },
            secondary: {
                main: ACCENT_RED,
            },
            background: {
                default: isDark ? DARK_BG_DEFAULT : LIGHT_BG_DEFAULT,
                paper: isDark ? DARK_BG_PAPER : LIGHT_BG_PAPER,
            },
            text: {
                primary: isDark ? DARK_TEXT_PRIMARY : LIGHT_TEXT_PRIMARY,
                secondary: isDark ? DARK_TEXT_SECONDARY : LIGHT_TEXT_SECONDARY,
            },
        },
        typography: {
            fontFamily: `"${fontFamily}", "Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
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
                        borderRadius: '50px',
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
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none', // Disable default MUI overlay in dark mode
                    }
                }
            }
        },
    });

    theme = responsiveFontSizes(theme);
    return theme;
};

// Default export for backward compatibility if needed, though we should switch to named exports
export default getTheme('light', 'Inter');
