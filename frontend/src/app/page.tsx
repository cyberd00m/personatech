import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, Network, FileText, Clock, Map, BarChart, ArrowRight, Zap, Shield, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-blue-500/30 bg-gray-900/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.jpg" 
              alt="PersonaForge AI Logo" 
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-cyan-400 hover:text-white">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="neon-blue" className="glow-blue">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-8">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">AI-Powered Intelligence Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="glow-text-blue">Build intelligence</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              from information
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Transform information into structured intelligence with AI-powered analysis, 
            relationship mapping, and comprehensive reporting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="neon-blue" size="lg" className="glow-blue text-lg px-8">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cases">
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-purple">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to transform raw information into actionable intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-cyan-400" />}
              title="AI Profile Analysis"
              description="Generate structured profiles from collected information using advanced AI analysis"
              color="cyan"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-purple-400" />}
              title="Evidence Organization"
              description="Organize notes, images, documents, and sources in a centralized system"
              color="purple"
            />
            <FeatureCard
              icon={<Network className="h-8 w-8 text-cyan-400" />}
              title="Relationship Mapping"
              description="Visualize connections between people, places, events, and organizations"
              color="cyan"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-purple-400" />}
              title="Timeline Generation"
              description="Turn information into chronological events and track patterns over time"
              color="purple"
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8 text-cyan-400" />}
              title="Intelligence Reports"
              description="Generate professional analytical reports with confidence indicators"
              color="cyan"
            />
            <FeatureCard
              icon={<Map className="h-8 w-8 text-purple-400" />}
              title="Location Mapping"
              description="Map and analyze geographic patterns and movement data"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-blue">
              See It In Action
            </h2>
            <p className="text-xl text-gray-400">
              A glimpse into the PersonaForge AI intelligence dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <PreviewCard
              title="Dashboard Overview"
              description="Command center for all your intelligence operations"
              features={['Real-time stats', 'Activity feed', 'Quick actions']}
            />
            <PreviewCard
              title="Profile Cards"
              description="Detailed profile views with confidence scores"
              features={['Structured data', 'Evidence links', 'Timeline integration']}
            />
            <PreviewCard
              title="Relationship Graph"
              description="Interactive network visualization"
              features={['Drag & drop', 'Zoom controls', 'Connection details']}
            />
            <PreviewCard
              title="Timeline View"
              description="Chronological event tracking"
              features={['Event filtering', 'Pattern detection', 'Export options']}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 p-12 glow-blue">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Information?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start building intelligence profiles today with PersonaForge AI
            </p>
            <Link href="/dashboard">
              <Button variant="neon-blue" size="lg" className="glow-blue text-lg px-12">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/30 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 PersonaForge AI. Transform information into structured intelligence.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode
  title: string
  description: string
  color: 'cyan' | 'purple'
}) {
  const glowClass = color === 'cyan' ? 'glow-blue' : 'glow-purple'
  const borderClass = color === 'cyan' ? 'border-cyan-400/30' : 'border-purple-400/30'
  
  return (
    <div className={`p-6 rounded-xl border ${borderClass} bg-gray-900/50 backdrop-blur-sm ${glowClass} hover:scale-105 transition-transform`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function PreviewCard({ title, description, features }: {
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="p-6 rounded-xl border border-blue-500/30 bg-gray-900/50 backdrop-blur-sm">
      <div className="h-48 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4 flex items-center justify-center border border-blue-500/20">
        <span className="text-gray-500 text-sm">Preview Image</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-cyan-400">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
