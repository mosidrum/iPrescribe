import { Box } from '@mui/material';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { WaitlistSection } from '../components/landing/WaitlistSection';
import { Footer } from '../components/common/Footer';

const LandingPage = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box component="main" flex={1}>
                <HeroSection />
                <WaitlistSection />
            </Box>
            <Footer />
        </Box>
    );
};

export default LandingPage;
