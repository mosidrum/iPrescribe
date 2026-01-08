import { useState, memo, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    IconButton,
    Box,
    Stack,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Logo } from '../common/Logo';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#' },
    { label: 'Contact us', href: '#' },
];

export const Navbar = memo(() => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = useCallback(() => {
        setMobileOpen(prev => !prev);
    }, []);

    const drawer = (
        <Box sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Logo />
                <IconButton onClick={handleDrawerToggle} disableRipple>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <List>
                {NAV_LINKS.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            href={item.href}
                            onClick={handleDrawerToggle}
                            disableRipple
                            sx={{
                                '&:hover': {
                                    boxShadow: 'none',
                                    bgcolor: 'transparent'
                                },
                                '&:active': {
                                    bgcolor: 'transparent'
                                }
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="outlined" fullWidth size="large" href="/login" disableRipple>
                    Login
                </Button>
                <Button variant="contained" fullWidth size="large" onClick={handleDrawerToggle} disableRipple>
                    Join Waitlist
                </Button>
            </Box>
        </Box>
    );

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1 }}>
            <Container>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Logo />

                    {!isMobile && (
                        <Stack direction="row" spacing={4} alignItems="center">
                            {NAV_LINKS.map((link) => (
                                <Button
                                    key={link.label}
                                    href={link.href}
                                    variant="text"
                                    color="inherit"
                                    disableRipple
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        '&:hover': {
                                            boxShadow: 'none',
                                            backgroundColor: 'transparent',
                                            color: 'primary.main'
                                        },
                                        '&:active': {
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Stack>
                    )}

                    <Stack direction="row" spacing={1} alignItems="center">
                        {!isMobile && (
                            <>
                                <Button
                                    href="/login"
                                    variant="text"
                                    color="inherit"
                                    disableRipple
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 600,
                                        '&:hover': {
                                            boxShadow: 'none',
                                            backgroundColor: 'transparent',
                                            color: 'primary.main'
                                        },
                                        '&:active': {
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button variant="contained" size="medium" disableRipple>
                                    Join Waitlist
                                </Button>
                            </>
                        )}
                        {isMobile && (
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                                disableRipple
                                sx={{ bgcolor: 'rgba(40, 60, 133, 0.1)' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Stack>
                </Toolbar>
            </Container>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                PaperProps={{ sx: { width: '80%', maxWidth: 300 } }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
});
