import { useState } from 'react';
import { AppBar, Toolbar, Stack, Typography, IconButton, Button, Avatar, Box, Menu, MenuItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useDashboardStore } from '../../store/useDashboardStore';

export const TopBar = () => {
    const user = useAuthStore((state) => state.user);
    const { mode, toggleTheme } = useThemeStore();
    const { dateRange, setDateRange } = useDashboardStore();

    // Date Menu State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleDateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClose = (newRange?: string) => {
        if (newRange) {
            setDateRange(newRange);
        }
        setAnchorEl(null);
    };

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
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    >
                        {dateRange}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleDateClose()}
                    >
                        <MenuItem onClick={() => handleDateClose('12th Sept - 15th Sept, 2025')}>Last 7 Days</MenuItem>
                        <MenuItem onClick={() => handleDateClose('1st Sept - 30th Sept, 2025')}>Last 30 Days</MenuItem>
                        <MenuItem onClick={() => handleDateClose('1st Jan - 31st Dec, 2025')}>This Year</MenuItem>
                    </Menu>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#2E4C93',
                            borderRadius: '8px',
                            textTransform: 'none',
                            py: 1,
                            px: 3,
                            fontWeight: 600,
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        Export
                    </Button>

                    <IconButton onClick={toggleTheme} color="default">
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    <IconButton>
                        <NotificationsNoneIcon />
                    </IconButton>

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
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
