import { Button, Box, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import playstoreIcon from '../../assets/playstore.png';

interface StoreButtonProps {
    store: 'apple' | 'google';
}

export const StoreButton = ({ store }: StoreButtonProps) => {
    const isApple = store === 'apple';
    const label = isApple ? 'App Store' : 'Google Play';
    const subtitle = 'Coming Soon';

    return (
        <Button
            variant="contained"
            color="inherit"
            startIcon={
                isApple ? (
                    <AppleIcon sx={{ fontSize: 30 }} />
                ) : (
                    <Box
                        component="img"
                        src={playstoreIcon}
                        alt="Google Play"
                        sx={{ width: 24, height: 24 }}
                    />
                )
            }
            sx={{
                bgcolor: '#1A1A1A',
                color: '#fff',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: '12px',
                '&:hover': {
                    bgcolor: '#333',
                    boxShadow: 'none',
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
