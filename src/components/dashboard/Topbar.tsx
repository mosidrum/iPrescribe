import { useState, memo, useCallback } from 'react';
import { AppBar, Toolbar, Stack, Typography, IconButton, Avatar, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';

interface TopBarProps {
    onMobileToggle?: () => void;
}

export const TopBar = memo(({ onMobileToggle }: TopBarProps) => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const { mode, toggleTheme } = useThemeStore();

    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const isUserMenuOpen = Boolean(userMenuAnchor);

    const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
    }, []);

    const handleCloseUserMenu = useCallback(() => {
        setUserMenuAnchor(null);
    }, []);

    const handleLogout = useCallback(() => {
        handleCloseUserMenu();
        logout();
        navigate('/login');
    }, [handleCloseUserMenu, logout, navigate]);

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                width: { md: `calc(100% - 280px)` },
                ml: { md: '280px' },
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                py: 1
            }}
        >
            <Toolbar sx={{ justifyContent: { xs: 'space-between', md: 'flex-end' } }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMobileToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                    disableRipple
                >
                    <MenuIcon />
                </IconButton>
                <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton onClick={toggleTheme} color="default" disableRipple>
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    <IconButton disableRipple>
                        <NotificationsNoneIcon />
                    </IconButton>

                    <Box
                        onClick={handleOpenUserMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                alt="Admin"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="subtitle2" fontWeight={600} lineHeight={1.2}>
                                    {user?.name || 'Alexandro'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {user?.role === 'admin' ? 'Admin' : 'User'}
                                </Typography>
                            </Box>
                            <KeyboardArrowDownIcon color="action" fontSize="small" />
                        </Stack>
                    </Box>
                    <Menu
                        anchorEl={userMenuAnchor}
                        open={isUserMenuOpen}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }} disableRipple>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
});
