import { useState, memo, useCallback } from 'react';
import { AppBar, Toolbar, Stack, Typography, IconButton, Button, Avatar, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { palette } from '../../theme/theme';

export const TopBar = memo(() => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const { mode, toggleTheme } = useThemeStore();
    const { dateRange, setDateRange } = useDashboardStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const isUserMenuOpen = Boolean(userMenuAnchor);

    const handleDateClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleDateClose = useCallback((newRange?: string) => {
        if (newRange) {
            setDateRange(newRange);
        }
        setAnchorEl(null);
    }, [setDateRange]);

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
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                        Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Latest update for the last 7 days. check now
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                        variant="outlined"
                        disableRipple
                        startIcon={<CalendarTodayIcon fontSize="small" />}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleDateClick}
                        sx={{
                            borderRadius: '8px',
                            borderColor: 'divider',
                            color: 'text.primary',
                            textTransform: 'none',
                            py: 1,
                            px: 2,
                            display: { xs: 'none', sm: 'flex' },
                            '&:hover': {
                                boxShadow: 'none',
                            }
                        }}
                    >
                        {dateRange}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleDateClose()}
                    >
                        <MenuItem onClick={() => handleDateClose('12th Sept - 15th Sept, 2025')} disableRipple>Last 7 Days</MenuItem>
                        <MenuItem onClick={() => handleDateClose('1st Sept - 30th Sept, 2025')} disableRipple>Last 30 Days</MenuItem>
                        <MenuItem onClick={() => handleDateClose('1st Jan - 31st Dec, 2025')} disableRipple>This Year</MenuItem>
                    </Menu>

                    <Button
                        variant="contained"
                        disableRipple
                        sx={{
                            bgcolor: palette.ui.buttonBg,
                            borderRadius: '8px',
                            textTransform: 'none',
                            py: 1,
                            px: 3,
                            fontWeight: 600,
                            display: { xs: 'none', sm: 'block' },
                            '&:hover': {
                                bgcolor: palette.primary.dark,
                                boxShadow: 'none',
                            }
                        }}
                    >
                        Export
                    </Button>

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
