import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Logo } from './Logo';

export const Footer = () => {

    return (
        <Box sx={{ bgcolor: 'primary.main', pb: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Container maxWidth="lg">
                <Stack alignItems="center" spacing={3}>
                    {/* Logo - we need a white version for footer ideally, or use current one if it works. 
              The current logo uses primary.main (blue) and secondary.main (red). 
              On blue bg, blue won't show. We need to override. 
          */}
                    <Box sx={{ filter: 'brightness(0) invert(1)' }}>
                        <Logo />
                    </Box>

                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        © 2025, All Rights Reserved
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {[FacebookIcon, YouTubeIcon, WhatsAppIcon].map((Icon, index) => (
                            <IconButton
                                key={index}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' }
                                }}
                            >
                                <Icon fontSize="small" />
                            </IconButton>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};
