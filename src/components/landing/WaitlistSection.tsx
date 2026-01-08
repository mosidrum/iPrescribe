import { Box, Container, Typography, TextField, Button } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export const WaitlistSection = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', py: 10, color: 'white', overflow: 'hidden' }}>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                    Join Our Waitlist
                </Typography>

                <Typography variant="body1" sx={{ mb: 6, opacity: 0.9, lineHeight: 1.8, maxWidth: 600, mx: 'auto' }}>
                    Be the first one to know about discounts, offers and events weekly in your mailbox.
                    Unsubscribe whenever you like with one click.
                </Typography>

                <Box
                    component="form"
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        p: 1,
                        pl: 3,
                        display: 'flex',
                        maxWidth: 500,
                        mx: 'auto',
                        alignItems: 'center',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <EmailOutlinedIcon sx={{ color: 'rgba(255,255,255,0.6)', mr: 1.5 }} />
                    <TextField
                        variant="standard"
                        placeholder="Enter your email"
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            sx: { color: 'white', '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } }
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            borderRadius: '50px',
                            px: 4,
                            py: 1.5,
                            fontWeight: 700,
                            '&:hover': {
                                bgcolor: '#f0f0f0',
                                boxShadow: 'none',
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
