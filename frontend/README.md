# PersonaForge AI

**Transform information into structured intelligence.**

A futuristic AI-powered intelligence analysis dashboard that allows users to visualize how information could be organized into structured profiles, reports, timelines, and relationship graphs.

## 🚀 Project Overview

PersonaForge AI is a frontend-only prototype demonstrating a professional intelligence analysis platform with a cyberpunk-inspired UI. This is Phase 1 of development, focusing on creating a polished, interactive interface without backend integration.

## ✨ Features

- **Landing Page**: Professional marketing homepage with hero section, features showcase, and product preview
- **Dashboard**: Command center with real-time stats, activity feed, and AI insights
- **Case Management**: Create, filter, and manage intelligence cases
- **Profile Builder**: Interactive form with live preview for building intelligence profiles
- **AI Analysis**: Simulated AI-powered analysis with confidence scores and recommendations
- **Relationship Graph**: Interactive network visualization using React Flow
- **Timeline**: Chronological event tracking with filtering capabilities
- **Maps**: Geographic visualization with location markers and analysis
- **Reports**: Generate and preview intelligence reports with export functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **React**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with ShadCN UI patterns
- **Animations**: Framer Motion
- **Graph Visualization**: React Flow
- **Maps**: MapLibre GL
- **State Management**: Zustand
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── dashboard/    # Dashboard page
│   │   ├── cases/        # Case management
│   │   ├── profiles/     # Profile pages
│   │   ├── evidence/     # Evidence management
│   │   ├── timeline/     # Timeline view
│   │   ├── graph/        # Relationship graph
│   │   ├── maps/         # Map visualization
│   │   ├── reports/      # Report generation
│   │   └── ai-analysis/  # AI analysis interface
│   ├── components/       # React components
│   │   ├── layout/       # Layout components (Sidebar, TopNav)
│   │   ├── ui/           # Reusable UI components
│   │   └── features/     # Feature-specific components
│   ├── data/            # Mock data
│   │   ├── cases.ts
│   │   ├── profiles.ts
│   │   ├── evidence.ts
│   │   ├── timeline.ts
│   │   ├── relationships.ts
│   │   └── locations.ts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
└── public/              # Static assets
```

## 🎨 Design System

The application uses a cyberpunk-inspired design theme:

- **Colors**: Dark background with neon blue (#00c8ff) and purple (#a855f7) accents
- **Typography**: Inter font family for clean, modern text
- **Effects**: Glassmorphism cards, glow effects, and smooth transitions
- **Components**: Custom UI components with consistent styling

## 📝 Mock Data

The application uses mock data stored in `/src/data/` for demonstration purposes. The data structure is designed to be easily replaceable with backend API calls in future phases.

## 🔮 Future Development

Planned features for future phases:

- Backend API integration
- Database implementation
- Authentication system
- Real AI processing
- User accounts and permissions
- Cloud deployment
- Advanced data storage

## 📄 License

This project is part of PersonaForge AI development.

## 🤝 Contributing

This is a prototype project. Contributions and feedback are welcome for future development phases.
