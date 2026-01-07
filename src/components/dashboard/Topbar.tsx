import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Avatar,
    Box,
    Stack,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useUIStore } from '../../store/useStore';

export const Topbar = () => {
    const { toggleSidebar } = useUIStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            sx={{
                width: { lg: 'calc(100% - 280px)' },
                ml: { lg: '280px' },
                bgcolor: 'background.default', // Transparent/white blending
                borderBottom: '1px solid',
                borderColor: 'divider',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.9)'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center">
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleSidebar}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box>
                        <Typography variant="h6" color="text.primary" fontWeight={700}>
                            Hello Jane!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Welcome to iPrescribe
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton>
                        <Badge variant="dot" color="error">
                            <NotificationsOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: '#F3F6FF',
                            p: 0.5,
                            pl: 1.5,
                            borderRadius: '50px',
                            cursor: 'pointer'
                        }}
                    >
                        <Typography variant="caption" fontWeight={600} sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
                            Jane's Account
                        </Typography>
                        <Avatar
                            alt="Jane Doe"
                            src="https://i.pravatar.cc/150?u=jane"
                            sx={{ width: 32, height: 32 }}
                        />
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
