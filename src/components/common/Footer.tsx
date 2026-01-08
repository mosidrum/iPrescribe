import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Logo } from './Logo';
import { palette } from '../../theme/theme';

export const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: palette.ui.footerBg,
        py: 4,
        borderTop: `1px solid ${palette.ui.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          spacing={{ xs: 3, md: 0 }}
        >
          <Box sx={{ filter: 'brightness(0) invert(1)' }}>
            <Logo />
          </Box>

          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            © {new Date().getFullYear()}, All Rights Reserved
          </Typography>

          <Stack direction="row" spacing={2}>
            {[FacebookIcon, YouTubeIcon, WhatsAppIcon].map((Icon, index) => (
              <IconButton
                key={index}
                sx={{
                  bgcolor: palette.primary.contrastText,
                  color: palette.ui.footerBg,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.8)',
                    boxShadow: 'none',
                  },
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
