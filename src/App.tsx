import { type ReactNode, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { PublicLayout } from './components/layout/PublicLayout';

import { useThemeStore } from './store/useThemeStore';
import { getTheme } from './theme/theme';

type ThemeWrapperProps = {
  mode: 'light' | 'dark';
  font: 'Onest' | 'Montserrat';
  children: ReactNode;
};

const ThemeWrapper = ({ mode, font, children }: ThemeWrapperProps) => {
  const theme = useMemo(() => getTheme(mode, font), [mode, font]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

type RouteConfig = {
  path: string;
  component: ReactNode;
  theme: {
    mode: 'light' | 'dark' | 'dynamic';
    font: 'Onest' | 'Montserrat';
  };
  layout?: 'public' | 'none';
};

function App() {
  const { mode } = useThemeStore();

  const routes: RouteConfig[] = [
    {
      path: '/',
      component: <LandingPage />,
      theme: { mode: 'light', font: 'Onest' },
      layout: 'public',
    },
    {
      path: '/login',
      component: <LoginPage />,
      theme: { mode: 'light', font: 'Onest' },
      layout: 'public',
    },
    {
      path: '/dashboard',
      component: <DashboardPage />,
      theme: { mode: 'dynamic', font: 'Montserrat' },
      layout: 'none',
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component, theme, layout }) => {
          const resolvedMode =
            theme.mode === 'dynamic' ? mode : theme.mode;

          const content = layout === 'public'
            ? <PublicLayout>{component}</PublicLayout>
            : component;

          return (
            <Route
              key={path}
              path={path}
              element={
                <ThemeWrapper mode={resolvedMode} font={theme.font}>
                  {content}
                </ThemeWrapper>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
