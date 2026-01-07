import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // Prescriptions
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Appointments
import PersonIcon from '@mui/icons-material/Person'; // Account
import { Logo } from '../common/Logo';

const MENU_ITEMS = [
    { label: 'Home', icon: HomeIcon, href: '/dashboard' },
    { label: 'Prescriptions', icon: ReceiptLongIcon, href: '#' },
    { label: 'Appointments', icon: CalendarMonthIcon, href: '#' },
    { label: 'Account', icon: PersonIcon, href: '#' },
];

export const SidebarContent = () => {

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 3 }}>
            <Box sx={{ px: 3, mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Logo />
            </Box>

            <List sx={{ px: 2 }}>
                {MENU_ITEMS.map((item, index) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={index === 0} // Mock active state
                            sx={{
                                borderRadius: '12px',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    '& .MuiListItemIcon-root': { color: 'white' }
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: index === 0 ? 'white' : 'text.secondary' }}>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: 500,
                                    fontSize: '0.9rem'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ mt: 'auto', px: 3, pb: 2 }}>
                <Box sx={{ p: 2, bgcolor: '#F0F4FC', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        Need help?
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold">
                        Contact Support
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
