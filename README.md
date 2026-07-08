# PersonaForge AI

**Transform information into structured intelligence.**

A futuristic AI-powered intelligence analysis dashboard that allows users to visualize how information could be organized into structured profiles, reports, timelines, and relationship graphs.

### Installation via Docker

1. **Clone the repository:**
```bash
git clone https://github.com/cyberd00m/personatech
cd personatech
```

2. **Start the application:**
```bash
docker compose up -d --build
```

3. **Access the application:**
Open your browser and navigate to [http://localhost:2077](http://localhost:2077)

4. **Stop the application:**
```bash
docker-compose down
```

5. **Uninstall/Remove Docker containers and images:**
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (if any)
docker-compose down -v

# Remove the built images
docker rmi personatech-frontend

# Or remove all unused Docker resources
docker system prune -a
```

## 🛠️ Manual Installation

If you prefer to run the application without Docker:

1. **Clone the repository:**
```bash
git clone <repository-url>
cd personatech/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:2077](http://localhost:2077) in your browser**

## 📁 Project Structure

```
personatech/
├── docker-compose.yml    # Docker configuration
└── frontend/             # Next.js frontend application
    ├── src/              # Source code
    ├── public/           # Static assets
    └── package.json      # Dependencies
```

## ✨ Features

- **Landing Page**: Professional marketing homepage with hero section and features showcase
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

## 📖 Documentation

For detailed information about the frontend application, including:
- Complete feature descriptions
- Project structure
- Design system
- Mock data structure
- Future development plans

See the [frontend README](./frontend/README.md)

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
