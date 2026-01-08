import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const palette = {
    primary: {
        main: '#283C85',
        dark: '#1C2B5C',
        light: '#2E4C93',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#E63946',
    },
    background: {
        light: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        dark: {
            default: '#000000',
            paper: '#111111',
        },
    },
    text: {
        light: {
            primary: '#1A1A1A',
            secondary: '#666666',
        },
        dark: {
            primary: '#ffffff',
            secondary: '#A0A0A0',
        },
    },
    ui: {
        sidebarBg: '#283C85',
        footerBg: '#283C85',
        loginBg: '#283C85',
        buttonBg: '#283C85',
        logoutRed: '#FF6B6B',
        divider: 'rgba(255,255,255,0.05)',
        dividerLight: '#EAECF0',
    },
    chart: {
        blue: '#2E90FA',
        green: '#12B76A',
        orange: '#F79009',
        red: '#F04438',
    },
    status: {
        verified: {
            bg: '#ECFDF3',
            bgDark: '#064E3B',
            text: '#027A48',
            textDark: '#6EE7B7',
        },
        pending: {
            bg: '#F2F4F7',
            text: '#344054',
        },
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    small: 4,
    medium: 8,
    large: 12,
    pill: 50,
};

export const getTheme = (mode: 'light' | 'dark', fontFamily: string = 'Montserrat') => {
    const isDark = mode === 'dark';

    let theme = createTheme({
        palette: {
            mode,
            primary: {
                main: palette.primary.main,
                dark: palette.primary.dark,
                light: palette.primary.light,
                contrastText: palette.primary.contrastText,
            },
            secondary: {
                main: palette.secondary.main,
            },
            background: {
                default: isDark ? palette.background.dark.default : palette.background.light.default,
                paper: isDark ? palette.background.dark.paper : palette.background.light.paper,
            },
            text: {
                primary: isDark ? palette.text.dark.primary : palette.text.light.primary,
                secondary: isDark ? palette.text.dark.secondary : palette.text.light.secondary,
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
            borderRadius: borderRadius.large,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: borderRadius.pill,
                        padding: '10px 24px',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                    containedPrimary: {
                        background: palette.primary.main,
                        '&:hover': {
                            background: palette.primary.dark,
                            boxShadow: 'none',
                        },
                    },
                    text: {
                        '&:hover': {
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            boxShadow: 'none',
                        },
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
                        backgroundImage: 'none',
                    },
                },
            },
        },
    });

    theme = responsiveFontSizes(theme);
    return theme;
};

export default getTheme('light', 'Inter');
