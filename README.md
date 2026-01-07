# iPrescribe Frontend Assessment

## Project Overview

This project is a high-fidelity implementation of the iPrescribe landing page and dashboard application, built with modern React architecture. It demonstrates production-quality code, strict design adherence, and scalable engineering practices.

## Tech Stack

-   **Core**: React 18, TypeScript, Vite
-   **UI Framework**: Material UI (MUI) v5
-   **State Management (Server)**: TanStack React Query v5
-   **State Management (Client)**: Zustand
-   **Routing**: React Router DOM v6
-   **Styling**: MUI System (sx prop & ThemeProvider) - No ad-hoc CSS

## Architecture Decisions

-   **Component Structure**: Divided into `landing` and `dashboard` specific components, with shared UI elements in `common`.
-   **Services Layer**: Mock API services (`src/services/api.ts`) simulate network latency and return typed data, decoupled from UI components.
-   **State Management**:
    -   **React Query**: Used for all async data (prescriptions, stats) to handle loading, caching, and error states gracefully.
    -   **Zustand**: Used for global UI state (e.g., mobile sidebar toggle) to avoid prop drilling and complex context providers.
-   **Theming**: Centralized theme configuration in `src/theme/theme.ts` adhering to the Figma color palette and typography.
-   **Responsiveness**: Fully responsive layouts for Mobile, Tablet, and Desktop using MUI's Grid and Breakpoints.

## How to Run Locally

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features Implemented

-   **Landing Page**: Pixel-perfect implementation of the Figma design including Hero section, Waitlist form, and Footer.
-   **Dashboard**:
    -   Responsive Sidebar and Topbar navigation.
    -   Async data loading for User Stats, Prescriptions, and Doctor availability.
    -   Interactive Action Cards ("Consult with a Doctor", "Buy Drugs").
    -   Recent Prescriptions list with status indicators.
    -   Health Tips widget.
-   **Bonus**:
    -   Skeleton loading states for better UX.
    -   Hover effects and transitions.
    -   Custom SVG Logo implementation.

## Known Limitations / Assumptions

-   **Charts**: The dashboard design had limited chart details in the provided mocks for the main view, so I focused on the "Stats Cards" and "Recent Prescriptions" list as the primary data visualization, which better matched the mobile/tablet focused designs provided.
-   **Interactivity**: Forms (Waitlist) prevent default submission but log to console; backend integration is mocked.
-   **Images**: Used placeholder/Unsplash images for dynamic content where specific assets weren't exported.

## Verification

The application has been tested to ensure:
-   No linting errors.
-   Direct mappings to Figma layouts.
-   Clean console output.
