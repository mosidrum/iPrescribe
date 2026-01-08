import { Box, Container, Typography, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StoreButton } from '../common/StoreButton';
import heroImage from '../../assets/hero_phones.png';
import avatars from '../../assets/Icon.svg';

export const HeroSection = () => {

    return (
        <Box sx={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F4FC 100%)',
            pt: { xs: 4, md: 8 },
            pb: { xs: 8, md: 0 },
            overflow: 'hidden'
        }}>
            <Container>
                <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={4}>

                    <Box flex={1} textAlign={{ xs: 'center', md: 'left' }}>

                        {/* Badge */}
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                bgcolor: '#F3F6FF',
                                p: 0.5,
                                pr: 2,
                                borderRadius: '50px',
                                mb: 3,
                                border: '1px solid #E6E8F0'
                            }}
                        >
                            <Box
                              component="img"
                              src={avatars}
                              alt="iPrescribe App Screens"
                              sx={{ mr: 1.5, '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 10 } }}
                              />
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mr: 1 }}>
                                Ready to explore iPrescribe?
                            </Typography>
                            <Typography variant="caption" color="primary" sx={{ fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                Join Waitlist <ArrowForwardIcon sx={{ fontSize: 12, ml: 0.5 }} />
                            </Typography>
                        </Box>

                        <Typography variant="h1" fontWeight={400} color="text.primary" sx={{ mb: 2, letterSpacing: '-1px' }}>
                            Your Bridge <br />
                            Between Care & <br />
                            Convenience
                        </Typography>

                        <Typography variant="h3" color="text.secondary" sx={{ mb: 4, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.6, maxWidth: 500, mx: { xs: 'auto', md: 0 } }}>
                            Schedule consultations, send or receive e-prescriptions, and manage medications from one secure platform.
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent={{ xs: 'center', md: 'flex-start' }}
                            sx={{ mb: { xs: 6, md: 8 } }}
                        >
                            <StoreButton store="google" />
                            <StoreButton store="apple" />
                        </Stack>
                    </Box>

                    <Box flex={1} sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            src={heroImage}
                            alt="iPrescribe App Screens"
                            sx={{
                                width: '100%',
                                maxWidth: 600,
                                height: 'auto',
                                filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.1))',
                                transform: 'perspective(1000px) rotateY(-5deg)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'perspective(1000px) rotateY(0deg) scale(1.02)'
                                }
                            }}
                        />
                    </Box>

                </Stack>
            </Container>
        </Box>
    );
};
