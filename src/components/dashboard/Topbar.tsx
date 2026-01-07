import { AppBar, Toolbar, Stack, Typography, IconButton, Button, Avatar, Box } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuthStore } from '../../store/useAuthStore';

export const TopBar = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                width: `calc(100% - 280px)`,
                ml: '280px',
                bgcolor: '#fff',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
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

                <Stack direction="row" spacing={3} alignItems="center">
                    <Button
                        variant="outlined"
                        startIcon={<CalendarTodayIcon fontSize="small" />}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                            borderRadius: '8px',
                            borderColor: '#E0E0E0',
                            color: 'text.primary',
                            textTransform: 'none',
                            py: 1,
                            px: 2
                        }}
                    >
                        12th Sept - 15th Sept, 2025
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#2E4C93',
                            borderRadius: '8px',
                            textTransform: 'none',
                            py: 1,
                            px: 3,
                            fontWeight: 600
                        }}
                    >
                        Export
                    </Button>

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
