import { Button, Box, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Android'; // Fallback for Google Play

interface StoreButtonProps {
    store: 'apple' | 'google';
}

export const StoreButton = ({ store }: StoreButtonProps) => {
    const isApple = store === 'apple';
    const Icon = isApple ? AppleIcon : GoogleIcon;
    const label = isApple ? 'App Store' : 'Google Play';
    const subtitle = 'Coming Soon';

    return (
        <Button
            variant="contained"
            color="inherit"
            startIcon={<Icon sx={{ fontSize: 30 }} />}
            sx={{
                bgcolor: '#1A1A1A',
                color: '#fff',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: '12px',
                '&:hover': {
                    bgcolor: '#333',
                },
                minWidth: 160,
                height: 56
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                <Typography variant="caption" sx={{ lineHeight: 1, opacity: 0.8, fontSize: '0.65rem' }}>
                    {subtitle}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1, fontWeight: 600 }}>
                    {label}
                </Typography>
            </Box>
        </Button>
    );
};
