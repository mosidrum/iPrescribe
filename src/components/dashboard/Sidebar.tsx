import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WebIcon from '@mui/icons-material/Web';
import { Logo } from '../common/Logo';

const MAIN_MENU = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', active: true },
    { label: 'User Management', icon: <PeopleIcon />, path: '/users' },
    { label: 'Consult. & Presp.', icon: <LocalHospitalIcon />, path: '/consultations' },
    { label: 'Pharm. & Orders Mgt.', icon: <LocalPharmacyIcon />, path: '/pharmacy' },
    { label: 'Payments', icon: <PaymentIcon />, path: '/payments' },
];

const ADMIN_MENU = [
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { label: 'Roles & Permissions', icon: <SecurityIcon />, path: '/roles' },
    { label: 'Activity Log', icon: <HistoryIcon />, path: '/activity' },
    { label: 'Blog / Health Tips', icon: <ArticleIcon />, path: '/blog' },
    { label: 'Notifications Mgt.', icon: <NotificationsIcon />, path: '/notifications' },
    { label: 'Website Updates', icon: <WebIcon />, path: '/website' },
];

export const Sidebar = () => {
    return (
        <Box
            sx={{
                width: 280,
                bgcolor: '#141E3C', // Deep dark blue from design
                color: '#fff',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                overflowY: 'auto',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ p: 3, mb: 2 }}>
                <Logo light />
            </Box>

            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ px: 3, mb: 1, display: 'block', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600 }}>
                    Main Menu
                </Typography>
                <List component="nav" sx={{ px: 2, mb: 3 }}>
                    {MAIN_MENU.map((item) => (
                        <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                selected={item.active}
                                sx={{
                                    borderRadius: 1,
                                    py: 1.5,
                                    bgcolor: item.active ? '#fff' : 'transparent',
                                    color: item.active ? '#2E4C93' : '#fff',
                                    '&:hover': {
                                        bgcolor: item.active ? '#fff' : 'rgba(255,255,255,0.05)',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: '#fff',
                                        color: '#141E3C', // Inverted logic for active state
                                        '&:hover': { bgcolor: '#fff' }
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: item.active ? 600 : 400 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Typography variant="caption" sx={{ px: 3, mb: 1, display: 'block', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600 }}>
                    Admin Menu
                </Typography>
                <List component="nav" sx={{ px: 2 }}>
                    {ADMIN_MENU.map((item) => (
                        <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                sx={{
                                    borderRadius: 1,
                                    py: 1.5,
                                    color: '#fff',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};
