import { Paper, Typography, Box, Button, Stack } from '@mui/material';

export const HealthTips = () => {
    return (
        <Box sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" fontWeight={700}>
                    Health Tips
                </Typography>
                <Button size="small" sx={{ fontWeight: 600 }}>See All</Button>
            </Stack>

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 4,
                    bgcolor: 'white',
                    border: '1px solid #F5F7FA',
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center'
                }}
            >
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=200"
                    alt="Hydration"
                    sx={{ width: 60, height: 60, borderRadius: 3, objectFit: 'cover' }}
                />
                <Box>
                    <Typography variant="subtitle2" fontWeight={700}>
                        Stay Hydrated!
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Drinking enough water each day is crucial for many reasons: to regulate body temperature, keep joints lubricated, prevent infections, deliver nutrients to cells, and keep organs functioning properly. Being well-hydrated also improves sleep quality, cognition, and mood.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};
