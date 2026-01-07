import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useThemeStore } from './store/useThemeStore';
import { getTheme } from './theme/theme';

const LandingThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeStore();
  // Ensure Onest font for Landing Page
  const theme = useMemo(() => getTheme(mode, 'Onest'), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const DashboardThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeStore();
  // Ensure Montserrat font for Dashboard & Login
  const theme = useMemo(() => getTheme(mode, 'Montserrat'), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingThemeWrapper>
              <LandingPage />
            </LandingThemeWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <DashboardThemeWrapper>
              <LoginPage />
            </DashboardThemeWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardThemeWrapper>
              <DashboardPage />
            </DashboardThemeWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
