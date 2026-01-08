import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LogoProps {
    light?: boolean;
}

export const Logo = ({ light = false }: LogoProps) => {
    const theme = useTheme();
    const textColor = light ? '#ffffff' : theme.palette.primary.main;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 50 V 70 A 30 30 0 0 0 80 70 V 50 H 65 V 70 A 15 15 0 0 1 35 70 V 50 H 20 Z" fill={light ? '#ffffff' : theme.palette.primary.main} />
                <path d="M35 50 V 35 A 15 15 0 0 1 65 35 V 50 H 35 Z" fill={theme.palette.secondary.main} />
            </svg>
            <Typography variant="body2" sx={{
                color: textColor,
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '-0.5px',
                marginTop: '-5px'
            }}>
                iPrescribe<sup style={{ fontSize: '8px' }}>TM</sup>
            </Typography>
        </Box>
    );
};
