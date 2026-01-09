# iPrescribe Frontend Assessment

## 🎯 Assessment Overview

This project is a complete implementation of the iPrescribe Coming Soon Landing Page and Dashboard as specified in the frontend assessment. Built from scratch following the provided Figma designs with pixel-perfect accuracy and full responsiveness across all device sizes.

**Assessment Duration**: 48 hours  
**Completion Status**: ✅ Completed  
**API Integration**: Real API endpoints implemented

## 📋 Assessment Requirements Fulfilled

### ✅ Core Task Requirements
- [x] **New React Project**: Created from scratch using Vite + React 18 + TypeScript
- [x] **Material UI (MUI)**: Installed, configured, and fully implemented using MUI v5
- [x] **Figma Implementation**: Pages implemented exactly as shown in Figma designs
- [x] **Full Responsiveness**: Desktop, tablet, and mobile layouts implemented
- [x] **Basic Interactivity**: Forms, navigation, and loading states added
- [x] **API Integration**: Connected to provided iPrescribe API endpoints

### ✅ API Integration Details
- **Base URL**: `https://stagingapi.iprescribe.online/api/v1`
- **Postman Collection**: Integrated endpoints from provided workspace
- **Real Data**: Dashboard displays live data from iPrescribe staging API
- **Error Handling**: Comprehensive API error handling and fallback states
- **Loading States**: Proper loading indicators during API calls



## 🏗 Project Architecture

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Logo, Footer, etc.)
│   ├── dashboard/       # Dashboard-specific components
│   ├── landing/         # Landing page components
│   └── layout/          # Layout components
├── pages/               # Page-level components
├── services/            # API services and data fetching
├── store/               # Zustand stores
├── theme/               # MUI theme configuration
├── types/               # TypeScript type definitions
├── assets/              # Static assets (images, icons)
└── hooks/               # Custom React hooks
```
## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Environment Variables
```bash
# Create .env file in root directory
VITE_API_BASE_URL=https://stagingapi.iprescribe.online/api/v1
VITE_API_TIMEOUT=10000
VITE_API_RETRY_ATTEMPTS=2
```

### Installation & Setup
```bash
# Clone the repository
git clone [https://github.com/mosidrum/iPrescribe]
cd iprescribe

# Install dependencies
npm install

# Create environment file (copy from .env.example)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```


### Environment Variables
```bash
# Create .env file in root directory
VITE_API_BASE_URL=https://stagingapi.iprescribe.online/api/v1
```

## 🎯 Bonus Features Implemented

### Advanced Features
1. **Dark/Light Theme System**
   - Complete theme switching with persistent storage
   - Smooth transitions between themes
   - System preference detection

2. **Advanced Animations**
   - Page transitions and micro-interactions
   - Loading animations and skeleton states
   - Hover effects and button animations

3. **Performance Optimizations**
   - Code splitting and lazy loading
   - Image optimization
   - Bundle size optimization
   - Caching strategies

4. **Advanced Form Handling**
   - Real-time validation
   - Error message display
   - Success feedback
   - Form persistence

## 📞 Contact & Questions

If you have any questions about the implementation or need clarification on any aspect of the project, please feel free to reach out.

---
