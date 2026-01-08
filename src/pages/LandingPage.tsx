import { Box } from '@mui/material';
import { HeroSection } from '../components/landing/HeroSection';
import { WaitlistSection } from '../components/landing/WaitlistSection';
import { Footer } from '../components/common/Footer';

const LandingPage = () => {
    return (
        <>
            <Box component="main" flex={1}>
                <HeroSection />
                <WaitlistSection />
            </Box>
            <Footer />
        </>
    );
};

export default LandingPage;
