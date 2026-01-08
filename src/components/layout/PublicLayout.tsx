import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import { Navbar } from '../landing/Navbar';

interface PublicLayoutProps {
    children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>
        </Box>
    );
};
